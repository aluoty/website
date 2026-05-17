import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import { ArticleLayout } from '../components/ArticleLayout';
import { Navbar } from '../components/Navbar';
import { getArticleBySlug } from '../lib/articles';

export function ArticlePage() {
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const slug = params.slug ?? '';
  const article = getArticleBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  const openMenu = () => setLocation('/');

  if (!article) {
    return (
      <div className="page page--has-section" id="page-root">
        <Navbar
          activeSection="articles"
          onOpenMenu={openMenu}
          onNavigate={(id) => setLocation(`/?section=${id}`)}
        />
        <main className="content-view">
          <section className="articles-section content-section">
            <h2 className="section-title">Article not found</h2>
            <p className="hero-subtitle">
              No essay exists at <code>/articles/{slug}</code>.
            </p>
            <Link href="/?section=articles" className="card-link">
              ← Back to articles
            </Link>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="page page--has-section" id="page-root">
      <Navbar
        activeSection="articles"
        onOpenMenu={openMenu}
        onNavigate={(id) => {
          if (id === 'articles') {
            setLocation('/?section=articles');
          } else {
            setLocation(`/?section=${id}`);
          }
        }}
      />
      <main className="content-view content-view--article">
        <ArticleLayout
          title={article.title}
          description={article.description}
          date={article.date}
          tags={article.tags}
          readingTimeMinutes={article.readingTimeMinutes}
          content={article.content}
        />
      </main>
      <footer className="footer">
        <p>
          Built with React + Vite + TypeScript // Hosted via Cloudflare Edge
          Network
        </p>
      </footer>
    </div>
  );
}
