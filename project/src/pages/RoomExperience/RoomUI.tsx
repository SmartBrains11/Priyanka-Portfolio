import React, { useEffect, useState } from 'react';
import { Map as MapIcon, ArrowRight, Pause, Play, RotateCcw, Briefcase, Laptop, Compass } from 'lucide-react';

type RoomUIProps = {
  onUiHoverChange: (hovered: boolean) => void;
  onAction?: (action: 'mirror' | 'default' | 'board') => void;
  viewState?: 'default' | 'mirror' | 'board';
  audioCompleted?: boolean;
  onExploreClick?: () => void;
  onUnderstandClick?: () => void;
  onKnowMeClick?: () => void;
  onNavigate?: (path: string) => void;
  renderRoomCanvas?: () => React.ReactNode;
};

const roles = ['Product Designer', 'Visual Designer', 'Illustration'];

export default function RoomUI({ 
  onUiHoverChange, 
  onAction, 
  viewState, 
  onExploreClick, 
  onUnderstandClick, 
  onKnowMeClick, 
  onNavigate, 
  renderRoomCanvas 
}: RoomUIProps) {
  const [mapHovered, setMapHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Cycle through titles one by one near Priyanka name
  const [roleIndex, setRoleIndex] = useState(0);
  const [isRoleFading, setIsRoleFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsRoleFading(true);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setIsRoleFading(false);
      }, 300);
    }, 2600);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-editorial-wrapper">
      {/* Background Soft Glow Shadows */}
      <div className="hero-bg-accent" />

      {/* Top Header Row */}
      <header className="hero-top-row">
        <div className="hero-brand-left">
          <div className="brand-name-group">
            <span className="brand-author-tag">PRIYANKA LAKKOJU</span>
            <span className="brand-author-dash">—</span>
          </div>
          <div className="brand-roles-cycler" aria-live="polite">
            <span className={`brand-role-item ${isRoleFading ? 'role-fade-out' : 'role-fade-in'}`}>
              {roles[roleIndex]}
            </span>
          </div>
        </div>

        <div className="hero-brand-center">
          <h1 className="hero-main-title">Priyanka.</h1>
          <p className="hero-tagline-quote">A designer&apos;s room says a lot about how she thinks.</p>
        </div>

        <div className="hero-nav-right">
          <div className="map-legend-container" style={{ position: 'relative' }}>
            <button 
              className="map-legend-trigger hero-map-button"
              aria-label="Interactive Map"
              onClick={() => { setMapHovered(!mapHovered); onUiHoverChange(!mapHovered); }}
            >
              <MapIcon size={20} color="#171b2b" strokeWidth={1.8} />
            </button>
            
            {/* Map Menu Dropdown */}
            <div 
              className="hero-map-dropdown"
              style={{ 
                opacity: mapHovered ? 1 : 0, 
                transform: mapHovered ? 'translateY(0)' : 'translateY(-10px)',
                pointerEvents: mapHovered ? 'auto' : 'none',
              }}
            >
              <div className="hero-dropdown-heading">Explore Room</div>
              <div className="hero-dropdown-list">
                <button onClick={() => { setMapHovered(false); if (onKnowMeClick) onKnowMeClick(); if (onAction) onAction('mirror'); }} className="map-legend-item">
                  <span>🪞 Mirror</span><span className="map-sub">About me</span>
                </button>
                <button onClick={() => { setMapHovered(false); if (onExploreClick) onExploreClick(); if (onNavigate) onNavigate('/projects'); }} className="map-legend-item">
                  <span>💻 Laptop</span><span className="map-sub">My work</span>
                </button>
                <button onClick={() => { setMapHovered(false); if (onUnderstandClick) onUnderstandClick(); if (onAction) onAction('board'); }} className="map-legend-item">
                  <span>📌 Pinboard</span><span className="map-sub">How I think</span>
                </button>
                <button onClick={() => { setMapHovered(false); if (onNavigate) onNavigate('/art'); }} className="map-legend-item">
                  <span>🎨 Easel</span><span className="map-sub">My art</span>
                </button>
                <button onClick={() => { setMapHovered(false); if (onNavigate) onNavigate('/experience'); }} className="map-legend-item">
                  <span>📚 Bookshelf</span><span className="map-sub">Experience</span>
                </button>
                <button onClick={() => { setMapHovered(false); if (onNavigate) onNavigate('/inspiration'); }} className="map-legend-item">
                  <span>🪟 Window</span><span className="map-sub">What inspires me</span>
                </button>
                <button onClick={() => { setMapHovered(false); if (onNavigate) onNavigate('/contact'); }} className="map-legend-item">
                  <span>🗄️ Drawer</span><span className="map-sub">Work with me</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Room Viewport with Distinctive Concave Curve */}
      <section className="hero-room-container">
        {/* SVG clip-path definition for smooth organic curve */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <clipPath id="heroCurvedRoomClip" clipPathUnits="objectBoundingBox">
              <path d="M 0,0.015 Q 0.5,0.07 1,0.015 L 1,0.97 Q 0.5,0.99 0,0.97 Z" />
            </clipPath>
          </defs>
        </svg>

        <div className="hero-room-outer-frame">
          <div className="hero-room-inner-frame">
            {/* The 3D Canvas or 360 Room View */}
            {renderRoomCanvas && renderRoomCanvas()}

            {/* In-Room Controls & Subtle Accents */}
            <div className="in-room-overlay pointer-events-none">
              {/* Bottom-left Pause/Play and Reset buttons */}
              <div className="room-control-pill pointer-events-auto">
                <button 
                  className="room-icon-btn" 
                  aria-label={isPaused ? "Play animation" : "Pause animation"}
                  onClick={() => setIsPaused(!isPaused)}
                  title={isPaused ? "Play" : "Pause"}
                >
                  {isPaused ? <Play size={13} fill="currentColor" /> : <Pause size={13} fill="currentColor" />}
                </button>
                {viewState !== 'default' && (
                  <button 
                    className="room-icon-btn ml-1" 
                    aria-label="Reset view"
                    onClick={() => onAction && onAction('default')}
                    title="Reset view"
                  >
                    <RotateCcw size={13} />
                  </button>
                )}
              </div>

              {/* Bottom-right Drag to Explore hint */}
              <div className="room-explore-hint">
                <span className="hint-label">DRAG TO EXPLORE</span>
                <span className="hint-line" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Navigation Dock */}
      <nav 
        className="hero-intent-nav" 
        aria-label="Main portfolio navigation"
        onMouseEnter={() => onUiHoverChange(true)}
        onMouseLeave={() => onUiHoverChange(false)}
      >
        <button 
          className="hero-intent-pill"
          type="button"
          onClick={() => onAction && onAction('mirror')}
        >
          <div className="pill-icon-box">
            <Briefcase size={18} strokeWidth={2} />
          </div>
          <span className="pill-heading">I&apos;M HIRING</span>
          <div className="pill-arrow-circle">
            <ArrowRight size={15} className="pill-arrow" />
          </div>
        </button>

        <button 
          className="hero-intent-pill"
          type="button"
          onClick={() => { if (onNavigate) onNavigate('/projects'); }}
        >
          <div className="pill-icon-box">
            <Laptop size={18} strokeWidth={2} />
          </div>
          <span className="pill-heading">DESIGNER</span>
          <div className="pill-arrow-circle">
            <ArrowRight size={15} className="pill-arrow" />
          </div>
        </button>

        <button 
          className="hero-intent-pill"
          type="button"
          onClick={() => onAction && onAction('board')}
        >
          <div className="pill-icon-box">
            <Compass size={18} strokeWidth={2} />
          </div>
          <span className="pill-heading">CURIOUS</span>
          <div className="pill-arrow-circle">
            <ArrowRight size={15} className="pill-arrow" />
          </div>
        </button>
      </nav>
    </div>
  );
}
