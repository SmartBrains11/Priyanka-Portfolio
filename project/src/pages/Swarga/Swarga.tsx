import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Project } from '@/data/projects';
import './Swarga.css';

interface SwargaProps {
  project: Project;
  onNavigate: (path: string) => void;
}

const Placeholder = ({ id, aspectRatio = '16/9', label }: { id: string; aspectRatio?: string; label?: string }) => (
  <div className={`swarga-placeholder ${id}`} style={{ aspectRatio }}>
    <span className="placeholder-label">{label || `[${id.toUpperCase().replace(/-/g, ' ')}]`}</span>
  </div>
);

const moodboardLayoutData = [
  { src: 'image 3.png', w: 280, h: 423, l: 370, t: 650 },
  { src: 'image 1.png', w: 142, h: 253, l: 370, t: 376 },
  { src: 'image 4.png', w: 324, h: 486, l: 370, t: 1094 },
  { src: 'image 2.png', w: 147, h: 221, l: 377, t: 139 },
  { src: 'image 5.png', w: 300, h: 300, l: 544, t: 134 },
  { src: 'image 6.png', w: 176, h: 176, l: 544, t: 453 },
  { src: 'image 7.png', w: 324, h: 389, l: 681, t: 663 },
  { src: 'image 9.png', w: 292, h: 518, l: 1303, t: 284 },
  { src: 'image 10.png', w: 324, h: 648, l: 1303, t: 858 },
  { src: 'image 11.png', w: 324, h: 576, l: 925, t: 26 },
  { src: 'image 13.png', w: 324, h: 648, l: 713, t: 1114 },
  { src: 'image 14.png', w: 286, h: 508, l: 1087, t: 1547 },
  { src: 'image 15.png', w: 247, h: 440, l: 441, t: 1615 },
  { src: 'image 16.png', w: 338, h: 676, l: 0, t: 1086 },
  { src: 'image 17.png', w: 256, h: 455, l: 1412, t: 1547 },
  { src: 'image 18.png', w: 202, h: 359, l: 1682, t: 1147 },
  { src: 'image 19.png', w: 247, h: 325, l: 1043, t: 1043 },
  { src: 'image 20.png', w: 285, h: 506, l: 733, t: 1804 },
  { src: 'image 21.png', w: 324, h: 576, l: 1700, t: 1547 },
  { src: 'image 27.png', w: 359, h: 638, l: 1060, t: 2096 },
  { src: 'image 28.png', w: 311, h: 553, l: 27, t: 453 },
  { src: 'image 29.png', w: 273, h: 485, l: 1659, t: 638 },
  { src: 'image 31.png', w: 311, h: 540, l: 85, t: 1804 }
];

const MoodboardParallax = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate progress of container through the viewport from -1 to 1
      const viewportHeight = window.innerHeight;

      // when rect.top == viewportHeight (just entering), progress is -1
      // when rect.bottom == 0 (just leaving), progress is 1
      const totalScrollDistance = viewportHeight + rect.height;
      const currentScroll = viewportHeight - rect.top;

      const progress = (currentScroll / totalScrollDistance) * 2 - 1;

      // Clamp between -1 and 1
      setScrollProgress(Math.max(-1, Math.min(1, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baseWidth = 1976;
  const baseHeight = 2760;

  return (
    <div className="swarga-moodboard-absolute-container" ref={containerRef}>
      <div className="swarga-moodboard-scaler">
        {moodboardLayoutData.map((item, i) => {
          // Use scrollProgress (-1 to 1) multiplied by a fixed max pixel offset
          // This ensures the parallax never exceeds e.g. +/- 40px, preventing overlap!
          const maxOffset = (i % 3 === 0) ? -30 : (i % 3 === 1) ? 30 : 0;
          const parallaxOffset = scrollProgress * maxOffset;

          return (
            <div
              key={i}
              className="swarga-moodboard-absolute-item"
              style={{
                width: `${(item.w / baseWidth) * 100}%`,
                height: `${(item.h / baseHeight) * 100}%`,
                left: `${(item.l / baseWidth) * 100}%`,
                top: `${(item.t / baseHeight) * 100}%`,
                transform: `translateY(${parallaxOffset}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              <img src={`/images/Swarga/moodboard/${item.src}`} alt="Moodboard element" />
            </div>
          )
        })}
      </div>
    </div>
  );
};

const illustrationImages = [
  'char bg less 1.png',
  'char bg less 2.png',
  'char bg less 3.png',
  'char bg less 5.png',
  'char bg less 6.png',
  'char bg less 7.png',
  'char bg less 8.png',
  'char bg less 9.png',
  'char bg less 10.png',
  'char bg less 11.png',
  'char bg less 12.png',
  'char bg less 13.png',
  'char bg less 16.png',
];

const IllustrationAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % illustrationImages.length);
    }, 400); // 400ms per frame for a nice stop-motion effect
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="swarga-illustration-container" style={{ marginTop: '1rem' }}>
      <div className="swarga-illustration-frame">
        <img
          src={`/images/Swarga/illus/${illustrationImages[currentIndex]}`}
          alt="Illustration character"
          className="swarga-illustration-image"
        />
      </div>
    </div>
  );
};

export default function Swarga({ project, onNavigate }: SwargaProps) {
  const [activeSection, setActiveSection] = useState('intro');
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'intro', label: '01. Introduction' },
    { id: 'idea', label: '02. The idea' },
    { id: 'brand-challenge', label: '03. Brand challenge' },
    { id: 'creative-direction', label: '04. Creative direction' },
    { id: 'exploration', label: '05. Exploration' },
    { id: 'identity', label: '06. Identity' },
    { id: 'illustration', label: '07. Illustration system' },
    { id: 'applications', label: '08. Applications' },
    { id: 'campaign', label: '09. Campaign' },
    { id: 'final', label: '10. Final brand world' },
    { id: 'reflection', label: '11. Reflection' },
  ];

  return (
    <div className="swarga-case-study">
      <button
        onClick={() => onNavigate('/')}
        className="swarga-back-link"
      >
        <ChevronLeft size={16} />
        Back to Home
      </button>

      {/* HERO SECTION */}
      <header className="swarga-hero">
        <div className="swarga-hero-video-container">
          <video
            src="/images/Swarga/Hero Video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="swarga-hero-video"
          />
        </div>
      </header>
      <div className="swarga-layout">
        {/* Sticky Navigation */}
        <nav className="swarga-sticky-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={() => scrollToSection(item.id)}
                  type="button"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="swarga-content">

          {/* INTRODUCTION */}
          <section id="intro" className="swarga-section swarga-editorial-intro" ref={(el) => (sectionRefs.current[0] = el)}>

            <div className="swarga-hero-image-wrapper">
              <img src="/images/Swarga/idea.png" alt="Heaven meets earth atmospheric landscape" className="swarga-hero-bg" />
            </div>

            <div className="swarga-intro-content">
              <p className="swarga-intro-description">
                A self-initiated café branding concept inspired by the Telugu word “Swargam” — meaning heaven.
              </p>

              <div className="swarga-hero-metadata">
                <span>VISUAL IDENTITY</span>
                <span>ILLUSTRATION</span>
                <span>GRAPHIC DESIGN</span>
                <span>ART DIRECTION</span>
              </div>
            </div>
          </section>

          {/* THE IDEA */}
          <section id="idea" className="swarga-section swarga-editorial-idea" ref={(el) => (sectionRefs.current[1] = el)}>

            <div className="swarga-idea-editorial-container">
              <h2 className="swarga-idea-statement">
                WHAT IF HEAVEN<br />
                WASN’T ABOVE US?
              </h2>

              <div className="swarga-idea-story">
                <div className="swarga-idea-story-block">
                  <h3 className="swarga-idea-story-title">SWARGA</h3>
                  <p>In Telugu, “Swargam” means heaven.</p>
                  <p>Swarga imagines heaven not as a distant place above us, but as a feeling that can exist here on earth — through nature, light, mist, warmth and quiet moments.</p>
                </div>

                <div className="swarga-idea-visual-equation">
                  <div className="swarga-equation-item">
                    <h4>HEAVEN</h4>
                    <p>light / sky / mist / celestial forms</p>
                  </div>
                  <div className="swarga-equation-cross">×</div>
                  <div className="swarga-equation-item">
                    <h4>EARTH</h4>
                    <p>plants / landscape / organic textures / warmth</p>
                  </div>
                </div>


              </div>
            </div>
          </section>

          {/* BRAND CHALLENGE */}
          <section id="brand-challenge" className="swarga-section swarga-editorial-challenge" ref={(el) => (sectionRefs.current[2] = el)}>

            <div className="swarga-challenge-editorial-container">
              <h2 className="swarga-challenge-statement">
                HOW DO YOU MAKE<br />
                ‘HEAVEN’ FEEL<br />
                GROUNDED?
              </h2>

              <p className="swarga-challenge-desc">
                The challenge was to create a café identity that feels ethereal and dreamlike without becoming overly mystical, while remaining organic, contemporary and believable.
              </p>

              <div className="swarga-challenge-tensions">
                <div className="swarga-tension">
                  <span className="swarga-tension-term">ETHEREAL</span>
                  <span className="swarga-tension-arrow">↕</span>
                  <span className="swarga-tension-term">GROUNDED</span>
                </div>
                <div className="swarga-tension">
                  <span className="swarga-tension-term">ORGANIC</span>
                  <span className="swarga-tension-arrow">↕</span>
                  <span className="swarga-tension-term">REFINED</span>
                </div>
                <div className="swarga-tension">
                  <span className="swarga-tension-term">TIMELESS</span>
                  <span className="swarga-tension-arrow">↕</span>
                  <span className="swarga-tension-term">CONTEMPORARY</span>
                </div>
              </div>

              <div className="swarga-challenge-goal">
                <h3>THE GOAL</h3>
                <p>Create a visual identity that feels like a quiet piece of heaven — rooted in nature, designed for everyday life.</p>
              </div>
            </div>
          </section>

          {/* CREATIVE DIRECTION */}
          <section id="creative-direction" className="swarga-section creative-direction-section" ref={(el) => (sectionRefs.current[3] = el)}>
            <div className="swarga-creative-keywords">
              <span>MIST</span>
              <span>BOTANICAL</span>
              <span>WARM</span>
              <span>ORGANIC</span>
              <span>QUIET</span>
              <span>ETHEREAL</span>
            </div>
            <MoodboardParallax />
          </section>

          {/* EXPLORATION */}
          <section id="exploration" className="swarga-section" ref={(el) => (sectionRefs.current[4] = el)}>
            <div className="swarga-exploration-gallery">
              <img src="/images/Swarga/explo.png" alt="Exploration Book" className="swarga-full-width-img" />
            </div>

            <div className="swarga-infographic">
              <div className="swarga-info-header">
                <h3 className="swarga-info-title">THE MAKING OF</h3>
                <p className="swarga-info-subtitle">A SYMBOL ROOTED IN A HIGHER FEELING</p>
              </div>

              <div className="swarga-info-columns">
                <div className="swarga-info-col">
                  <div className="swarga-info-col-top">
                    <span className="swarga-info-num">01</span>
                    <h4 className="swarga-info-name">LEAF</h4>
                    <div className="swarga-info-img-wrapper">
                      <img src="/images/Swarga/leaf.png" alt="Leaf" />
                    </div>
                  </div>
                  <div className="swarga-info-col-bottom">
                    <h5 className="swarga-info-represents">REPRESENTS<br />NATURE & LIFE</h5>
                  </div>
                </div>

                <div className="swarga-info-col">
                  <div className="swarga-info-col-top">
                    <span className="swarga-info-num">02</span>
                    <h4 className="swarga-info-name">FLOWING STEM</h4>
                    <div className="swarga-info-img-wrapper">
                      <img src="/images/Swarga/stem.png" alt="Stem" />
                    </div>
                  </div>
                  <div className="swarga-info-col-bottom">
                    <h5 className="swarga-info-represents">REPRESENTS<br />MOVEMENT</h5>
                  </div>
                </div>

                <div className="swarga-info-col">
                  <div className="swarga-info-col-top">
                    <span className="swarga-info-num">03</span>
                    <h4 className="swarga-info-name">CELESTIAL SUN</h4>
                    <div className="swarga-info-img-wrapper">
                      <img src="/images/Swarga/sun.png" alt="Sun" />
                    </div>
                  </div>
                  <div className="swarga-info-col-bottom">
                    <h5 className="swarga-info-represents">REPRESENTS<br />HEAVEN & LIGHT</h5>
                  </div>
                </div>

                <div className="swarga-info-col">
                  <div className="swarga-info-col-top">
                    <span className="swarga-info-num">04</span>
                    <h4 className="swarga-info-name">STAR</h4>
                    <div className="swarga-info-img-wrapper">
                      <img src="/images/Swarga/star.png" alt="Star" />
                    </div>
                  </div>
                  <div className="swarga-info-col-bottom">
                    <h5 className="swarga-info-represents">REPRESENTS<br />THE ETHEREAL</h5>
                  </div>
                </div>

                <div className="swarga-info-col">
                  <div className="swarga-info-col-top">
                    <span className="swarga-info-num">05</span>
                    <h4 className="swarga-info-name">CIRCULAR HALO</h4>
                    <div className="swarga-info-img-wrapper">
                      <img src="/images/Swarga/holo.png" alt="Halo" />
                    </div>
                  </div>
                  <div className="swarga-info-col-bottom">
                    <h5 className="swarga-info-represents">REPRESENTS<br />CONNECTION</h5>
                  </div>
                </div>
              </div>

              <div className="swarga-info-connector">
                <div className="swarga-info-line"></div>
                <div className="swarga-info-ticks">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="swarga-info-center-drop"></div>
              </div>

              <div className="swarga-info-full-logo">
                <img src="/images/Swarga/Full logo.png" alt="Swarga Full Logo" />
              </div>
            </div>
          </section>

          {/* IDENTITY */}
          <section id="identity" className="swarga-section identity-section" ref={(el) => (sectionRefs.current[5] = el)}>

            <div className="swarga-identity-gallery">
              <figure className="swarga-identity-figure full-width">
                <img src="/images/Swarga/logo combination mockup.png" alt="Logo Combination Mockup" className="swarga-identity-img" />
              </figure>

              <figure className="swarga-identity-figure centered-small">
                <img src="/images/Swarga/pentool outliner.png" alt="Pentool Outliner" className="swarga-identity-img" />
              </figure>

              <div className="swarga-identity-group-no-gap">
                <figure className="swarga-identity-figure full-width">
                  <img src="/images/Swarga/colour.png" alt="Colour Palette" className="swarga-identity-img" />
                </figure>

                <figure className="swarga-identity-figure full-width">
                  <img src="/images/Swarga/logo var.png" alt="Logo Variations" className="swarga-identity-img" />
                </figure>

                <figure className="swarga-identity-figure full-width">
                  <img src="/images/Swarga/iden 4.png" alt="Identity 4" className="swarga-identity-img" />
                </figure>
              </div>
            </div>
          </section>

          {/* ILLUSTRATION SYSTEM */}
          <section id="illustration" className="swarga-section" ref={(el) => (sectionRefs.current[6] = el)} style={{ paddingBottom: '2rem' }}>
            <IllustrationAnimation />
          </section>

          {/* APPLICATIONS */}
          <section id="applications" className="swarga-section" ref={(el) => (sectionRefs.current[7] = el)}>
            <div className="swarga-applications-gallery" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
              <img src="/images/Swarga/man.png" alt="Man with Swarga T-shirt" className="swarga-full-width-img" />
              <img src="/images/Swarga/mock tray.png" alt="Mock tray with croissant and drink" className="swarga-full-width-img" />
              <img src="/images/Swarga/bill.png" alt="Swarga Billboard" className="swarga-full-width-img" />
            </div>
          </section>

          {/* CAMPAIGN */}
          <section id="campaign" className="swarga-section" ref={(el) => (sectionRefs.current[8] = el)}>
            <div className="swarga-campaign-marquee">
              <div className="swarga-campaign-marquee-track">
                {[...Array(4)].map((_, i) => (
                  <React.Fragment key={i}>
                    <img src="/images/Swarga/pos 1.png" alt="Campaign Poster 1" />
                    <img src="/images/Swarga/Combination 2.png" alt="Combination 2" />
                    <img src="/images/Swarga/pos 2.png" alt="Campaign Poster 2" />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>

          {/* FINAL BRAND WORLD */}
          <section id="final" className="swarga-section" ref={(el) => (sectionRefs.current[9] = el)}>
            <div className="swarga-branding-video-container" style={{ borderRadius: '24px', overflow: 'hidden' }}>
              <video
                src="/images/Swarga/branding.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </section>

          {/* REFLECTION */}
          <section id="reflection" className="swarga-section swarga-editorial-challenge" ref={(el) => (sectionRefs.current[10] = el)}>
            <div className="swarga-challenge-editorial-container">
              <h2 className="swarga-challenge-statement">WHAT I LEARNED</h2>
              <p className="swarga-challenge-desc">
                Swarga started as an exploration of how a café could feel like a small escape from everyday life.<br /><br />
                Through the process, I learned that creating a visual identity is not just about making a beautiful logo — it is about building a consistent visual world around an idea.
              </p>

              <div className="swarga-reflection-grid">
                <div className="point-content">
                  <h4>01 — Meaning before decoration</h4>
                  <p>I learned to start with the brand idea and translate it into visual decisions rather than adding decorative elements just because they look good.</p>
                </div>
                <div className="point-content">
                  <h4>02 — Build a system, not a single logo</h4>
                  <p>The identity became stronger when the logo, illustrations, characters, colours, typography and applications started working together as one language.</p>
                </div>
                <div className="point-content">
                  <h4>03 — Restraint creates sophistication</h4>
                  <p>Working with a soft, minimal aesthetic taught me that leaving space and reducing visual noise can make the important elements feel more premium.</p>
                </div>
                <div className="point-content">
                  <h4>04 — Designing for real touchpoints</h4>
                  <p>Exploring cups, menus, posters, packaging, uniforms and digital applications helped me understand how a visual identity needs to adapt beyond a presentation board.</p>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
