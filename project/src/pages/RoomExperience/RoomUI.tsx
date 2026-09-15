import React, { useEffect, useState } from 'react';
import { User, Laptop, Lightbulb } from 'lucide-react';

type RoomUIProps = {
  onUiHoverChange: (hovered: boolean) => void;
  onAction?: (action: 'mirror' | 'default' | 'board') => void;
  viewState?: 'default' | 'mirror' | 'board';
  audioCompleted?: boolean;
  onExploreClick?: () => void;
  onUnderstandClick?: () => void;
  onKnowMeClick?: () => void;
};

let hasPlayedIntro = false;

export default function RoomUI({ onUiHoverChange, onAction, viewState, audioCompleted, onExploreClick, onUnderstandClick, onKnowMeClick }: RoomUIProps) {
  const [phase, setPhase] = useState<'white' | 'welcome' | 'room' | 'options'>(hasPlayedIntro ? 'options' : 'white');
  const [showTitle, setShowTitle] = useState(!hasPlayedIntro);
  const [typedText, setTypedText] = useState(hasPlayedIntro ? "HI, I'm Priyanka !! Zoom and Explore my Room" : "");
  const fullText = "HI, I'm Priyanka !! Zoom and Explore my Room";

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
    if (phase === 'options') {
      // If already typed, don't re-type
      if (hasPlayedIntro && typedText === fullText) return;

      const interval = setInterval(() => {
        setTypedText((prev) => {
          if (prev.length >= fullText.length) {
            clearInterval(interval);
            return prev;
          }
          return fullText.slice(0, prev.length + 1);
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [phase, fullText]);

  return (
    <div className="room-ui-layer pointer-events-none">
      
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
        {typedText}
        <span className="animate-pulse">|</span>
      </div>

      {/* Interactive Options */}
      <div 
        className={`intent-options ${phase === 'options' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onMouseEnter={() => onUiHoverChange(true)}
        onMouseLeave={() => onUiHoverChange(false)}
      >
        <button className="intent-button" onClick={() => onAction && onAction('mirror')}>I am hiring</button>
        <button className="intent-button" onClick={() => onAction && onAction('default')}>I am a designer</button>
        <button className="intent-button" onClick={() => onAction && onAction('board')}>I'm curious</button>
      </div>

      {/* Know Me Pointer */}
      <div 
        className={`cp-container cp-know-me ${viewState === 'mirror' ? 'show-pop opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        style={{ left: '20%', top: '50%' }}
        onMouseEnter={() => onUiHoverChange(true)}
        onMouseLeave={() => onUiHoverChange(false)}
      >
        <div className="cp-dot" />
        <svg className="cp-svg" width="60" height="60" style={{ bottom: 0, left: 0 }}>
          <path d="M 0,60 Q 0,0 60,0" fill="none" stroke="white" strokeWidth="2" />
        </svg>
        <div className="cp-content" style={{ bottom: '60px', left: '60px', transform: 'translateY(50%)' }}>
          <User color="white" size={24} />
          <button className="cp-button" onClick={onKnowMeClick}>
            Know me
            <span className="clicking-pointer">👆</span>
          </button>
        </div>
      </div>

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
