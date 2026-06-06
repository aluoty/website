import type { SectionId } from '../types/sections';

interface NavbarProps {
  hidden?: boolean;
  activeSection: SectionId | null;
  onOpenMenu: () => void;
  onNavigate: (sectionId: SectionId) => void;
}

export function Navbar({
  hidden = false,
  activeSection,
  onOpenMenu,
  onNavigate,
}: NavbarProps) {
  return (
    <nav className={`navbar${hidden ? ' navbar--hidden' : ''}`}>
      <div className="navbar__inner">
        <button type="button" className="nav-logo" onClick={onOpenMenu}>
          <span className="nav-logo__mark" aria-hidden="true">
            ✦
          </span>
          Alexander Luo
        </button>

        <div className="nav-links">
          <div className="nav-links__group" role="tablist" aria-label="Sections">
            <button
              type="button"
              role="tab"
              aria-selected={activeSection === 'projects'}
              className={activeSection === 'projects' ? 'nav-active' : ''}
              onClick={() => onNavigate('projects')}
            >
              Projects
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeSection === 'contact'}
              className={activeSection === 'contact' ? 'nav-active' : ''}
              onClick={() => onNavigate('contact')}
            >
              Contact
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeSection === 'articles'}
              className={activeSection === 'articles' ? 'nav-active' : ''}
              onClick={() => onNavigate('articles')}
            >
              Articles
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeSection === 'values'}
              className={activeSection === 'values' ? 'nav-active' : ''}
              onClick={() => onNavigate('values')}
            >
              Values
            </button>
          </div>
          <a
            className="nav-github"
            href="https://github.com/aluoty"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
