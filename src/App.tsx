import { useState } from 'react';
import './App.css';

// Type definitions for our portfolio projects
interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  status: 'active' | 'completed' | 'in-progress';
}

function App() {
  const [copied, setCopied] = useState(false);

  const projects: Project[] = [
    {
      title: "Bitwise Trainer",
      description: "A Python application featuring a custom question-generation engine and JSON data persistence layer designed to drill advanced bitwise logic operations.",
      tags: ["Python", "Logic Gates", "JSON"],
      status: "completed"
    },
    {
      title: "Path Finder (v5.8.4)",
      description: "Network analysis and visualizer tool calculating degrees of separation. Implements advanced logic mapping rendered via 2D and 3D data frames.",
      tags: ["Python", "NetworkX", "Plotly"],
      status: "completed"
    },
    {
      title: "Nebulance Engine",
      description: "A 2D space canvas physics engine running on its own decoupled subdomain layer.",
      tags: ["TypeScript", "Canvas", "HTML5"],
      link: "https://nebulance.alexanderluo.com",
      status: "active"
    }
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('alexanderluo0910@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      {/* Top System Navigation Bar */}
      <nav className="navbar">
        <div className="nav-logo">ALEXANDER_LUO // SYSTEM</div>
        <div className="nav-links">
          <a href="#projects">.projects()</a>
          <a href="https://github.com/alexanderluo0910/FishingGame" target="_blank" rel="noreferrer">.github()</a>
          <a href="https://nebulance.alexanderluo.com" className="nav-accent">.launch_game()</a>
        </div>
      </nav>

      {/* Main Container Hero */}
      <main className="hero-section">
        <div className="terminal-badge">SYS_STATUS: ACTIVE</div>
        <h1 className="hero-title">Computer Science & Competitive Programming</h1>
        <p className="hero-subtitle">
          Building high-performance utilities, exploring discrete logic configurations, and optimizing code complexities. Running on an Arch Linux ecosystem.
        </p>
        <div className="cta-group">
          <button onClick={handleCopyEmail} className="btn-primary">
            {copied ? "» COPIED_TO_CLIPBOARD" : "» COPY_CONTACT_EMAIL"}
          </button>
        </div>
      </main>

      {/* Projects Component Layout */}
      <section id="projects" className="projects-section">
        <h2 className="section-title">&gt; active_modules</h2>
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div key={idx} className="project-card">
              <div className="card-header">
                <span className={`status-indicator ${project.status}`}></span>
                <span className="status-text">{project.status.toUpperCase()}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-row">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tag">{tag}</span>
                ))}
              </div>
              {project.link && (
                <a href={project.link} className="card-link" target="_blank" rel="noreferrer">
                  Execute Resource &raquo;
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Environment Footer */}
      <footer className="footer">
        <p>Built with React + Vite + TypeScript // Hosted via Cloudflare Edge Network</p>
      </footer>
    </div>
  );
}

export default App;
