import { readFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

export interface MarkdownFile {
    path: string
    relativePath: string
    content: string
}

export interface MetadataTable {
    [key: string]: string
}

/**
 * Recursively collects all markdown files from a directory.
 */
export function getAllMarkdownFiles(dir: string, basePath: string = ''): MarkdownFile[] {
    const files: MarkdownFile[] = []

    if (!existsSync(dir)) return files

    const items = readdirSync(dir)
    for (const item of items) {
        const fullPath = join(dir, item)
        const relativePath = basePath ? `${basePath}/${item}` : item
        const stat = statSync(fullPath)

        if (stat.isDirectory()) {
            files.push(...getAllMarkdownFiles(fullPath, relativePath))
        } else if (item.endsWith('.md')) {
            files.push({
                path: fullPath,
                relativePath,
                content: readFileSync(fullPath, 'utf-8'),
            })
        }
    }

    return files
}

/**
 * Extracts YAML frontmatter from CSD docs.
 */
export function extractFrontmatter(content: string): MetadataTable | null {
    const match = content.match(/^---\n([\s\S]*?)\n---/)
    if (!match) return null

    const meta: MetadataTable = {}
    const lines = match[1].split('\n')

    for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue

        const kvMatch = trimmed.match(/^([A-Za-z0-9_-]+):\s*(.+)$/)
        if (!kvMatch) continue

        const key = kvMatch[1].trim()
        let value = kvMatch[2].trim()

        value = value.replace(/^['"]|['"]$/g, '')
        meta[key] = value
    }

    return Object.keys(meta).length > 0 ? meta : null
}

/**
 * Extracts all internal markdown links from content (outside code blocks).
 */
export function extractMarkdownLinks(content: string): string[] {
    const contentWithoutCodeBlocks = content.replace(/```[\s\S]*?```/g, '')
    const contentWithoutInlineCode = contentWithoutCodeBlocks.replace(/`[^`]+`/g, '')
    const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g
    const links: string[] = []
    let match

    while ((match = linkRegex.exec(contentWithoutInlineCode)) !== null) {
        const href = match[2]
        if (
            (href.endsWith('.md') || href.includes('.md#')) &&
            !href.startsWith('http://') &&
            !href.startsWith('https://')
        ) {
            links.push(href.split('#')[0])
        }
    }

    return links
}

/**
 * Strips code blocks, frontmatter, inline code, URLs, and HTML comments
 * so we only check prose text.
 */
export function extractProseText(content: string): string {
    let text = content

    // Remove fenced code blocks
    text = text.replace(/```[\s\S]*?```/g, '')

    // Remove YAML frontmatter
    text = text.replace(/^---\n[\s\S]*?\n---\n*/m, '')

    // Remove inline code
    text = text.replace(/`[^`]+`/g, '')

    // Remove URLs
    text = text.replace(/https?:\/\/[^\s)]+/g, '')

    // Remove link targets (the URL part of [text](url))
    text = text.replace(/\]\([^)]+\)/g, ']()')

    // Remove HTML comments
    text = text.replace(/<!--[\s\S]*?-->/g, '')

    // Remove Change Log section (contains historical role names)
    text = text.replace(/## Change Log[\s\S]*$/m, '')

    return text
}

/**
 * Extracts the Navigation section from a doc and returns the child links.
 */
export function extractNavChildren(content: string): string[] {
    const navMatch = content.match(/## Navigation[\s\S]*?(?=\n---|\n## [^N])/m)
    if (!navMatch) return []

    const links: string[] = []
    const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g
    let match
    while ((match = linkRegex.exec(navMatch[0])) !== null) {
        const href = match[2]
        if (href.endsWith('.md') || href.includes('.md#')) {
            links.push(href.split('#')[0])
        }
    }

    // Filter to only children (not parent links)
    return links.filter(l => !l.includes('..'))
}
