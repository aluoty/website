import { useCallback, useState } from 'react';
import { OrbitMenu } from './OrbitMenu';
import { Starfield } from './Starfield';
import './App.css';

type SectionId = 'contact' | 'projects' | 'articles' | 'values';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  status: 'active' | 'completed' | 'in-progress';
}

function App() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [copied, setCopied] = useState(false);

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

  const articles = [
    {
      title: 'Nebulance — a 3D space game',
      description:
        'Built with Three.js and React. Fly through space, explore gameplay systems, and see what a student-built game can feel like.',
      link: 'https://nebulance.alexanderluo.com',
    },
    {
      title: 'AetherScope — fractal explorations',
      description:
        'WebGL fractals rendered in the browser — a visual playground for math and graphics.',
      link: undefined,
    },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('alexanderluo0910@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNavigate = useCallback((sectionId: SectionId) => {
    setActiveSection(sectionId);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
    setActiveSection(null);
  }, []);

  return (
    <>
      <Starfield />
      <div className="nebula nebula--one" aria-hidden="true" />
      <div className="nebula nebula--two" aria-hidden="true" />

      <OrbitMenu open={menuOpen} onNavigate={handleNavigate} />

      <div
        className={`page${menuOpen ? ' page--menu-open' : ''}${activeSection ? ' page--has-section' : ''}`}
        id="page-root"
      >
        <nav className={`navbar${menuOpen ? ' navbar--hidden' : ''}`}>
          <button
            type="button"
            className="nav-logo"
            onClick={openMenu}
          >
            Alexander Luo
          </button>
          <div className="nav-links">
            <button
              type="button"
              className={activeSection === 'projects' ? 'nav-active' : ''}
              onClick={() => handleNavigate('projects')}
            >
              Projects
            </button>
            <button
              type="button"
              className={activeSection === 'contact' ? 'nav-active' : ''}
              onClick={() => handleNavigate('contact')}
            >
              Contact
            </button>
            <button
              type="button"
              className={activeSection === 'articles' ? 'nav-active' : ''}
              onClick={() => handleNavigate('articles')}
            >
              Articles
            </button>
            <button
              type="button"
              className={activeSection === 'values' ? 'nav-active' : ''}
              onClick={() => handleNavigate('values')}
            >
              Values
            </button>
            <a
              href="https://github.com/alexanderluo666"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </nav>

        <main className="content-view">
          {activeSection === 'contact' && (
          <section id="contact" className="hero-section content-section">
            <div className="section-label">Contact</div>
            <div className="terminal-badge">Hi! It&apos;s me Alexander Luo.</div>
            <h1 className="hero-title">Computer Science &amp; Applied Programming</h1>
            <p className="hero-subtitle">
              I&apos;m a primary school student designing games and tools on my Fedora
              Linux machine.
            </p>
            <div className="cta-group">
              <button onClick={handleCopyEmail} className="btn-primary">
                {copied ? 'Copied To ClipBoard!' : 'Contact me via Gmail'}
              </button>
              <a
                href="https://nebulance.alexanderluo.com"
                className="btn-secondary"
                target="_blank"
                rel="noreferrer"
              >
                Play Nebulance
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
            <h2 className="section-title">Articles &amp; Highlights</h2>
            <div className="articles-grid">
              {articles.map((article, idx) => (
                <article key={idx} className="article-card">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  {article.link ? (
                    <a
                      href={article.link}
                      className="card-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Read more &raquo;
                    </a>
                  ) : (
                    <span className="article-soon">More writing coming soon</span>
                  )}
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

export default App;
