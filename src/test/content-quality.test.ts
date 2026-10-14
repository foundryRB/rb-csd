import { beforeAll, describe, expect, it } from 'vitest'
import { getAllMarkdownFiles } from './helpers/markdown-parser'
import type { MarkdownFile } from './helpers/markdown-parser'
import { DOCS_DIR } from './helpers/constants'

const MOJIBAKE_PATTERNS = [
    /Ã/,
    /â€”/,
    /â†’/,
    /âœ…/,
    /âŒ/,
    /â•/,
    /â”/,
    /â–¼/,
    /â‰/,
    /â€/,
    /�/,
]

describe('Content Quality', () => {
    let markdownFiles: MarkdownFile[] = []

    beforeAll(() => {
        markdownFiles = getAllMarkdownFiles(DOCS_DIR)
    })

    it('should not contain mojibake sequences', () => {
        const failures: string[] = []

        for (const file of markdownFiles) {
            const lines = file.content.split('\n')

            lines.forEach((line, index) => {
                if (MOJIBAKE_PATTERNS.some((pattern) => pattern.test(line))) {
                    failures.push(`${file.relativePath}:${index + 1} ${line.trim()}`)
                }
            })
        }

        if (failures.length > 0) {
            expect.fail(`Found mojibake in documentation:\n${failures.join('\n')}`)
        }
    })
})