/**
 * Document Structure Tests
 *
 * Validates navigation tree, internal links, and structural consistency.
 */

import { describe, it, expect, beforeAll } from 'vitest'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import {
    getAllMarkdownFiles,
    extractMarkdownLinks,
    extractNavChildren,
} from './helpers/markdown-parser'
import type { MarkdownFile } from './helpers/markdown-parser'
import { DOCS_DIR } from './helpers/constants'

describe('Document Structure', () => {
    let markdownFiles: MarkdownFile[] = []

    beforeAll(() => {
        markdownFiles = getAllMarkdownFiles(DOCS_DIR)
    })

    it('should have markdown files to validate', () => {
        expect(markdownFiles.length).toBeGreaterThan(0)
        console.log(`Found ${markdownFiles.length} markdown files`)
    })

    it('should have no broken internal links', () => {
        const broken: { file: string; link: string }[] = []

        for (const file of markdownFiles) {
            const links = extractMarkdownLinks(file.content)
            const fileDir = dirname(file.path)

            for (const link of links) {
                const target = join(fileDir, link)
                if (!existsSync(target)) {
                    broken.push({ file: file.relativePath, link })
                }
            }
        }

        if (broken.length > 0) {
            const details = broken
                .map(b => `  ${b.file} -> ${b.link}`)
                .join('\n')
            expect.fail(`Found ${broken.length} broken internal links:\n${details}`)
        }
    })

    it('should have navigation children that resolve to existing files', () => {
        const broken: { file: string; child: string }[] = []

        for (const file of markdownFiles) {
            if (!file.relativePath.includes('00-OVERVIEW.md')) continue

            const children = extractNavChildren(file.content)
            const fileDir = dirname(file.path)

            for (const child of children) {
                const target = join(fileDir, child)
                if (!existsSync(target)) {
                    broken.push({ file: file.relativePath, child })
                }
            }
        }

        if (broken.length > 0) {
            const details = broken
                .map(b => `  ${b.file} -> ${b.child}`)
                .join('\n')
            expect.fail(`Found ${broken.length} broken navigation children:\n${details}`)
        }
    })

    it('every folder with docs should have a 00-OVERVIEW.md', () => {
        const folders = new Set<string>()

        for (const file of markdownFiles) {
            const parts = file.relativePath.split('/')
            if (parts.length > 1) {
                // Get the folder path (without the filename)
                const folder = parts.slice(0, -1).join('/')
                folders.add(folder)
            }
        }

        const missing: string[] = []
        for (const folder of folders) {
            // Skip intents subfolder
            if (folder.includes('intents')) continue

            const overviewPath = join(DOCS_DIR, folder, '00-OVERVIEW.md')
            if (!existsSync(overviewPath)) {
                missing.push(folder)
            }
        }

        if (missing.length > 0) {
            expect.fail(`Folders missing 00-OVERVIEW.md:\n  ${missing.join('\n  ')}`)
        }
    })
})
