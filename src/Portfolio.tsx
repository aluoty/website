import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import type { Project } from './App';
import { Navbar } from './components/Navbar';
import { ProjectVideoPlayer } from './components/ProjectVideoPlayer';
import { OrbitMenu } from './OrbitMenu';
import { getAllArticles } from './lib/articles';
import type { SectionId } from './types/sections';
import './App.css';

const SECTION_IDS: SectionId[] = ['contact', 'projects', 'articles', 'values'];

function isSectionId(value: string): value is SectionId {
  return SECTION_IDS.includes(value as SectionId);
}

interface PortfolioProps {
  projects: Project[];
}

export function Portfolio({ projects }: PortfolioProps) {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const [menuOpen, setMenuOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [copied, setCopied] = useState(false);

  const articles = getAllArticles();

  const values = [
    {
      title: 'Build to learn',
      description:
        'I learn best by making things — games, tools, and experiments on my Fedora Linux machine.',
    },
    {
      title: 'Curiosity first',
      description:
        'I wonder what things mean, from Nebulance to Neon Drift, they all started with a simple idea and question',
    },
    {
      title: 'Share what works',
      description:
        'Projects like Nebulance and AetherScope are meant to be played, explored, and improved in the open.',
    },
    {
      title: 'Be a questioner not an accepter',
      description:
         'I question everything, I never accept things that I do not understand or have no evidence.',
    }
  ];

  useEffect(() => {
    const section = new URLSearchParams(search).get('section');
    if (section && isSectionId(section)) {
      setActiveSection(section);
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [search]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('alexanderluo0910@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNavigate = useCallback(
    (sectionId: SectionId) => {
      setActiveSection(sectionId);
      setMenuOpen(false);
      setLocation(`/?section=${sectionId}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [setLocation],
  );

  const openMenu = useCallback(() => {
    setMenuOpen(true);
    setActiveSection(null);
    setLocation('/');
  }, [setLocation]);

  return (
    <>
      <OrbitMenu open={menuOpen} onNavigate={handleNavigate} />

      <div
        className={`page${menuOpen ? ' page--menu-open' : ''}${activeSection ? ' page--has-section' : ''}`}
        id="page-root"
      >
        <Navbar
          hidden={menuOpen}
          activeSection={activeSection}
          onOpenMenu={openMenu}
          onNavigate={handleNavigate}
        />

        <main className="content-view">
          {activeSection === 'contact' && (
            <section id="contact" className="hero-section content-section">
              <div className="section-label">Contact</div>
              <div className="terminal-badge">Hi! It&apos;s me Alexander Luo.</div>
              <h1 className="hero-title">Computer Science &amp; Applied Programming</h1>
              <p className="hero-subtitle">
                I&apos;m a primary school student designing games and tools on my
                Fedora Linux machine.
              </p>
              <div className="cta-group">
                <button onClick={handleCopyEmail} className="btn-primary">
                  {copied ? 'Copied To ClipBoard!' : 'Contact me via Gmail'}
                </button>
                <a
                  href="https://wa.me/6583380910"
                  className="btn-whatsapp"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contact me via WhatsApp
                </a>
              </div>
            </section>
          )}

          {activeSection === 'projects' && (
            <section id="projects" className="projects-section content-section">
              <h2 className="section-title">Major Projects</h2>
              <div className="projects-grid">
                {projects.map((project, idx) => (
                  <div key={idx} className="project-card">
                    <div className="card-header">
                      <span
                        className={`status-indicator ${project.status}`}
                      ></span>
                      <span className="status-text">
                        {project.status.toUpperCase()}
                      </span>
                    </div>
                    {project.videoSrc && (
                      <ProjectVideoPlayer src={project.videoSrc} />
                    )}
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tag-row">
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        className="card-link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Launch &raquo;
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeSection === 'articles' && (
            <section id="articles" className="articles-section content-section">
              <h2 className="section-title">Articles</h2>
              <p className="articles-intro">
                Long-form notes on code, graphics, and building things. Each essay
                lives in its own Markdown file under{' '}
                <code>src/content/articles/</code>.
              </p>
              <div className="articles-grid">
                {articles.map((article) => (
                  <article key={article.slug} className="article-card">
                    <p className="article-card__date">
                      <time dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <span> · {article.readingTimeMinutes} min read</span>
                    </p>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                    {article.tags.length > 0 && (
                      <div className="tag-row">
                        {article.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link
                      href={`/articles/${article.slug}`}
                      className="card-link"
                    >
                      Read article &raquo;
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}

          {activeSection === 'values' && (
            <section id="values" className="values-section content-section">
              <h2 className="section-title">Values</h2>
              <div className="values-grid">
                {values.map((value, idx) => (
                  <div key={idx} className="value-card">
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {activeSection && (
          <footer className="footer">
            <p>
              Built with React + Vite + TypeScript // Hosted via Cloudflare Edge
              Network
            </p>
          </footer>
        )}
      </div>
    </>
  );
}
