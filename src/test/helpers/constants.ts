import { join } from 'path'

export const DOCS_DIR = join(process.cwd(), 'src', 'content', 'docs')

/**
 * CSD Cognitive Modes terminology rules.
 * Each rule defines a canonical term and incorrect variants that should NOT appear in prose.
 */
export interface TermRule {
    canonical: string
    incorrect: RegExp[]
    /** Skip matches in files matching this pattern */
    skipFiles?: RegExp
}

export const TERM_RULES: TermRule[] = [
    {
        canonical: 'Intent Mode',
        incorrect: [
            /\bIntent Owner\b/,
        ],
        // Allow in the changelog section and metadata tables
        skipFiles: /05-TEMPLATES/,
    },
    {
        canonical: 'Synthesis Mode',
        incorrect: [
            /\bSynthesis Operator\b/,
        ],
        skipFiles: /05-TEMPLATES/,
    },
    {
        canonical: 'Enforcement Mode',
        incorrect: [
            /\bQuality Guardian\b/,
        ],
        skipFiles: /05-TEMPLATES/,
    },
    {
        canonical: 'Cognitive Modes (not roles)',
        incorrect: [
            /\bCSD roles\b/i,
            /\bIdentify Roles\b/,
            /\bRole Definition\b/,
            /\bRole clarity\b/i,
        ],
    },
    {
        canonical: 'Cognitive Software Delivery',
        incorrect: [
            /\bCognitive software delivery\b/,  // wrong capitalization
        ],
    },
]

/**
 * Mandatory frontmatter fields for all CSD docs.
 */
export const MANDATORY_METADATA_FIELDS = [
    'title',
    'id',
    'type',
    'status',
    'version',
    'updated',
] as const

export const VALID_STATUSES = ['Draft', 'Active', 'Deprecated'] as const
export const VALID_TYPES = ['Overview', 'Standard', 'Guide', 'Template', 'Reference', 'Intent'] as const
