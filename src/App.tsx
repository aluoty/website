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
      title: "Playground",
      description: "A playground for me to experiment with Python, it has an application featuring a custom question-generation engine and JSON data persistence layer designed to drill advanced bitwise logic operations, as well as applications featuring the visualization of connections between the objects.",
      tags: ["Python", "Tools", "JSON"],
      status: "completed"
    },
    {
      title: "AetherScope",
      description: "A website featuring some cool fractals using WebGL using Typescript.",
      tags: ["Typescript", "Fractal", "Website"],
      status: "completed"
    },
    {
      title: "Nebulance",
      description: "A 3D space game with cool gameplay, using Three.js and React, go check it out in the link below!",
      tags: ["TypeScript", "Game", "3D"],
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
        <div className="nav-logo">Alexander Luo</div>
        <div className="nav-links">
          <a href="#projects">Projects</a>
          <a href="https://github.com/alexanderluo666" target="_blank" rel="noreferrer">My Github Account</a>
          <a href="https://nebulance.alexanderluo.com" className="nav-accent">Play Nebulance</a>
        </div>
      </nav>

      {/* Main Container Hero */}
      <main className="hero-section">
        <div className="terminal-badge">Hi! It's me Alexander Luo.</div>
        <h1 className="hero-title">Computer Science & Applied Programming</h1>
        <p className="hero-subtitle">
          I'm a primary school student designing games and tools on my Fedora Linux machine.
        </p>
        <div className="cta-group">
          <button onClick={handleCopyEmail} className="btn-primary">
            {copied ? "Copied To ClipBoard!" : "Contact me via Gmail"}
          </button>
        </div>
      </main>

      {/* Projects Component Layout */}
      <section id="projects" className="projects-section">
        <h2 className="section-title">Major Projects</h2>
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
                  Launch &raquo;
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
