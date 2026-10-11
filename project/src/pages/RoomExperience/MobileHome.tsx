import React, { useState } from 'react';
import { Menu, User, Laptop, Palette, BookOpen, Sun, Mail, Bookmark, X, Compass } from 'lucide-react';
import './MobileHome.css';

type MobileHomeProps = {
  onNavigate: (path: string) => void;
  onAboutClick: () => void;
};

export default function MobileHome({ onNavigate, onAboutClick }: MobileHomeProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  React.useEffect(() => {
    if (menuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [menuOpen]);

  return (
    <div className="mobile-home-container">
      {menuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-header">
            <div className="logo">Priyanka.</div>
            <button className="menu-close-button" onClick={() => setMenuOpen(false)}>
              <X size={24} color="#171b2b" />
            </button>
          </div>
          <nav className="mobile-menu-nav">
            <button onClick={() => { setMenuOpen(false); onNavigate('/projects'); }}>My work</button>
            <button onClick={() => { setMenuOpen(false); onAboutClick(); }}>About me</button>
            <button onClick={() => { setMenuOpen(false); onNavigate('/understand-how-i-think'); }}>Process</button>
            <button onClick={() => { setMenuOpen(false); onNavigate('/art'); }}>Art</button>
            <button onClick={() => { setMenuOpen(false); onNavigate('/experience'); }}>Experience</button>
            <button onClick={() => { setMenuOpen(false); onNavigate('/inspiration'); }}>Inspiration</button>
            <button onClick={() => { setMenuOpen(false); onNavigate('/contact'); }}>Contact</button>
          </nav>
        </div>
      )}

      <header className="mobile-header">
        <div className="logo">Priyanka.</div>
        <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu size={24} color="#171b2b" />
        </button>
      </header>

      <main className="mobile-content">
        <section className="intro-section">
          <h1>A designer&apos;s room says a lot about how she thinks.</h1>
          <p>Product designer by profession, artist at heart.</p>
        </section>

        <section className="room-image-section">
          <div className="room-image-container">
            <img 
              src="/images/updated room.png" 
              alt="Priyanka's Room" 
              className="static-room-image" 
              loading="eager"
              // @ts-expect-error fetchpriority attribute
              fetchpriority="high"
              decoding="async"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/v2.png'; // Fallback
                target.onerror = null;
              }}
            />
            <button className="bookmark-button" aria-label="About Me" onClick={onAboutClick}>
              <Bookmark size={20} fill="white" color="white" />
            </button>
          </div>
          <div className="interaction-hint">TAP AN OBJECT TO EXPLORE</div>
        </section>

        <section className="navigation-cards">
          <button className="nav-card" onClick={() => onNavigate('/projects')}>
            <Laptop size={20} className="card-icon" />
            <span>My work</span>
          </button>
          <button className="nav-card" onClick={onAboutClick}>
            <User size={20} className="card-icon" />
            <span>About me</span>
          </button>
          <button className="nav-card" onClick={() => onNavigate('/experience')}>
            <BookOpen size={20} className="card-icon" />
            <span>Experience</span>
          </button>
          <button className="nav-card" onClick={() => onNavigate('/understand-how-i-think')}>
            <Compass size={20} className="card-icon" />
            <span>Process</span>
          </button>
          <button className="nav-card" onClick={() => onNavigate('/art')}>
            <Palette size={20} className="card-icon" />
            <span>My art</span>
          </button>
          <button className="nav-card" onClick={() => onNavigate('/inspiration')}>
            <Sun size={20} className="card-icon" />
            <span>Inspiration</span>
          </button>
          <button className="nav-card contact-card" onClick={() => onNavigate('/contact')}>
            <Mail size={20} className="card-icon" />
            <span>Contact</span>
          </button>
        </section>

        <div className="footer-hint">
          Or explore using the menu &uarr;
        </div>
      </main>
    </div>
  );
}
