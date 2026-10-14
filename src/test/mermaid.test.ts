/**
 * Mermaid Diagram Validity Tests
 *
 * The docs are visual-first: diagrams carry page structure, so a broken
 * diagram is a broken page. astro-mermaid renders ```mermaid blocks in the
 * browser, which means a syntactically broken block still builds green and
 * only fails in front of the reader. This suite closes that gap offline with
 * structural checks on every ```mermaid block: a known diagram type on the
 * first line, and balanced subgraph/end nesting for flowcharts.
 */

import { beforeAll, describe, expect, it } from 'vitest'
import { getAllMarkdownFiles } from './helpers/markdown-parser'
import type { MarkdownFile } from './helpers/markdown-parser'
import { DOCS_DIR } from './helpers/constants'

interface MermaidBlock {
    file: string
    line: number
    source: string
}

const KNOWN_TYPES = [
    'flowchart',
    'graph',
    'sequenceDiagram',
    'stateDiagram-v2',
    'stateDiagram',
    'classDiagram',
    'erDiagram',
    'journey',
    'timeline',
    'mindmap',
    'quadrantChart',
]

export function extractMermaidBlocks(file: MarkdownFile): MermaidBlock[] {
    const blocks: MermaidBlock[] = []
    const lines = file.content.split('\n')

    let inBlock = false
    let startLine = 0
    let buffer: string[] = []

    for (let i = 0; i < lines.length; i += 1) {
        const trimmed = lines[i].trim()
        if (!inBlock && /^```mermaid\s*$/.test(trimmed)) {
            inBlock = true
            startLine = i + 1
            buffer = []
            continue
        }
        if (inBlock && trimmed === '```') {
            inBlock = false
            blocks.push({
                file: file.relativePath,
                line: startLine,
                source: buffer.join('\n'),
            })
            continue
        }
        if (inBlock) buffer.push(lines[i])
    }

    return blocks
}

export function validateMermaidStructure(source: string): string[] {
    const problems: string[] = []
    const lines = source
        .split('\n')
        .map(l => l.trim())
        .filter(l => l !== '' && !l.startsWith('%%'))

    if (lines.length === 0) {
        return ['empty mermaid block']
    }

    const firstToken = lines[0].split(/\s+/)[0]
    if (!KNOWN_TYPES.includes(firstToken)) {
        problems.push(
            `unknown diagram type "${firstToken}" (expected one of: ${KNOWN_TYPES.join(', ')})`,
        )
    }

    // Flowcharts: every `subgraph` must be closed by a matching `end`.
    if (firstToken === 'flowchart' || firstToken === 'graph') {
        let depth = 0
        for (const line of lines.slice(1)) {
            if (/^subgraph\b/.test(line)) depth += 1
            else if (/^end$/.test(line)) depth -= 1
            if (depth < 0) {
                problems.push("'end' without a matching 'subgraph'")
                break
            }
        }
        if (depth > 0) {
            problems.push(`${depth} unclosed 'subgraph' block(s)`)
        }
    }

    return problems
}

describe('Mermaid Diagram Validity', () => {
    let blocks: MermaidBlock[] = []

    beforeAll(() => {
        const markdownFiles: MarkdownFile[] = getAllMarkdownFiles(DOCS_DIR)
        blocks = markdownFiles.flatMap(extractMermaidBlocks)
    })

    it('should find Mermaid blocks to validate (the docs are visual-first)', () => {
        expect(blocks.length).toBeGreaterThan(0)
        console.log(`Found ${blocks.length} Mermaid blocks across the docs`)
    })

    it('every diagram in the docs should be structurally valid', () => {
        const failures: string[] = []

        for (const block of blocks) {
            for (const problem of validateMermaidStructure(block.source)) {
                failures.push(`  ${block.file}:${block.line} - ${problem}`)
            }
        }

        if (failures.length > 0) {
            expect.fail(
                `Found ${failures.length} broken Mermaid diagram(s):\n${failures.join('\n')}`,
            )
        }
    })
})

describe('validateMermaidStructure', () => {
    it('accepts a flowchart with balanced subgraphs', () => {
        const source = `flowchart LR
subgraph one["Group"]
    a --> b
end
b --> c`
        expect(validateMermaidStructure(source)).toEqual([])
    })

    it('rejects a flowchart with an unclosed subgraph', () => {
        const source = `flowchart TB
subgraph one["Group"]
    a --> b`
        expect(validateMermaidStructure(source)).toEqual([
            expect.stringMatching(/unclosed 'subgraph'/),
        ])
    })

    it('rejects an unknown diagram type', () => {
        expect(validateMermaidStructure('plantuml\na -> b')).toEqual([
            expect.stringMatching(/unknown diagram type/),
        ])
    })

    it('accepts a sequence diagram', () => {
        const source = `sequenceDiagram
    participant A
    A->>B: hello`
        expect(validateMermaidStructure(source)).toEqual([])
    })

    it('accepts a state diagram', () => {
        const source = `stateDiagram-v2
    [*] --> Draft
    Draft --> Active: approved`
        expect(validateMermaidStructure(source)).toEqual([])
    })
})
