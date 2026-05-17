import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createHighlighter, type Highlighter } from 'shiki';
import type { Components } from 'react-markdown';

interface MarkdownContentProps {
  content: string;
}

const SUPPORTED_LANGS = [
  'typescript',
  'javascript',
  'python',
  'bash',
  'json',
  'markdown',
  'glsl',
  'tsx',
  'jsx',
  'text',
] as const;

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark'],
      langs: [...SUPPORTED_LANGS],
    });
  }
  return highlighterPromise;
}

function CodeBlock({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [html, setHtml] = useState<string | null>(null);
  const code = String(children ?? '').replace(/\n$/, '');
  const language = className?.replace('language-', '') || 'text';

  useEffect(() => {
    let cancelled = false;

    getHighlighter()
      .then((highlighter) => {
        const lang = highlighter.getLoadedLanguages().includes(language)
          ? language
          : 'text';
        return highlighter.codeToHtml(code, {
          lang,
          theme: 'github-dark',
        });
      })
      .then((highlighted) => {
        if (!cancelled) setHtml(highlighted);
      })
      .catch(() => {
        if (!cancelled) {
          setHtml(
            `<pre class="shiki fallback"><code>${code.replace(/</g, '&lt;')}</code></pre>`,
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  if (!html) {
    return (
      <pre className="article-pre--loading">
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div
      className="article-shiki"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

const markdownComponents: Components = {
  code({ className, children, ...props }) {
    const isBlock = Boolean(className) || String(children).includes('\n');

    if (!isBlock) {
      return (
        <code className="article-inline-code" {...props}>
          {children}
        </code>
      );
    }

    return <CodeBlock className={className}>{children}</CodeBlock>;
  },
  a({ href, children, ...props }) {
    const external = href?.startsWith('http');
    return (
      <a
        href={href}
        {...props}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </a>
    );
  },
};

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {content}
    </ReactMarkdown>
  );
}
