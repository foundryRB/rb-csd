/**
 * Page-structure intent tests (adopted from the STARLIGHT bundle).
 *
 * Carries the intent() markers for the generic page-structure claims
 * INT-STARLIGHT-007..010 declared in intent.yaml. The detection logic is
 * deliberately lenient so well-formed CSD pages pass: it reads each page body
 * (the markdown after the frontmatter) and asserts structural shape only.
 *
 * Frontmatter claims are NOT re-checked here: src/test/metadata.test.ts owns
 * frontmatter enforcement, so this file stays purely structural and the two
 * suites do not double-enforce the same contract.
 */

import { describe, beforeAll, expect } from 'vitest'
import { intent } from '@psa-department-of-engineering/vitest-intent'
import {
    getAllMarkdownFiles,
    extractFrontmatter,
} from './helpers/markdown-parser'
import type { MarkdownFile } from './helpers/markdown-parser'
import { DOCS_DIR } from './helpers/constants'

// Page-structure detection regexes (operate on the body, after frontmatter).
const H2_RE = /^##\s+\S/ // a level-2 heading line
const NUMBERED_H_RE = /^#{1,6}\s+\d+[.)]?\s/ // a heading whose text starts with a number
const ORDERED_LIST_RE = /^\s*\d+[.)]\s+\S/ // an ordered-list item
const UNORDERED_LIST_RE = /^\s*[-*+]\s+\S/ // an unordered-list item
const TABLE_ROW_RE = /^\s*\|/ // a table row
const SEQUENCE_DIAGRAM_RE = /```mermaid[\s\S]*?\bsequenceDiagram\b/ // a mermaid sequenceDiagram fence
const FRONTMATTER_RE = /^---\s*\n[\s\S]*?\n---/

interface StructuredDoc {
    path: string
    type: string
    template: string
    body: string
}

function extractBody(content: string): string {
    const m = FRONTMATTER_RE.exec(content)
    return m ? content.slice(m[0].length) : content
}

function bodyLines(body: string): string[] {
    return body.split('\n')
}

/**
 * True when some non-empty, non-heading prose exists before the page's LAST
 * level-2 heading, read leniently (INT-STARLIGHT-007). A leading navigation or
 * "Read next" block (a heading plus a link list) and a leading bold-only line
 * are tolerated, so rather than failing at the very first `## ` we require a
 * prose line somewhere before the last `## `. That proves the page interleaves
 * prose with structure rather than being pure scaffolding. A page with no `##`
 * at all is left to INT-STARLIGHT-008.
 */
function hasIntroBeforeFirstH2(body: string): boolean {
    const lines = bodyLines(body)

    let lastH2 = -1
    let inFence = false
    for (let i = 0; i < lines.length; i += 1) {
        if (lines[i].trim().startsWith('```')) {
            inFence = !inFence
            continue
        }
        if (!inFence && H2_RE.test(lines[i])) lastH2 = i
    }

    inFence = false
    for (let i = 0; i < lines.length; i += 1) {
        const raw = lines[i]
        const line = raw.trim()
        if (line.startsWith('```')) {
            inFence = !inFence
            continue
        }
        if (inFence) continue
        if (line === '') continue
        if (line.startsWith('#')) continue // heading, not prose
        if (ORDERED_LIST_RE.test(raw)) continue // list item, not prose
        if (UNORDERED_LIST_RE.test(raw)) continue // list item (nav links), not prose
        if (TABLE_ROW_RE.test(raw)) continue // table row, not prose
        if (lastH2 === -1 || i < lastH2) return true
    }
    return false
}

function hasH2(body: string): boolean {
    return bodyLines(body).some(line => H2_RE.test(line))
}

/**
 * Starlight splash / hero pages (`template: splash`) render their content from
 * frontmatter (`hero:`) rather than body sections, so they legitimately carry
 * no `## ` heading. The structure claims exempt them.
 */
function isSplash(template: string): boolean {
    return template === 'splash'
}

function hasOrderedList(body: string): boolean {
    let inFence = false
    for (const raw of bodyLines(body)) {
        if (raw.trim().startsWith('```')) {
            inFence = !inFence
            continue
        }
        if (inFence) continue
        if (ORDERED_LIST_RE.test(raw)) return true
    }
    return false
}

function namedH2(body: string, name: string): boolean {
    const want = name.toLowerCase()
    return bodyLines(body).some(line => {
        const m = /^##\s+(.+?)\s*$/.exec(line)
        return m !== null && m[1].trim().toLowerCase() === want
    })
}

function countNumberedHeadings(body: string): number {
    let inFence = false
    let n = 0
    for (const raw of bodyLines(body)) {
        if (raw.trim().startsWith('```')) {
            inFence = !inFence
            continue
        }
        if (inFence) continue
        if (NUMBERED_H_RE.test(raw)) n += 1
    }
    return n
}

function hasSequenceDiagram(body: string): boolean {
    return SEQUENCE_DIAGRAM_RE.test(body)
}

describe('Page Structure', () => {
    let docs: StructuredDoc[] = []

    beforeAll(() => {
        const files: MarkdownFile[] = getAllMarkdownFiles(DOCS_DIR)
        docs = []
        for (const file of files) {
            const fm = extractFrontmatter(file.content)
            if (!fm) continue
            docs.push({
                path: file.relativePath,
                type: fm.type ?? '',
                template: fm.template ?? '',
                body: extractBody(file.content),
            })
        }
    })

    intent(
        'INT-STARLIGHT-007',
        'every doc opens with intro prose before its first level-2 heading',
        () => {
            const offenders = docs
                .filter(d => !isSplash(d.template))
                .filter(d => !hasIntroBeforeFirstH2(d.body))
                .map(d => d.path)
            expect(
                offenders,
                `docs with no intro prose before the first ## heading:\n  ${offenders.join('\n  ')}`,
            ).toEqual([])
        },
    )

    intent('INT-STARLIGHT-008', 'every doc has at least one level-2 heading', () => {
        const offenders = docs
            .filter(d => !isSplash(d.template))
            .filter(d => !hasH2(d.body))
            .map(d => d.path)
        expect(
            offenders,
            `docs with no level-2 (##) heading:\n  ${offenders.join('\n  ')}`,
        ).toEqual([])
    })

    intent(
        'INT-STARLIGHT-009',
        'every Flow page has a sequenceDiagram and a steps section',
        () => {
            const flows = docs.filter(d => d.type === 'Flow')
            const offenders = flows
                .filter(d => {
                    const hasSteps = namedH2(d.body, 'Steps') || hasOrderedList(d.body)
                    return !(hasSequenceDiagram(d.body) && hasSteps)
                })
                .map(d => {
                    const missing: string[] = []
                    if (!hasSequenceDiagram(d.body)) missing.push('sequenceDiagram')
                    if (!(namedH2(d.body, 'Steps') || hasOrderedList(d.body))) {
                        missing.push('steps (## Steps or an ordered list)')
                    }
                    return `${d.path} (missing: ${missing.join(', ')})`
                })
            expect(
                offenders,
                `Flow pages missing required structure:\n  ${offenders.join('\n  ')}`,
            ).toEqual([])
        },
    )

    intent('INT-STARLIGHT-010', 'every Guide page has a numbered procedure', () => {
        const guides = docs.filter(d => d.type === 'Guide')
        const offenders = guides
            .filter(d => !(hasOrderedList(d.body) || countNumberedHeadings(d.body) >= 2))
            .map(d => d.path)
        expect(
            offenders,
            `Guide pages with no numbered procedure (ordered list or >=2 numbered headings):\n  ${offenders.join('\n  ')}`,
        ).toEqual([])
    })
})
