/**
 * Lifecycle Consistency Tests
 *
 * Validates the 5-phase lifecycle is consistently documented.
 * Attests INT-CSD-004.
 */

import { describe, expect, beforeAll } from 'vitest'
import { intent } from '@psa-department-of-engineering/vitest-intent'
import { getAllMarkdownFiles, extractProseText } from './helpers/markdown-parser'
import type { MarkdownFile } from './helpers/markdown-parser'
import { DOCS_DIR } from './helpers/constants'
import { existsSync } from 'fs'
import { join } from 'path'

describe('Lifecycle Consistency', () => {
    let markdownFiles: MarkdownFile[] = []

    beforeAll(() => {
        markdownFiles = getAllMarkdownFiles(DOCS_DIR)
    })

    intent('INT-CSD-004', 'lifecycle should document all 5 phases', () => {
        const lifecycleOverview = markdownFiles.find(
            f => f.relativePath === '04-LIFECYCLE/00-OVERVIEW.md'
        )
        expect(lifecycleOverview).toBeDefined()

        const prose = extractProseText(lifecycleOverview!.content)
        const phases = ['Intent', 'Synthesi', 'Enforce', 'Learn', 'Deploy']

        for (const phase of phases) {
            expect(prose).toContain(phase)
        }
    })

    intent('INT-CSD-004', 'lifecycle child docs should exist for all phases', () => {
        const expected = [
            '04-LIFECYCLE/01-INTENT-FIRST.md',
            '04-LIFECYCLE/02-SYNTHESIS-WORKFLOW.md',
            '04-LIFECYCLE/03-CONTINUOUS-ENFORCEMENT.md',
            '04-LIFECYCLE/04-LEARNING-LOOP.md',
        ]

        const missing: string[] = []
        for (const file of expected) {
            if (!existsSync(join(DOCS_DIR, file))) {
                missing.push(file)
            }
        }

        if (missing.length > 0) {
            expect.fail(`Missing lifecycle docs:\n  ${missing.join('\n  ')}`)
        }
    })
})
