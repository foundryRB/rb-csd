import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

const rootDir = process.cwd();
const sourceDir = join(rootDir, 'docs');
const targetDir = join(rootDir, 'src', 'content', 'docs');

const frontmatterKeys = ['ID', 'Type', 'Status', 'Version', 'Updated', 'Owner'];

function walk(dir) {
  const entries = readdirSync(dir);
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }

    if (entry.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : 'Untitled';
}

function extractMetadata(content) {
  const lines = content.split('\n');
  const metadata = {};
  let inTable = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inTable && Object.keys(metadata).length > 0) {
        break;
      }
      continue;
    }

    if (trimmed.startsWith('| Attribute | Value |')) {
      inTable = true;
      continue;
    }

    if (!inTable) {
      continue;
    }

    if (trimmed.startsWith('|---')) {
      continue;
    }

    if (trimmed === '---') {
      break;
    }

    const match = trimmed.match(/^\|\s*\*\*(.+?)\*\*\s*\|\s*(.+?)\s*\|$/);
    if (match) {
      metadata[match[1].trim()] = match[2].trim();
    }
  }

  return metadata;
}

function removeLegacyHeader(content) {
  const lines = content.split('\n');
  let index = 0;

  while (index < lines.length && lines[index].trim() === '') {
    index += 1;
  }

  if (lines[index]?.startsWith('# ')) {
    index += 1;
  }

  while (index < lines.length && lines[index].trim() === '') {
    index += 1;
  }

  if (lines[index]?.trim() === '| Attribute | Value |') {
    while (index < lines.length) {
      if (lines[index].trim() === '---') {
        index += 1;
        break;
      }
      index += 1;
    }
  }

  while (index < lines.length && lines[index].trim() === '') {
    index += 1;
  }

  return lines.slice(index).join('\n').replace(/^---\n/, '').trimStart();
}

function buildFrontmatter(title, metadata) {
  const lines = ['---', `title: ${JSON.stringify(title)}`];
  const mapped = {
    id: metadata.ID,
    type: metadata.Type,
    status: metadata.Status,
    version: metadata.Version,
    updated: metadata.Updated,
    owner: metadata.Owner,
  };

  for (const key of ['id', 'type', 'status', 'version', 'updated', 'owner']) {
    const value = mapped[key];
    if (!value) continue;
    lines.push(`${key}: ${JSON.stringify(value)}`);
  }

  lines.push('---', '');
  return lines.join('\n');
}

function updateBody(relativePath, body) {
  let updated = body;

  const replacementsByFile = {
    '01-STANDARDS/01-DOCUMENTATION-STANDARD.md': [
      ['### 2.2 Metadata Table', '### 2.2 Frontmatter Metadata'],
      ['2. A metadata table with all mandatory fields', '2. YAML frontmatter with all mandatory fields'],
      ['Documents MUST include a navigation section after the metadata table showing:', 'Documents MUST include a navigation section after the frontmatter block showing:'],
      ['- Metadata', '- Comparison and reference data'],
      ['- [ ] Has complete metadata table', '- [ ] Has complete frontmatter metadata'],
    ],
    '01-STANDARDS/02-METADATA-STANDARD.md': [
      ['All documents MUST include these metadata fields:', 'All documents MUST include these frontmatter fields:'],
      ['| **Type** | Document type | One of: Overview, Standard, Intent, TestSpec, Guide |', '| **Type** | Document type | One of: Overview, Standard, Guide, Template, Reference, Intent |'],
      ['| **Status** | Current status | One of: Draft, Review, Active, Deprecated |', '| **Status** | Current status | One of: Draft, Active, Deprecated |'],
      ['| **Path** | Relative path from docs root | `folder/file.md` |\n', ''],
      ['| **Owner** | Responsible team/person | For Standards, Intent Specs |', '| **Owner** | Responsible team/person | For Standards and Intent specs |'],
      ['| **Scope** | Test execution scope | For Intent Specs |\n', ''],
      ['| **Component** | Target component | For Intent Specs |\n', ''],
      ['| **Criticality** | Business criticality | For Intent Specs |', '| **Criticality** | Business criticality | For intent specs when needed |'],
      ['Draft --> Review : Submit for review\nReview --> Draft : Changes requested\nReview --> Active : Approved\n', 'Draft --> Active : Approved\n'],
      ['note right of Review : Under team review\n', ''],
      ['| **Review** | Submitted for approval |\n', ''],
      ['    - Path\n', ''],
      ['    Type: enum[Overview, Standard, Intent, TestSpec, Guide]\n', '    Type: enum[Overview, Standard, Guide, Template, Reference, Intent]\n'],
      ['    Status: enum[Draft, Review, Active, Deprecated]\n', '    Status: enum[Draft, Active, Deprecated]\n'],
      ['    Path: string\n', ''],
    ],
    '06-TEMPLATES/03-DOCUMENT-TEMPLATE.md': [
      ['| Attribute | Value |\n|-----------|-------|\n| **ID** | CSD-[SECTION]-OVERVIEW |\n| **Type** | Overview |\n| **Status** | [Draft/Active/Deprecated] |\n| **Path** | docs/[NN]-[SECTION]/00-OVERVIEW.md |\n| **Version** | X.Y.Z |\n| **Updated** | YYYY-MM-DD |', '---\nid: CSD-[SECTION]-OVERVIEW\ntype: Overview\nstatus: [Draft/Active/Deprecated]\nversion: X.Y.Z\nupdated: YYYY-MM-DD\n---'],
      ['| Attribute | Value |\n|-----------|-------|\n| **ID** | CSD-[SECTION]-NN |\n| **Type** | Standard |\n| **Status** | [Draft/Active/Deprecated] |\n| **Path** | docs/[NN]-[SECTION]/[NN]-[FILENAME].md |\n| **Version** | X.Y.Z |\n| **Updated** | YYYY-MM-DD |', '---\nid: CSD-[SECTION]-NN\ntype: Standard\nstatus: [Draft/Active/Deprecated]\nversion: X.Y.Z\nupdated: YYYY-MM-DD\n---'],
      ['| Attribute | Value |\n|-----------|-------|\n| **ID** | CSD-[SECTION]-NN |\n| **Type** | Guide |\n| **Status** | [Draft/Active/Deprecated] |\n| **Path** | docs/[NN]-[SECTION]/[NN]-[FILENAME].md |\n| **Version** | X.Y.Z |\n| **Updated** | YYYY-MM-DD |', '---\nid: CSD-[SECTION]-NN\ntype: Guide\nstatus: [Draft/Active/Deprecated]\nversion: X.Y.Z\nupdated: YYYY-MM-DD\n---'],
    ],
    '02-INTENT/intents/INT-CSD-003.md': [
      ['statement: "Every CSD document must contain a metadata table with all mandatory fields set to valid values"', 'statement: "Every CSD document must contain frontmatter metadata with all mandatory fields set to valid values"'],
      ['The metadata table is the primary mechanism for automated tooling to classify, index, and validate documents.', 'Frontmatter metadata is the primary mechanism for automated tooling to classify, index, and validate documents.'],
      ['Every document metadata table must contain:', 'Every document frontmatter block must contain:'],
      ['| **Type** | One of: Overview, Standard, Guide, Template, Reference |', '| **Type** | One of: Overview, Standard, Guide, Template, Reference, Intent |'],
      ['| **Path** | Must match the file\'s actual relative path |\n', ''],
      ['The test parses each markdown file\'s metadata table, extracts field values, and validates against the rules above.', 'The test parses each markdown file\'s frontmatter, extracts field values, and validates against the rules above.'],
    ],
    '02-INTENT/intents/INT-CSD-005.md': [
      ['| MD041 | Disabled | Metadata table comes before H1 in CSD format |', '| MD041 | Disabled | Starlight content uses frontmatter before body headings |'],
    ],
  };

  for (const [search, replacement] of replacementsByFile[relativePath] ?? []) {
    updated = updated.replace(search, replacement);
  }

  updated = updated.replace(/metadata table/g, 'frontmatter metadata');
  updated = updated.replace(/Metadata table/g, 'Frontmatter metadata');
  updated = updated.replace(/metadata tables/g, 'frontmatter metadata blocks');
  updated = updated.replace(/Metadata tables/g, 'Frontmatter metadata blocks');
  updated = updated.replace(/after the frontmatter metadata block/g, 'after the frontmatter block');

  return updated.trimStart() + '\n';
}

if (!existsSync(sourceDir)) {
  throw new Error(`Legacy docs folder not found: ${sourceDir}`);
}

rmSync(targetDir, { recursive: true, force: true });
mkdirSync(targetDir, { recursive: true });

for (const filePath of walk(sourceDir)) {
  const relativePath = relative(sourceDir, filePath).replace(/\\/g, '/');
  const content = readFileSync(filePath, 'utf8');
  const title = extractTitle(content);
  const metadata = extractMetadata(content);

  if (!frontmatterKeys.some((key) => metadata[key])) {
    throw new Error(`Missing legacy metadata in ${relativePath}`);
  }

  const body = updateBody(relativePath, removeLegacyHeader(content));
  const output = `${buildFrontmatter(title, metadata)}${body}`;
  const targetPath = join(targetDir, relativePath);

  mkdirSync(dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, output, 'utf8');
}

console.log(`Migrated ${walk(targetDir).length} files to ${targetDir}`);
