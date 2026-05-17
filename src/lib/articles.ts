import { parse as parseYaml } from 'yaml';
import type { Article, ArticleFrontmatter } from '../types/article';

/**
 * Article essays live as Markdown files in `src/content/articles/`.
 * Each file becomes one post; the filename (without .md) is the URL slug.
 *
 * Example: `src/content/articles/my-post.md` → `/articles/my-post`
 *
 * Frontmatter (YAML at the top of the file) holds metadata; everything
 * below the `---` fence is the essay body (Markdown, up to ~1,000 words).
 */
const modules = import.meta.glob<string>('../content/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function slugFromPath(path: string): string {
  const filename = path.split('/').pop() ?? '';
  return filename.replace(/\.md$/, '');
}

function readingTimeMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function parseFrontmatter(raw: string): { data: ArticleFrontmatter; content: string } {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) {
    throw new Error('Article must start with YAML frontmatter between --- fences');
  }

  const data = parseYaml(match[1]) as ArticleFrontmatter;
  return { data, content: match[2] };
}

function parseArticle(path: string, raw: string): Article {
  const { data, content } = parseFrontmatter(raw);
  const body = content.trim();

  return {
    slug: slugFromPath(path),
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags ?? [],
    content: body,
    readingTimeMinutes: readingTimeMinutes(body),
  };
}

export function getAllArticles(): Article[] {
  return Object.entries(modules)
    .map(([path, raw]) => parseArticle(path, raw))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}
