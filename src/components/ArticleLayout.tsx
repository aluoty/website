import { Link } from 'wouter';
import { MarkdownContent } from './MarkdownContent';
import './ArticleLayout.css';

interface ArticleLayoutProps {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  readingTimeMinutes?: number;
  content: string;
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function ArticleLayout({
  title,
  description,
  date,
  tags = [],
  readingTimeMinutes,
  content,
}: ArticleLayoutProps) {
  return (
    <article className="article-layout">
      <header className="article-layout__header">
        <Link href="/?section=articles" className="article-layout__back">
          ← Back to articles
        </Link>
        <p className="article-layout__meta">
          <time dateTime={date}>{formatDate(date)}</time>
          {readingTimeMinutes != null && (
            <>
              <span className="article-layout__sep" aria-hidden="true">
                ·
              </span>
              <span>{readingTimeMinutes} min read</span>
            </>
          )}
        </p>
        <h1 className="article-layout__title">{title}</h1>
        <p className="article-layout__description">{description}</p>
        {tags.length > 0 && (
          <ul className="article-layout__tags">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </header>

      <div className="article-layout__body">
        <MarkdownContent content={content} />
      </div>
    </article>
  );
}
