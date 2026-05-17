export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  tags?: string[];
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
  readingTimeMinutes: number;
  tags: string[];
}
