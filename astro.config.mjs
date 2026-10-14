import { defineConfig } from 'astro/config';
import mermaid from 'astro-mermaid';
import starlight from '@astrojs/starlight';
import { mermaidConfig } from '@psa-department-of-engineering/starlight-theme';
import { remarkInternalDocLinks } from './src/plugins/remark-internal-doc-links.mjs';

export default defineConfig({
  site: process.env.CSD_DOCS_SITE ?? 'http://localhost:4321',
  markdown: {
    remarkPlugins: [remarkInternalDocLinks],
  },
  integrations: [
    // Must precede starlight so it transforms ```mermaid blocks before
    // expressive-code renders them as code. autoTheme follows dark/light.
    // mermaidConfig + the stylesheet come from the shared starlight-theme package
    // (one source of truth; REF-StarlightDocs 8.1).
    mermaid({ autoTheme: true, mermaidConfig }),
    starlight({
      title: 'Cognitive Software Delivery',
      components: { PageFrame: './src/components/PageFrame.astro', SiteTitle: './src/components/SiteTitle.astro' },
      logo: { light: './src/assets/vfpt-lockup-light.svg', dark: './src/assets/vfpt-lockup-dark.svg', alt: 'Digital Engineering, Vodafone Portugal' },
      description: 'An AI-first delivery loop assembled from existing SDLC practice.',
      // Shared theme first, then this site's own overrides. site.css
      // must stay last: it re-maps the Starlight color tokens per scheme and
      // relies on cascade order to override the shared theme.
      customCss: [
        '@psa-department-of-engineering/starlight-theme/styles.css',
        './src/styles/custom.css',
        './src/styles/site.css',
        './src/styles/vodafone.css',
      ],
      disable404Route: true,
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
      lastUpdated: true,
      sidebar: [
        {
          label: 'Start Here',
          items: ['00-overview'],
        },
        {
          label: 'Intent',
          items: [{ autogenerate: { directory: '01-INTENT' } }],
        },
        {
          label: 'Testing',
          items: [{ autogenerate: { directory: '02-TESTING' } }],
        },
        {
          label: 'Teams',
          items: [{ autogenerate: { directory: '03-TEAMS' } }],
        },
        {
          label: 'Lifecycle',
          items: [{ autogenerate: { directory: '04-LIFECYCLE' } }],
        },
        {
          label: 'Templates',
          items: [{ autogenerate: { directory: '05-TEMPLATES' } }],
        },
        {
          label: 'Adoption',
          items: [{ autogenerate: { directory: '06-ADOPTION' } }],
        },
        {
          label: 'Contributing',
          items: [{ autogenerate: { directory: '07-CONTRIBUTING' } }],
        },
      ],
    }),
  ],
});
