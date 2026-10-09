import React, { useState, useRef, useEffect } from 'react';
import Room360 from './Room360';
import RoomUI from './RoomUI';
import './RoomExperience.css';

type RoomExperienceProps = {
  onNavigate?: (path: string) => void;
};

export default function RoomExperience({ onNavigate }: RoomExperienceProps) {
  const [uiHovered, setUiHovered] = useState(false);
  
  // Read initial view from URL
  const searchParams = new URLSearchParams(window.location.search);
  const initialView = (searchParams.get('view') as 'default' | 'mirror' | 'board') || 'default';
  
  const [viewState, setViewState] = useState<'default' | 'mirror' | 'board'>(initialView);
  const [mirrorTransitionPhase, setMirrorTransitionPhase] = useState<'idle' | 'transitioning' | 'finished'>('idle');
  const [audioCompleted, setAudioCompleted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showPaperOverlay, setShowPaperOverlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (viewState !== 'mirror') {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setShowVideo(false);
      setShowPaperOverlay(false);
      setMirrorTransitionPhase('idle');
    } else {
      setMirrorTransitionPhase('transitioning');
      const timer = setTimeout(() => {
        setMirrorTransitionPhase('finished');
      }, 1200);

      // Automatically navigate to video after 2 seconds
      const videoTimer = setTimeout(() => {
        setShowVideo(true);
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.play().catch(e => console.error("Video playback failed:", e));
          }
        }, 100);
      }, 2000);

      return () => {
        clearTimeout(timer);
        clearTimeout(videoTimer);
      };
    }
  }, [viewState]);

  const handleVideoEnded = () => {
    setAudioCompleted(true);
    setShowVideo(false);
  };

  const handleKnowMeClick = () => {
    setShowVideo(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.error("Video playback failed:", e));
      }
    }, 100);
  };

  return (
    <div className="room-container">
      {/* Video Overlay */}
      <div 
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 transition-opacity duration-500 ${showVideo ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <video 
          ref={videoRef}
          src="/images/about me/I am Priyanka.mp4" 
          onEnded={handleVideoEnded}
          controls
          className="max-w-[80%] max-h-[75%] rounded-lg shadow-2xl"
        />
        
        <div className="mt-8 flex gap-6">
          <button 
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors backdrop-blur-sm border border-white/20"
            onClick={() => {
              if (videoRef.current) videoRef.current.pause();
              setShowPaperOverlay(true);
            }}
          >
            Know More
          </button>
          <button 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors shadow-lg"
            onClick={() => {
              setShowVideo(false);
              if (videoRef.current) videoRef.current.pause();
              if (onNavigate) onNavigate('/projects');
            }}
          >
            Wanna explore my work
          </button>
        </div>

        <button 
          className="absolute top-8 right-8 text-white text-2xl font-bold bg-black/50 w-12 h-12 rounded-full hover:bg-black/80 flex items-center justify-center transition-colors"
          onClick={() => {
            setShowVideo(false);
            if (videoRef.current) videoRef.current.pause();
          }}
        >
          ×
        </button>
      </div>

      {/* Paper Overlay */}
      {showPaperOverlay && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm">
          <div 
            className="relative w-full max-w-4xl h-[90vh] shadow-2xl rounded-sm text-black flex flex-col" 
            style={{ 
              backgroundImage: "url('/images/about me/Paper.jpg')", 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Sticky Header with Close Button */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/10 to-transparent z-10 pointer-events-none rounded-t-sm" />
            <button 
              className="absolute top-6 right-6 text-black/70 hover:text-black text-4xl font-bold z-20 w-12 h-12 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              onClick={() => {
                setShowPaperOverlay(false);
                if (videoRef.current) {
                  videoRef.current.play().catch(e => console.error("Video resume failed:", e));
                }
              }}
              title="Close and return to video"
            >
              ×
            </button>
            
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-8 sm:p-12 relative z-0">
              <div className="max-w-2xl mx-auto space-y-6 text-[15px] leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                <h2 className="text-3xl font-bold mb-8">More About Me</h2>
                
                <p>I’m a multidisciplinary designer with a background spanning <strong>product design, UI/UX, UX research, visual design, branding, and digital experiences</strong>.</p>
                
                <p>My work sits at the intersection of <strong>people, problems, products, and visual storytelling</strong>. I enjoy understanding what people need, identifying where an experience breaks down, and turning complex ideas into experiences that feel clear, intuitive, and purposeful.</p>

                <h3 className="text-xl font-bold mt-10 mb-4">What I’ve worked on</h3>
                <p>My professional experience has given me the opportunity to work across very different types of design problems.</p>
                
                <p>At <strong>Virtue Serve</strong>, I worked across three enterprise products — <strong>Azure Q, Ignis AI, and DaVinci</strong> — contributing to product discovery, user research, information architecture, interaction design, high-fidelity UI, prototyping, and design systems. I also designed 7+ responsive client websites and contributed to branding, presentations, marketing assets, and digital experiences across AI, education, and technology.</p>
                
                <p>As a <strong>Founding Designer at Smart Brains India</strong>, I worked across the complete design ecosystem of an education startup — from branding and website design to educational experiences, marketing campaigns, social media, and digital and print communication. I’ve created 100+ digital and print assets while helping establish a consistent visual identity across the brand.</p>
                
                <p>My experience also includes <strong>UX research and product discovery</strong> — user interviews, competitor analysis, usability evaluation, journey mapping, personas, information architecture, user flows, and research synthesis. These experiences have shaped the way I approach design: not just asking <em>“How should this look?”</em>, but first asking <em>“Why does this need to exist, and what does the user actually need?”</em></p>

                <h3 className="text-xl font-bold mt-10 mb-4">Beyond product design</h3>
                <p>I’ve always been interested in the visual side of design too.</p>
                <p>My work has included <strong>brand identities, websites, marketing campaigns, presentations, posters, brochures, illustrations, digital artwork, and visual communication</strong>. That background has given me a strong understanding of typography, colour, composition, hierarchy, and visual storytelling.</p>
                <p>I don't see these as separate skills.</p>
                <p>
                  Product thinking helps me understand the problem.<br/>
                  Research helps me understand the people.<br/>
                  Visual design helps me communicate the solution.<br/>
                  And curiosity keeps me looking for a better one.
                </p>

                <h3 className="text-xl font-bold mt-10 mb-4">How I work</h3>
                <p>I’m someone who enjoys exploring.</p>
                <p>I learn quickly, adapt to new environments, and genuinely enjoy working on things I haven’t done before. I like experimenting with different approaches rather than immediately accepting the first solution.</p>
                <p>I also value people just as much as the work itself. I enjoy communicating, collaborating, building relationships, and understanding different perspectives. I believe good design rarely happens in isolation — it comes from conversations between designers, users, developers, stakeholders, and everyone involved in making the product real.</p>

                <h3 className="text-xl font-bold mt-10 mb-4">What design means to me</h3>
                <p>Design isn't simply a job title for me.</p>
                <p>It’s a way of thinking that has followed me through different forms of creativity — from art and illustration to interfaces, products, brands, and experiences.</p>
                <p>Today, I bring all of those perspectives together.</p>
                <p>I’m interested in creating things that <strong>solve something, communicate something, or make someone's experience a little better</strong>.</p>
                <p>And I’m still exploring where that curiosity takes me next.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mirror Clickable Area */}
      {mirrorTransitionPhase === 'finished' && (
        <div 
          className="fixed inset-0 z-[50] flex items-center justify-center pointer-events-none"
        >
          <div 
            className="absolute z-[50] cursor-pointer group pointer-events-auto flex items-center justify-center"
            style={{
              top: '50%',
              left: '33%', /* Moved further right to align perfectly with the mirror */
              transform: 'translate(-50%, -50%)',
              width: '12%',
              height: '55%',
            }}
            onClick={handleKnowMeClick}
            title="Click to know more"
          >
            {/* Subtle hover effect for the clickable area */}
            <div className="absolute inset-0 w-full h-full bg-white/0 group-hover:bg-white/10 rounded-3xl blur-md transition-colors duration-300" />
            
            {/* Click Indicator */}
            <div className="flex flex-col items-center justify-center animate-bounce text-white drop-shadow-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <span className="text-5xl filter drop-shadow-lg">👆</span>
            </div>
          </div>
        </div>
      )}

      <Room360 isUiHovered={uiHovered} viewState={viewState} mirrorTransitionPhase={mirrorTransitionPhase} />
      <RoomUI 
        onUiHoverChange={setUiHovered} 
        onAction={(action) => setViewState(action)} 
        viewState={viewState}
        audioCompleted={audioCompleted}
        onExploreClick={() => onNavigate && onNavigate('/projects')}
        onUnderstandClick={() => onNavigate && onNavigate('/understand-how-i-think')}
        onKnowMeClick={handleKnowMeClick}
        onNavigate={onNavigate}
      />
    </div>
  );
}
