/**
 * Terminology Consistency Tests
 *
 * Enforces that CSD uses Cognitive Modes language consistently,
 * not the deprecated "roles" terminology. Attests INT-CSD-001.
 */

import { describe, expect, beforeAll } from 'vitest'
import { intent } from '@psa-department-of-engineering/vitest-intent'
import { getAllMarkdownFiles, extractProseText } from './helpers/markdown-parser'
import type { MarkdownFile } from './helpers/markdown-parser'
import { DOCS_DIR, TERM_RULES } from './helpers/constants'

describe('Terminology Consistency', () => {
    let markdownFiles: MarkdownFile[] = []

    beforeAll(() => {
        markdownFiles = getAllMarkdownFiles(DOCS_DIR)
    })

    for (const rule of TERM_RULES) {
        intent('INT-CSD-001', `should use "${rule.canonical}" consistently`, () => {
            const violations: { file: string; match: string; line: number }[] = []

            for (const file of markdownFiles) {
                if (rule.skipFiles && rule.skipFiles.test(file.relativePath)) continue

                const prose = extractProseText(file.content)
                const lines = prose.split('\n')

                for (let i = 0; i < lines.length; i++) {
                    for (const pattern of rule.incorrect) {
                        const match = lines[i].match(pattern)
                        if (match) {
                            violations.push({
                                file: file.relativePath,
                                match: match[0],
                                line: i + 1,
                            })
                        }
                    }
                }
            }

            if (violations.length > 0) {
                const details = violations
                    .map(v => `  ${v.file}:${v.line} - found "${v.match}"`)
                    .join('\n')
                expect.fail(
                    `Found ${violations.length} uses of deprecated terminology (should be "${rule.canonical}"):\n${details}`
                )
            }
        })
    }
})
