import { readFileSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'
import { remarkInternalDocLinks, rewriteMarkdownHref } from '../plugins/remark-internal-doc-links.mjs'

describe('Rendering Contracts', () => {
    it('should rewrite internal markdown links to absolute Starlight routes', () => {
        const tree: any = {
            type: 'root',
            children: [
                {
                    type: 'paragraph',
                    children: [
                        {
                            type: 'link',
                            url: '../05-TEMPLATES/00-OVERVIEW.md',
                            children: [{ type: 'text', value: 'Templates' }],
                        },
                    ],
                },
            ],
        }

        // A document living at src/content/docs/01-INTENT/00-OVERVIEW.md,
        // i.e. served at /01-intent/00-overview/.
        const file = { path: 'src/content/docs/01-INTENT/00-OVERVIEW.md' }
        remarkInternalDocLinks()(tree, file)

        // Absolute, not relative: on a trailing-slash page a relative
        // `../05-templates/...` would resolve one level too deep and 404.
        expect(tree.children[0].children[0].url).toBe('/05-templates/00-overview/')
    })

    it('should resolve internal links to absolute routes from the current dir', () => {
        // From /01-intent/00-overview/, a sibling link.
        const fromIntent = ['01-intent']
        expect(rewriteMarkdownHref('./01-SPECIFICATION.md', fromIntent)).toBe(
            '/01-intent/01-specification/',
        )
        expect(rewriteMarkdownHref('../00-OVERVIEW.md', fromIntent)).toBe('/00-overview/')

        // From /01-intent/intents/00-index/, preserving the anchor.
        const fromIntents = ['01-intent', 'intents']
        expect(rewriteMarkdownHref('./INT-002.md#examples', fromIntents)).toBe(
            '/01-intent/intents/int-002/#examples',
        )
    })

    it('should wire Mermaid rendering before Starlight with the shared theme', () => {
        const config = readFileSync(join(process.cwd(), 'astro.config.mjs'), 'utf8')

        // astro-mermaid transforms ```mermaid blocks; it must be registered and
        // must run before starlight() (expressive-code would otherwise render
        // the blocks as plain code).
        expect(config).toContain("from 'astro-mermaid'")
        expect(config).toContain(
            "from '@psa-department-of-engineering/starlight-theme'",
        )
        const mermaidIndex = config.indexOf('mermaid({')
        const starlightIndex = config.indexOf('starlight({')
        expect(mermaidIndex).toBeGreaterThan(-1)
        expect(starlightIndex).toBeGreaterThan(mermaidIndex)

        // The shared stylesheet carries the Mermaid contrast layer.
        expect(config).toContain('@psa-department-of-engineering/starlight-theme/styles.css')
    })
})
