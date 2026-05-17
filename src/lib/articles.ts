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

/** Minimal YAML parser for our frontmatter fields (no Node-only deps). */
function parseFrontmatterYaml(yaml: string): ArticleFrontmatter {
  const data: Partial<ArticleFrontmatter> = {};
  const lines = yaml.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const match = line.match(/^(\w+):\s*(.*)$/);
    if (!match) {
      i++;
      continue;
    }

    const [, key, value] = match;

    if (key === 'tags' && value === '') {
      const tags: string[] = [];
      i++;
      while (i < lines.length && /^\s+-\s+/.test(lines[i])) {
        tags.push(lines[i].replace(/^\s+-\s+/, '').trim());
        i++;
      }
      data.tags = tags;
      continue;
    }

    if (key === 'title' || key === 'description' || key === 'date') {
      data[key] = value.trim();
    }

    i++;
  }

  if (!data.title || !data.description || !data.date) {
    throw new Error('Frontmatter requires title, description, and date');
  }

  return {
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags ?? [],
  };
}

function parseFrontmatter(raw: string): { data: ArticleFrontmatter; content: string } {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) {
    throw new Error('Article must start with YAML frontmatter between --- fences');
  }

  return { data: parseFrontmatterYaml(match[1]), content: match[2] };
}

function parseArticle(path: string, raw: string): Article | null {
  if (!raw.trim()) {
    if (import.meta.env.DEV) {
      console.warn(`[articles] Skipping empty file: ${slugFromPath(path)}.md`);
    }
    return null;
  }

  try {
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
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`[articles] Skipping invalid file: ${slugFromPath(path)}.md`, error);
    }
    return null;
  }
}

export function getAllArticles(): Article[] {
  return Object.entries(modules)
    .map(([path, raw]) => parseArticle(path, raw))
    .filter((article): article is Article => article !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}
