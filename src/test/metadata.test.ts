/**
 * Metadata Validation Tests
 *
 * Ensures all CSD docs have proper metadata tables with required fields.
 * Attests INT-CSD-003.
 */

import { describe, it, expect, beforeAll } from 'vitest'
import { intent } from '@psa-department-of-engineering/vitest-intent'
import {
    getAllMarkdownFiles,
    extractFrontmatter,
} from './helpers/markdown-parser'
import type { MarkdownFile } from './helpers/markdown-parser'
import {
    DOCS_DIR,
    MANDATORY_METADATA_FIELDS,
    VALID_STATUSES,
    VALID_TYPES,
} from './helpers/constants'

describe('Metadata Compliance', () => {
    let markdownFiles: MarkdownFile[] = []

    beforeAll(() => {
        markdownFiles = getAllMarkdownFiles(DOCS_DIR)
    })

    intent('INT-CSD-003', 'all documents should have frontmatter metadata', () => {
        const missing: string[] = []

        for (const file of markdownFiles) {
            // Skip intent example files in intents/ subfolder
            if (file.relativePath.includes('intents/') && !file.relativePath.includes('00-INDEX')) continue

            const meta = extractFrontmatter(file.content)
            if (!meta) {
                missing.push(file.relativePath)
            }
        }

        if (missing.length > 0) {
            expect.fail(
                `${missing.length} documents missing frontmatter metadata:\n  ${missing.join('\n  ')}`
            )
        }
    })

    intent('INT-CSD-003', 'metadata should have all mandatory fields', () => {
        const violations: { file: string; missing: string[] }[] = []

        for (const file of markdownFiles) {
            if (file.relativePath.includes('intents/') && !file.relativePath.includes('00-INDEX')) continue

            const meta = extractFrontmatter(file.content)
            if (!meta) continue

            const missingFields = MANDATORY_METADATA_FIELDS.filter(f => !meta[f])

            if (missingFields.length > 0) {
                violations.push({ file: file.relativePath, missing: [...missingFields] })
            }
        }

        if (violations.length > 0) {
            const details = violations
                .map(v => `  ${v.file}: missing ${v.missing.join(', ')}`)
                .join('\n')
            expect.fail(`Metadata field violations:\n${details}`)
        }
    })

    intent('INT-CSD-003', 'Status field should be a valid value', () => {
        const invalid: { file: string; status: string }[] = []

        for (const file of markdownFiles) {
            if (file.relativePath.includes('intents/') && !file.relativePath.includes('00-INDEX')) continue

            const meta = extractFrontmatter(file.content)
            if (!meta || !meta.status) continue

            if (!VALID_STATUSES.includes(meta.status as any)) {
                invalid.push({ file: file.relativePath, status: meta.status })
            }
        }

        if (invalid.length > 0) {
            const details = invalid
                .map(v => `  ${v.file}: "${v.status}" (expected: ${VALID_STATUSES.join(', ')})`)
                .join('\n')
            expect.fail(`Invalid Status values:\n${details}`)
        }
    })

    intent('INT-CSD-003', 'Type field should be a valid value', () => {
        const invalid: { file: string; type: string }[] = []

        for (const file of markdownFiles) {
            if (file.relativePath.includes('intents/') && !file.relativePath.includes('00-INDEX')) continue

            const meta = extractFrontmatter(file.content)
            if (!meta || !meta.type) continue

            if (!VALID_TYPES.includes(meta.type as any)) {
                invalid.push({ file: file.relativePath, type: meta.type })
            }
        }

        if (invalid.length > 0) {
            const details = invalid
                .map(v => `  ${v.file}: "${v.type}" (expected: ${VALID_TYPES.join(', ')})`)
                .join('\n')
            expect.fail(`Invalid Type values:\n${details}`)
        }
    })

    intent('INT-CSD-003', 'title field should be present and non-empty', () => {
        const missing: string[] = []

        for (const file of markdownFiles) {
            if (file.relativePath.includes('intents/') && !file.relativePath.includes('00-INDEX')) continue

            const meta = extractFrontmatter(file.content)
            if (!meta?.title?.trim()) {
                missing.push(file.relativePath)
            }
        }

        if (missing.length > 0) {
            expect.fail(`Missing or empty title field:\n  ${missing.join('\n  ')}`)
        }
    })

    it('should report metadata compliance summary', () => {
        let total = 0
        let compliant = 0

        for (const file of markdownFiles) {
            if (file.relativePath.includes('intents/') && !file.relativePath.includes('00-INDEX')) continue

            total++
            const meta = extractFrontmatter(file.content)
            if (!meta) continue

            const hasAll = MANDATORY_METADATA_FIELDS.every(f => meta[f])
            if (hasAll) compliant++
        }

        console.log(`\nMetadata Compliance: ${compliant}/${total} (${Math.round(100 * compliant / total)}%)`)
    })
})
