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
    { id: 'graphic', label: '08. Graphic system' },
    { id: 'applications', label: '09. Applications' },
    { id: 'campaign', label: '10. Campaign' },
    { id: 'final', label: '11. Final brand world' },
    { id: 'reflection', label: '12. Reflection' },
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
          <section id="intro" className="swarga-section intro-section" ref={(el) => (sectionRefs.current[0] = el)}>
            <div className="swarga-section-eyebrow">01 — INTRODUCTION</div>
            <div className="swarga-intro-header">
              <h2 className="swarga-section-title">SWARGA</h2>
              <h3 className="swarga-intro-subtitle">Heaven, Grounded.</h3>
            </div>

            <div className="swarga-intro-grid">
              <div className="swarga-intro-statement">
                <p>What if heaven could be experienced right here on earth?</p>
              </div>
              <div className="swarga-intro-details">
                <p>Swarga is a self-initiated café concept inspired by the Telugu word “Swargam” (స్వర్గం) — meaning heaven.</p>
                <p>A quiet escape where mist, greenery, warm light and natural textures come together.</p>
                <p>The identity blends the ethereal with the earthly through botanical forms, flowing shapes and subtle celestial details.</p>
              </div>
            </div>
          </section>

          {/* THE IDEA */}
          <section id="idea" className="swarga-section idea-section" ref={(el) => (sectionRefs.current[1] = el)}>
            <div className="swarga-section-eyebrow">02 — THE IDEA</div>
            <div className="swarga-idea-layout">
              <div className="swarga-idea-image-wrapper">
                <img
                  src="/images/Swarga/idea.png"
                  alt="Heaven and Earth misty landscape"
                  className="swarga-idea-image"
                />
              </div>
              <div className="swarga-idea-text-content">
                <div className="swarga-idea-header">
                  <h2 className="swarga-idea-title">HEAVEN</h2>
                  <span className="swarga-idea-cross">×</span>
                  <h2 className="swarga-idea-title">EARTH</h2>
                </div>

                <div className="swarga-idea-intro">
                  Swarga is built around the meeting point of two worlds.
                </div>

                <div className="swarga-idea-worlds">
                  <div className="swarga-world heaven-world">
                    <h4>HEAVEN</h4>
                    <div className="world-tags">
                      <span>Mist</span><span>Light</span><span>Air</span><span>Dreams</span><span>Celestial</span>
                    </div>
                  </div>

                  <div className="swarga-world earth-world">
                    <h4>EARTH</h4>
                    <div className="world-tags">
                      <span>Roots</span><span>Plants</span><span>Texture</span><span>Warmth</span><span>Life</span>
                    </div>
                  </div>
                </div>

                <div className="swarga-idea-conclusion">
                  <p>The goal isn't to make the brand look luxurious or perfectly heavenly.</p>
                  <p className="highlight">Heaven shouldn't feel shiny.<br />It should feel alive.</p>
                  <p>That becomes the heart of Swarga.</p>
                </div>
              </div>
            </div>
          </section>

          {/* BRAND CHALLENGE */}
          <section id="brand-challenge" className="swarga-section" ref={(el) => (sectionRefs.current[2] = el)}>
            <div className="swarga-section-eyebrow">03 — BRAND CHALLENGE</div>
            <div className="swarga-challenge-layout">
              <div className="swarga-challenge-main">
                <h3 className="swarga-challenge-subtitle">THE CHALLENGE</h3>
                <h2 className="swarga-challenge-title">How do you make “heaven” feel grounded, natural and believable?</h2>
              </div>
              <div className="swarga-challenge-points">
                <div className="swarga-challenge-point">
                  <div className="point-number">01</div>
                  <div className="point-content">
                    <h4>Avoid the obvious</h4>
                    <p>No clouds, halos or overly literal heavenly imagery.</p>
                  </div>
                </div>
                <div className="swarga-challenge-point">
                  <div className="point-number">02</div>
                  <div className="point-content">
                    <h4>Feel alive</h4>
                    <p>The identity should feel organic rather than perfectly geometric.</p>
                  </div>
                </div>
                <div className="swarga-challenge-point">
                  <div className="point-number">03</div>
                  <div className="point-content">
                    <h4>Balance two worlds</h4>
                    <p>Blend the ethereal with the earthly.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CREATIVE DIRECTION */}
          <section id="creative-direction" className="swarga-section creative-direction-section" ref={(el) => (sectionRefs.current[3] = el)}>
            <div className="swarga-section-eyebrow">04 — CREATIVE DIRECTION</div>
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
            <div className="swarga-section-eyebrow">05 — EXPLORATION</div>
            <div className="swarga-exploration-gallery">
              <img src="/images/Swarga/exploration book.jpg" alt="Exploration Book" className="swarga-full-width-img" />
            </div>
          </section>

          {/* IDENTITY */}
          <section id="identity" className="swarga-section identity-section" ref={(el) => (sectionRefs.current[5] = el)}>
            <div className="swarga-section-eyebrow">06 — IDENTITY</div>

            <div className="swarga-identity-gallery">
              <figure className="swarga-identity-figure full-width">
                <img src="/images/Swarga/pentool outliner.png" alt="Drafting the Mark" className="swarga-identity-img" />
                <figcaption>Drafting the Mark</figcaption>
              </figure>

              <figure className="swarga-identity-figure centered-small">
                <img src="/images/Swarga/moodboard/Logo.png" alt="Primary Logo" className="swarga-identity-img" />
                <figcaption>Primary Logo</figcaption>
              </figure>

              <figure className="swarga-identity-figure centered-small">
                <img src="/images/Swarga/moodboard/Watermark.png" alt="Brand Watermark" className="swarga-identity-img" />
                <figcaption>Brand Watermark</figcaption>
              </figure>

              <div className="swarga-identity-grid-2">
                <figure className="swarga-identity-figure">
                  <img src="/images/Swarga/moodboard/Combination.png" alt="Vertical Lockup" className="swarga-identity-img" />
                  <figcaption>Vertical Lockup</figcaption>
                </figure>
                <figure className="swarga-identity-figure">
                  <img src="/images/Swarga/moodboard/Combination 2.png" alt="Horizontal Lockup" className="swarga-identity-img" />
                  <figcaption>Horizontal Lockup</figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* ILLUSTRATION SYSTEM */}
          <section id="illustration" className="swarga-section" ref={(el) => (sectionRefs.current[6] = el)}>
            <div className="swarga-section-eyebrow">07 — ILLUSTRATION SYSTEM</div>
            <Placeholder id="illustration-placeholder" label="Content for Illustration System" />
          </section>

          {/* GRAPHIC SYSTEM */}
          <section id="graphic" className="swarga-section" ref={(el) => (sectionRefs.current[7] = el)}>
            <div className="swarga-section-eyebrow">08 — GRAPHIC SYSTEM</div>
            <Placeholder id="graphic-placeholder" label="Content for Graphic System" />
          </section>

          {/* APPLICATIONS */}
          <section id="applications" className="swarga-section" ref={(el) => (sectionRefs.current[8] = el)}>
            <div className="swarga-section-eyebrow">09 — APPLICATIONS</div>
            <Placeholder id="applications-placeholder" label="Content for Applications" />
          </section>

          {/* CAMPAIGN */}
          <section id="campaign" className="swarga-section" ref={(el) => (sectionRefs.current[9] = el)}>
            <div className="swarga-section-eyebrow">10 — CAMPAIGN</div>
            <Placeholder id="campaign-placeholder" label="Content for Campaign" />
          </section>

          {/* FINAL BRAND WORLD */}
          <section id="final" className="swarga-section" ref={(el) => (sectionRefs.current[10] = el)}>
            <div className="swarga-section-eyebrow">11 — FINAL BRAND WORLD</div>
            <Placeholder id="final-placeholder" label="Content for Final Brand World" />
          </section>

          {/* REFLECTION */}
          <section id="reflection" className="swarga-section" ref={(el) => (sectionRefs.current[11] = el)}>
            <div className="swarga-section-eyebrow">12 — REFLECTION</div>
            <Placeholder id="reflection-placeholder" label="Content for Reflection" />
          </section>

        </main>
      </div>
    </div>
  );
}
