import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import { Navbar } from './components/Navbar';
import { OrbitMenu } from './OrbitMenu';
import { getAllArticles } from './lib/articles';
import type { SectionId } from './types/sections';
import './App.css';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  status: 'active' | 'completed' | 'in-progress';
}

const SECTION_IDS: SectionId[] = ['contact', 'projects', 'articles', 'values'];

function isSectionId(value: string): value is SectionId {
  return SECTION_IDS.includes(value as SectionId);
}

export function Portfolio() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const [menuOpen, setMenuOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [copied, setCopied] = useState(false);

  const articles = getAllArticles();

  const projects: Project[] = [
    {
      title: 'Playground',
      description:
        'A playground for me to experiment with Python, it has an application featuring a custom question-generation engine and JSON data persistence layer designed to drill advanced bitwise logic operations, as well as applications featuring the visualization of connections between the objects.',
      tags: ['Python', 'Tools', 'JSON'],
      status: 'completed',
    },
    {
      title: 'AetherScope',
      description:
        'A website featuring some cool fractals using WebGL using Typescript.',
      tags: ['Typescript', 'Fractal', 'Website'],
      status: 'completed',
    },
    {
      title: 'Nebulance',
      description:
        'A 3D space game with cool gameplay, using Three.js and React, go check it out in the link below!',
      tags: ['TypeScript', 'Game', '3D'],
      link: 'https://nebulance.alexanderluo.com',
      status: 'active',
    },
  ];

  const values = [
    {
      title: 'Build to learn',
      description:
        'I learn best by making things — games, tools, and experiments on my Fedora Linux machine.',
    },
    {
      title: 'Curiosity first',
      description:
        'From fractals in WebGL to bitwise logic drills, I follow questions until they become projects.',
    },
    {
      title: 'Share what works',
      description:
        'Projects like Nebulance and AetherScope are meant to be played, explored, and improved in the open.',
    },
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
