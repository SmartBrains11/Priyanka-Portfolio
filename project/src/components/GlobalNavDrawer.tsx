import React, { useEffect, useState } from 'react';
import { 
  Menu, 
  X, 
  Laptop, 
  User, 
  BookOpen, 
  Compass, 
  Palette, 
  Sun, 
  Mail, 
  Home,
  ArrowUpRight
} from 'lucide-react';
import './GlobalNavDrawer.css';

export type GlobalNavDrawerProps = {
  onNavigate: (path: string) => void;
  currentPageTitle?: string;
};

export default function GlobalNavDrawer({ onNavigate, currentPageTitle }: GlobalNavDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = window.location.pathname;

  // Prevent background scrolling while the drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = (path: string) => {
    setIsOpen(false);
    onNavigate(path);
  };

  const navItems = [
    { label: 'Home', path: '/', subtitle: '3D Room Experience', icon: <Home size={19} /> },
    { label: 'Projects', path: '/projects', subtitle: 'Selected Works & Case Studies', icon: <Laptop size={19} /> },
    { label: 'About Me', path: '/?view=mirror', subtitle: 'Who I am & My story', icon: <User size={19} /> },
    { label: 'Experience', path: '/experience', subtitle: 'Career timeline & impact', icon: <BookOpen size={19} /> },
    { label: 'Process', path: '/understand-how-i-think', subtitle: 'How I observe & design', icon: <Compass size={19} /> },
    { label: 'My Art', path: '/art', subtitle: 'Visual exploration & canvas', icon: <Palette size={19} /> },
    { label: 'What Inspires Me', path: '/inspiration', subtitle: 'Observations & moodboards', icon: <Sun size={19} /> },
    { label: 'Contact', path: '/contact', subtitle: "Let's connect & collaborate", icon: <Mail size={19} /> },
  ];

  return (
    <>
      {/* Compact Global Navigation Bar / Trigger */}
      <header className="global-header-bar" role="banner">
        <div className="global-header-inner">
          <button 
            type="button" 
            className="global-logo-btn" 
            onClick={() => handleLinkClick('/')}
            aria-label="Lakkoju Priyanka - Return to Home"
          >
            <span className="global-logo-text">Priyanka.</span>
            {currentPageTitle && (
              <span className="global-page-badge" aria-hidden="true">
                / {currentPageTitle}
              </span>
            )}
          </button>

          <button 
            type="button" 
            className="global-hamburger-btn" 
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="global-nav-drawer"
          >
            <span className="global-hamburger-label">Menu</span>
            <span className="global-hamburger-icon">
              <Menu size={20} />
            </span>
          </button>
        </div>
      </header>

      {/* Drawer Overlay & Content */}
      <div 
        id="global-nav-drawer"
        className={`global-drawer-overlay ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
      >
        <div 
          className="global-drawer-scrim" 
          onClick={() => setIsOpen(false)} 
          aria-hidden="true" 
        />
        
        <aside className="global-drawer-panel">
          <div className="global-drawer-header">
            <div className="global-drawer-brand">
              <span className="drawer-brand-name">Priyanka.</span>
              <span className="drawer-brand-role">Product Designer & Artist</span>
            </div>
            <button 
              type="button" 
              className="global-drawer-close" 
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="global-drawer-nav" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = item.path === '/' 
                ? currentPath === '/' && !window.location.search.includes('view=mirror')
                : item.path === '/?view=mirror'
                ? currentPath === '/' && window.location.search.includes('view=mirror')
                : currentPath === item.path;

              return (
                <button
                  key={item.label}
                  type="button"
                  className={`global-drawer-link ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleLinkClick(item.path)}
                >
                  <span className="drawer-link-icon">{item.icon}</span>
                  <div className="drawer-link-text">
                    <span className="drawer-link-title">{item.label}</span>
                    <span className="drawer-link-subtitle">{item.subtitle}</span>
                  </div>
                  <ArrowUpRight size={16} className="drawer-link-arrow" aria-hidden="true" />
                </button>
              );
            })}
          </nav>

          <div className="global-drawer-footer">
            <div className="drawer-status">
              <span className="drawer-status-dot" aria-hidden="true" />
              <span>Available for high-impact product opportunities</span>
            </div>
            <button 
              type="button" 
              className="drawer-contact-action"
              onClick={() => handleLinkClick('/contact')}
            >
              <span>Get in touch</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
