import type { SectionId } from './types/sections';

interface OrbitMenuProps {
  open: boolean;
  onNavigate: (sectionId: SectionId) => void;
}

const MENU_ITEMS = [
  { label: 'Projects', sectionId: 'projects' },
  { label: 'Contact', sectionId: 'contact' },
  { label: 'Articles', sectionId: 'articles' },
  { label: 'Values', sectionId: 'values' },
] as const;

export function OrbitMenu({ open, onNavigate }: OrbitMenuProps) {
  return (
    <div
      className={`orbit-menu${open ? ' orbit-menu--open' : ''}`}
      aria-hidden={!open}
    >
      <div className="orbit-menu__backdrop" />
      <div className="orbit-menu__core">
        <div className="orbit-menu__ring orbit-menu__ring--outer" />
        <div className="orbit-menu__ring orbit-menu__ring--inner" />

        <div className="orbit-menu__center">
          <span className="orbit-menu__name">Alexander Luo</span>
          <span className="orbit-menu__tagline">Explore the cosmos</span>
        </div>

        <div className="orbit-menu__orbit">
          {MENU_ITEMS.map((item, index) => (
            <button
              key={item.sectionId}
              type="button"
              className="orbit-menu__item"
              style={{ '--orbit-index': index } as React.CSSProperties}
              onClick={() => onNavigate(item.sectionId)}
              tabIndex={open ? 0 : -1}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
