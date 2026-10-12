import React, { useState, useEffect } from 'react';
import { Map as MapIcon, Pause, Play, RotateCcw } from 'lucide-react';
import { 
  getStoredIntent, 
  setStoredIntent, 
  getStoredHotspot, 
  setStoredHotspot, 
  getRecommendation,
  type VisitorIntent,
  type HotspotId 
} from '@/data/navigationJourneys';

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

const roles = ['Product Designer', 'Illustrator', 'UI/UX Designer'];

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
  const [currentIntent, setCurrentIntent] = useState<VisitorIntent | null>(getStoredIntent());

  // Determine current hotspot within 3D room context
  const activeHotspotId: HotspotId | null = 
    viewState === 'mirror' ? 'mirror' : 
    viewState === 'board' ? 'board' : 
    getStoredHotspot();

  const recommendation = getRecommendation(currentIntent, activeHotspotId);

  const handleSelectIntent = (intent: VisitorIntent) => {
    setCurrentIntent(intent);
    setStoredIntent(intent);
    if (intent === 'hiring') {
      setStoredHotspot('mirror');
      if (onAction) onAction('mirror');
    } else if (intent === 'designer') {
      setStoredHotspot('board');
      if (onNavigate) onNavigate('/understand-how-i-think');
    } else if (intent === 'curious') {
      setStoredHotspot('easel');
      if (onNavigate) onNavigate('/art');
    }
  };

  const handleNavigateToHotspot = (hotspotId: HotspotId, path: string, targetViewState?: 'mirror' | 'board' | 'default') => {
    setStoredHotspot(hotspotId);
    setMapHovered(false);
    if (targetViewState) {
      if (targetViewState === 'mirror' && onKnowMeClick) onKnowMeClick();
      if (targetViewState === 'board' && onUnderstandClick) onUnderstandClick();
      if (onAction) onAction(targetViewState);
    } else if (onNavigate) {
      onNavigate(path);
    }
  };

  // Cycle through titles one by one with smooth animation
  const [roleIndex, setRoleIndex] = useState(0);
  const [isRoleFading, setIsRoleFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsRoleFading(true);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setIsRoleFading(false);
      }, 350);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  const isDefaultView = viewState === 'default';

  return (
    <div className={`hero-editorial-wrapper ${!isDefaultView ? 'is-fullscreen-view' : ''}`}>
      {/* Background Soft Glow Shadows */}
      <div className="hero-bg-accent" />

      {/* Top Header Row - Hidden in Full View */}
      {isDefaultView && (
        <header className="hero-top-row">
          <div className="hero-brand-left">
            <div className="brand-role-animated-container" aria-live="polite">
              <span className={`brand-role-animated-text ${isRoleFading ? 'role-fade-out' : 'role-fade-in'}`}>
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

                {/* Recommended Next guidance (if intent is selected) */}
                {recommendation && (
                  <div className="hero-recommended-next-card">
                    <div className="hero-recommended-label">
                      <span>RECOMMENDED NEXT</span>
                      {recommendation.intent && (
                        <span className="hero-recommended-intent-tag">
                          {recommendation.intent === 'hiring' ? 'Hiring' : recommendation.intent === 'designer' ? 'Designer' : 'Curious'}
                        </span>
                      )}
                    </div>
                    {recommendation.type === 'recommendation' ? (
                      <button 
                        type="button"
                        onClick={() => handleNavigateToHotspot(recommendation.hotspot.id, recommendation.hotspot.path, recommendation.hotspot.viewState)}
                        className="hero-recommended-button"
                      >
                        <span className="hero-recommended-text">
                          <span className="hero-rec-emoji">{recommendation.hotspot.emoji}</span>
                          <span className="hero-rec-action">{recommendation.hotspot.actionText}</span>
                        </span>
                        <span className="hero-rec-arrow">→</span>
                      </button>
                    ) : (
                      <div className="hero-recommended-complete">
                        ✓ You&apos;ve explored this journey.
                      </div>
                    )}
                  </div>
                )}

                <div className="hero-dropdown-list">
                  <button onClick={() => handleNavigateToHotspot('mirror', '/?view=mirror', 'mirror')} className="map-legend-item">
                    <span className="map-item-left">
                      <span className="map-emoji">🪞</span>
                      <span className="map-title">Mirror</span>
                    </span>
                    <span className="map-sub">About me</span>
                  </button>
                  <button onClick={() => handleNavigateToHotspot('laptop', '/projects')} className="map-legend-item">
                    <span className="map-item-left">
                      <span className="map-emoji">💻</span>
                      <span className="map-title">Laptop</span>
                    </span>
                    <span className="map-sub">My work</span>
                  </button>
                  <button onClick={() => handleNavigateToHotspot('board', '/understand-how-i-think', 'board')} className="map-legend-item">
                    <span className="map-item-left">
                      <span className="map-emoji">📌</span>
                      <span className="map-title">Pinboard</span>
                    </span>
                    <span className="map-sub">How I think</span>
                  </button>
                  <button onClick={() => handleNavigateToHotspot('easel', '/art')} className="map-legend-item">
                    <span className="map-item-left">
                      <span className="map-emoji">🎨</span>
                      <span className="map-title">Easel</span>
                    </span>
                    <span className="map-sub">My art</span>
                  </button>
                  <button onClick={() => handleNavigateToHotspot('bookshelf', '/experience')} className="map-legend-item">
                    <span className="map-item-left">
                      <span className="map-emoji">📚</span>
                      <span className="map-title">Bookshelf</span>
                    </span>
                    <span className="map-sub">Experience</span>
                  </button>
                  <button onClick={() => handleNavigateToHotspot('window', '/inspiration')} className="map-legend-item">
                    <span className="map-item-left">
                      <span className="map-emoji">🪟</span>
                      <span className="map-title">Window</span>
                    </span>
                    <span className="map-sub">What inspires me</span>
                  </button>
                  <button onClick={() => handleNavigateToHotspot('drawer', '/contact')} className="map-legend-item">
                    <span className="map-item-left">
                      <span className="map-emoji">🗄️</span>
                      <span className="map-title">Drawer</span>
                    </span>
                    <span className="map-sub">Work with me</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Room Viewport with Distinctive Concave Curve */}
      <section className="hero-room-container">
        {/* SVG clip-path definition for smooth organic curve */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <clipPath id="heroCurvedRoomClip" clipPathUnits="objectBoundingBox">
              <path d="M 0,0.02 Q 0.5,0.05 1,0.02 L 1,0.98 Q 0.5,0.95 0,0.98 Z" />
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

      {/* Primary Navigation Dock - Hidden in Full View */}
      {isDefaultView && (
        <nav 
          className="hero-intent-nav" 
          aria-label="Main portfolio navigation"
          onMouseEnter={() => onUiHoverChange(true)}
          onMouseLeave={() => onUiHoverChange(false)}
        >
          <button 
            className="hero-intent-pill"
            type="button"
            onClick={() => handleSelectIntent('hiring')}
          >
            <span className="pill-heading">I&apos;M HIRING</span>
          </button>

          <button 
            className="hero-intent-pill"
            type="button"
            onClick={() => handleSelectIntent('designer')}
          >
            <span className="pill-heading">DESIGNER</span>
          </button>

          <button 
            className="hero-intent-pill"
            type="button"
            onClick={() => handleSelectIntent('curious')}
          >
            <span className="pill-heading">CURIOUS</span>
          </button>
        </nav>
      )}
    </div>
  );
}
