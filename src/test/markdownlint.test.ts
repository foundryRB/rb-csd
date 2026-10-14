/**
 * Markdown Lint Compliance Tests
 *
 * Attests INT-CSD-005: every markdown file passes markdownlint with zero
 * errors. Runs the same markdownlint-cli2 engine and configuration
 * (.markdownlint-cli2.yaml) as `npm run lint:md`, through the library API,
 * so the claim is enforced inside the vitest gate as well.
 */

import { describe, expect, vi } from 'vitest'
import { intent } from '@psa-department-of-engineering/vitest-intent'
import { main } from 'markdownlint-cli2'

// One test, one walk of the whole tree: markdownlint reads every markdown
// file, and on a shared runner that outlasts vitest's 5 s default, so the
// case fails on time rather than on a violation. Give the walk a minute.
vi.setConfig({ testTimeout: 60_000 })

describe('Markdown Lint Compliance', () => {
    intent(
        'INT-CSD-005',
        'all markdown files pass markdownlint with zero errors',
        async () => {
            const output: string[] = []
            const exitCode = await main({
                directory: process.cwd(),
                argv: [],
                logMessage: (message: string) => output.push(message),
                logError: (message: string) => output.push(message),
            })
            expect(exitCode, `markdownlint violations:\n${output.join('\n')}`).toBe(0)
        },
    )
})
