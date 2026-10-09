import React, { useEffect, useState } from 'react';
import { User, Laptop, Lightbulb, Map as MapIcon } from 'lucide-react';

type RoomUIProps = {
  onUiHoverChange: (hovered: boolean) => void;
  onAction?: (action: 'mirror' | 'default' | 'board') => void;
  viewState?: 'default' | 'mirror' | 'board';
  audioCompleted?: boolean;
  onExploreClick?: () => void;
  onUnderstandClick?: () => void;
  onKnowMeClick?: () => void;
  onNavigate?: (path: string) => void;
};

let hasPlayedIntro = false;

const INTRO_TOKENS = [
  { text: "A ", style: { fontWeight: 300 } },
  { text: "designer’s room", style: { fontWeight: 500 } },
  { text: " says a lot about how she ", style: { fontWeight: 300 } },
  { text: "thinks.", style: { fontWeight: 500, fontStyle: 'italic' as const } },
  { text: "\\n", style: {} },
  { text: "I’m Priyanka", style: { fontWeight: 600 } },
  { text: " — come in, ", style: { fontWeight: 300 } },
  { text: "explore.", style: { fontWeight: 400, fontStyle: 'italic' as const } },
];
const TOTAL_CHARS = INTRO_TOKENS.reduce((sum, t) => sum + t.text.length, 0);

export default function RoomUI({ onUiHoverChange, onAction, viewState, audioCompleted, onExploreClick, onUnderstandClick, onKnowMeClick, onNavigate }: RoomUIProps) {
  const [phase, setPhase] = useState<'white' | 'welcome' | 'room' | 'options'>(hasPlayedIntro ? 'options' : 'white');
  const [showTitle, setShowTitle] = useState(!hasPlayedIntro);
  const [typedCount, setTypedCount] = useState(hasPlayedIntro ? TOTAL_CHARS : 0);
  const [mapHovered, setMapHovered] = useState(false);

  useEffect(() => {
    if (hasPlayedIntro) return;

    // Sequence timing
    // Phase 1: White screen holds for a moment, then "Welcome" appears while white screen fades out
    const t1 = setTimeout(() => setPhase('welcome'), 500);

    // Phase 2: "Welcome" holds, room is fully visible
    const t2 = setTimeout(() => setPhase('room'), 2500);

    // Phase 3: Options appear after welcome fades
    const t3 = setTimeout(() => {
      setPhase('options');
      hasPlayedIntro = true;
    }, 3500);

    // Phase 4: Hide the top title text after 20 seconds
    const t4 = setTimeout(() => setShowTitle(false), 20000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  useEffect(() => {
    // Only hide on interaction if the text has finished typing
    if (typedCount < TOTAL_CHARS) return;

    const hideTitleOnInteract = () => {
      setShowTitle(false);
    };
    window.addEventListener('wheel', hideTitleOnInteract, { once: true });
    window.addEventListener('touchstart', hideTitleOnInteract, { once: true });
    window.addEventListener('mousedown', hideTitleOnInteract, { once: true });

    return () => {
      window.removeEventListener('wheel', hideTitleOnInteract);
      window.removeEventListener('touchstart', hideTitleOnInteract);
      window.removeEventListener('mousedown', hideTitleOnInteract);
    };
  }, [typedCount]);

  useEffect(() => {
    if (phase === 'options') {
      // If already typed, don't re-type
      if (hasPlayedIntro && typedCount === TOTAL_CHARS) return;

      const interval = setInterval(() => {
        setTypedCount((prev) => {
          if (prev >= TOTAL_CHARS) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const renderTypedText = () => {
    let charsLeft = typedCount;
    return INTRO_TOKENS.map((token, i) => {
      if (charsLeft <= 0) return null;
      
      let textToRender = "";
      if (charsLeft >= token.text.length) {
        textToRender = token.text;
        charsLeft -= token.text.length;
      } else {
        textToRender = token.text.slice(0, charsLeft);
        charsLeft = 0;
      }
      
      if (textToRender === "\\n") {
        return <br key={i} />;
      }
      
      return <span key={i} style={token.style}>{textToRender}</span>;
    });
  };

  return (
    <div className="room-ui-layer pointer-events-none">

      {/* Map Hotspot Legend */}
      <div 
        className="map-legend-container" 
        style={{ position: 'absolute', top: '32px', right: '32px', pointerEvents: 'auto', zIndex: 100 }}
      >
        <button 
          style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '1px solid #e8ebf1', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}
          aria-label="Interactive Map"
          className="map-legend-trigger"
          onClick={() => { setMapHovered(!mapHovered); onUiHoverChange(!mapHovered); }}
        >
          <MapIcon size={20} color="#171b2b" />
        </button>
        
        {/* Dropdown / Hover Menu */}
        <div 
          style={{ 
            position: 'absolute', top: '100%', right: '0', marginTop: '12px', background: '#fff', 
            borderRadius: '16px', border: '1px solid #e8ebf1', padding: '12px', width: '220px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.1)', opacity: mapHovered ? 1 : 0, 
            transform: mapHovered ? 'translateY(0)' : 'translateY(-10px)',
            pointerEvents: mapHovered ? 'auto' : 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 40 
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#8791a4', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', padding: '0 8px' }}>Explore Room</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button onClick={() => { if (onKnowMeClick) onKnowMeClick(); if (onAction) onAction('mirror'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', color: '#171b2b', textAlign: 'left', width: '100%', transition: 'background 0.2s' }} className="map-legend-item">
              <span>🪞 Mirror</span><span style={{ color: '#8791a4' }}>About me</span>
            </button>
            <button onClick={() => { if (onExploreClick) onExploreClick(); if (onNavigate) onNavigate('/projects'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', color: '#171b2b', textAlign: 'left', width: '100%', transition: 'background 0.2s' }} className="map-legend-item">
              <span>💻 Laptop</span><span style={{ color: '#8791a4' }}>My work</span>
            </button>
            <button onClick={() => { if (onUnderstandClick) onUnderstandClick(); if (onAction) onAction('board'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', color: '#171b2b', textAlign: 'left', width: '100%', transition: 'background 0.2s' }} className="map-legend-item">
              <span>📌 Pinboard</span><span style={{ color: '#8791a4' }}>How I think</span>
            </button>
            <button onClick={() => { if (onNavigate) onNavigate('/art'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', color: '#171b2b', textAlign: 'left', width: '100%', transition: 'background 0.2s' }} className="map-legend-item">
              <span>🎨 Easel</span><span style={{ color: '#8791a4' }}>My art</span>
            </button>
            <button onClick={() => { if (onNavigate) onNavigate('/experience'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', color: '#171b2b', textAlign: 'left', width: '100%', transition: 'background 0.2s' }} className="map-legend-item">
              <span>📚 Bookshelf</span><span style={{ color: '#8791a4' }}>Experience</span>
            </button>
            <button onClick={() => { if (onNavigate) onNavigate('/inspiration'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', color: '#171b2b', textAlign: 'left', width: '100%', transition: 'background 0.2s' }} className="map-legend-item">
              <span>🪟 Window</span><span style={{ color: '#8791a4' }}>What inspires me</span>
            </button>
            <button onClick={() => { if (onNavigate) onNavigate('/contact'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', color: '#171b2b', textAlign: 'left', width: '100%', transition: 'background 0.2s' }} className="map-legend-item">
              <span>🗄️ Drawer</span><span style={{ color: '#8791a4' }}>Work with me</span>
            </button>
          </div>
        </div>
      </div>

      {/* White Screen Overlay */}
      <div
        className={`intro-white-screen ${phase === 'white' ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Welcome Text */}
      <div className={`welcome-text ${phase === 'welcome' ? 'opacity-100' : 'opacity-0'}`}>
        Welcome to my space
      </div>

      {/* Top Title Text */}
      <div
        className={`top-title-text ${phase === 'options' && showTitle ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowTitle(false)}
      >
        {renderTypedText()}
        <span className="animate-pulse">|</span>
      </div>

      {/* Interactive Options */}
      <div
        className={`intent-options ${phase === 'options' ? 'opacity-100' : 'opacity-0'} ${viewState === 'mirror' ? 'pointer-events-none' : 'pointer-events-auto'}`}
        onMouseEnter={() => onUiHoverChange(true)}
        onMouseLeave={() => onUiHoverChange(false)}
      >
        <button className={`intent-button transition-opacity duration-500 opacity-100`} disabled={viewState === 'mirror'} onClick={() => onAction && onAction('mirror')}>I am hiring</button>
        <button className={`intent-button transition-opacity duration-500 opacity-100`} disabled={viewState === 'mirror'} onClick={() => onAction && onAction('default')}>I am a designer</button>
        <button className={`intent-button transition-opacity duration-500 opacity-100`} disabled={viewState === 'mirror'} onClick={() => onAction && onAction('board')}>I'm curious</button>
      </div>

      {/* Know Me Pointer (Removed for Mirror Overlay Flow) */}

      {/* Explore my Work Pointer */}
      <div
        className={`cp-container cp-explore ${audioCompleted && viewState === 'default' ? 'opacity-100 pointer-events-auto show-pop-work' : 'opacity-0 pointer-events-none'}`}
        style={{ left: '60%', top: '48%' }}
        onMouseEnter={() => onUiHoverChange(true)}
        onMouseLeave={() => onUiHoverChange(false)}
      >
        <div className="cp-dot" />
        <svg className="cp-svg" width="60" height="60" style={{ bottom: 0, right: 0 }}>
          <path d="M 60,60 Q 60,0 0,0" fill="none" stroke="white" strokeWidth="2" />
        </svg>
        <div className="cp-content" style={{ bottom: '60px', right: '60px', transform: 'translateY(50%)', flexDirection: 'row-reverse' }}>
          <Laptop color="white" size={24} />
          <button className="cp-button" onClick={onExploreClick}>
            Wanna explore my work ?
          </button>
        </div>
      </div>

      {/* Understand How I Think Pointer (On Board) */}
      <div
        className={`cp-container cp-understand ${viewState === 'board' ? 'show-pop-work opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ left: '50%', top: '45%' }} // Centered since camera zooms in on it
        onMouseEnter={() => onUiHoverChange(true)}
        onMouseLeave={() => onUiHoverChange(false)}
      >
        <div className="cp-dot" />
        <svg className="cp-svg" width="60" height="60" style={{ bottom: 0, left: 0 }}>
          <path d="M 0,60 Q 0,0 60,0" fill="none" stroke="white" strokeWidth="2" />
        </svg>
        <div className="cp-content" style={{ bottom: '60px', left: '60px', transform: 'translateY(50%)' }}>
          <Lightbulb color="white" size={24} />
          <button className="cp-button" onClick={onUnderstandClick}>
            Understand How I Think
            <span className="clicking-pointer">👆</span>
          </button>
        </div>
      </div>

    </div>
  );
}
