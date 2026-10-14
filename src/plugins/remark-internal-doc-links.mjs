import { visit } from 'unist-util-visit';

export function isInternalMarkdownHref(href) {
  return Boolean(href)
    && !/^(?:[a-z]+:|#|\/)/i.test(href)
    && /\.md(?:#.*)?$/i.test(href);
}

/** Slugify one path segment the way Starlight routes it: drop a trailing `.md`, lower-case the rest. */
function slugifySegment(segment) {
  return segment.replace(/\.md$/i, '').toLowerCase();
}

/**
 * The current document's *directory*, as Starlight slug segments, relative to
 * the docs content root. e.g. `.../src/content/docs/01-INTENT/00-OVERVIEW.md`
 * -> `['01-intent']` (the file's own slug is dropped, leaving its directory).
 * Returns `null` when the path can't be located under `content/docs`.
 */
export function currentDirSegments(file) {
  const abs = file?.path ?? file?.history?.[0];
  if (typeof abs !== 'string') return null;

  const afterRoot = abs.replace(/\\/g, '/').split(/\/content\/docs\//i)[1];
  if (!afterRoot) return null;

  const segments = afterRoot.split('/').filter(Boolean).map(slugifySegment);
  segments.pop();
  return segments;
}

/**
 * Rewrite a file-relative markdown href (`./foo.md`, `../bar/baz.md`) into a
 * root-absolute Starlight route (`/foo/`, `/bar/baz/`), resolving it against
 * `fromDir` - the current document's directory as slug segments.
 *
 * Emitting an *absolute* path (rather than another relative link) is what
 * makes navigation correct: Starlight serves every page at a trailing-slash
 * URL (`/section/page/`), so a relative `./sibling/` resolves one level too
 * deep (`/section/page/sibling/` -> "Page Not Found"). An absolute route is
 * immune to that, and to whether the current URL carries a trailing slash.
 */
export function rewriteMarkdownHref(href, fromDir = []) {
  const [pathPart, hash = ''] = href.split('#');

  const resolved = [...fromDir];
  for (const segment of pathPart.split('/')) {
    if (!segment || segment === '.') continue;
    if (segment === '..') {
      resolved.pop();
      continue;
    }
    resolved.push(slugifySegment(segment));
  }

  const path = `/${resolved.join('/')}/`;
  return hash ? `${path}#${hash}` : path;
}

export function remarkInternalDocLinks() {
  return (tree, file) => {
    const fromDir = currentDirSegments(file) ?? [];

    visit(tree, 'link', (node) => {
      if (typeof node.url !== 'string' || !isInternalMarkdownHref(node.url)) {
        return;
      }

      node.url = rewriteMarkdownHref(node.url, fromDir);
    });
  };
}