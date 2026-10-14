import { existsSync } from 'fs'
import { dirname, resolve, join } from 'path'
import { describe, expect } from 'vitest'
import { intent } from '@psa-department-of-engineering/vitest-intent'
import { getAllMarkdownFiles } from './helpers/markdown-parser'
import { DOCS_DIR } from './helpers/constants'

/**
 * Regression guard for broken internal navigation. Attests INT-CSD-002.
 *
 * Scans every `.md` file under src/content/docs and asserts that every
 * internal markdown link resolves to an existing file on disk.
 */

const LINK_REGEX = /\[([^\]]*)\]\(([^)]+)\)/g

function isInternalMdHref(href: string): boolean {
    if (!href) return false
    if (/^(?:[a-z]+:|#|\/)/i.test(href)) return false
    return /\.md(?:#.*)?$/i.test(href)
}

interface LinkRef {
    sourceFile: string
    href: string
    targetPath: string
}

describe('Internal Link Validity', () => {
    const files = getAllMarkdownFiles(DOCS_DIR)
    const brokenLinks: LinkRef[] = []

    for (const file of files) {
        const contentNoCode = file.content
            .replace(/```[\s\S]*?```/g, '')
            .replace(/`[^`]+`/g, '')

        let match: RegExpExecArray | null
        LINK_REGEX.lastIndex = 0
        while ((match = LINK_REGEX.exec(contentNoCode)) !== null) {
            const href = match[2].trim()
            if (!isInternalMdHref(href)) continue

            const pathPart = href.split('#')[0]
            const targetPath = resolve(dirname(join(DOCS_DIR, file.relativePath)), pathPart)

            if (!existsSync(targetPath)) {
                brokenLinks.push({
                    sourceFile: file.relativePath,
                    href,
                    targetPath,
                })
            }
        }
    }

    intent('INT-CSD-002', 'every internal markdown link should resolve to an existing file', () => {
        if (brokenLinks.length > 0) {
            const details = brokenLinks
                .map((l) => `  ${l.sourceFile} -> ${l.href}`)
                .join('\n')
            throw new Error(
                `Found ${brokenLinks.length} broken internal link(s):\n${details}`,
            )
        }
        expect(brokenLinks).toHaveLength(0)
    })
})
