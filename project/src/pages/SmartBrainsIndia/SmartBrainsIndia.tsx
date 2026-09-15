import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projects, Project } from '@/data/projects';
import './SmartBrainsIndia.css';

interface SmartBrainsIndiaProps {
  project: Project;
  onNavigate: (path: string) => void;
}



export default function SmartBrainsIndia({ project, onNavigate }: SmartBrainsIndiaProps) {
  const index = projects.findIndex((item) => item.id === project.id);
  const previous = projects[index - 1];
  const next = projects[index + 1];

  const [activeSection, setActiveSection] = useState('overview');
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
    { id: 'overview', label: '01. Overview' },
    { id: 'problem', label: '02. Problem' },
    { id: 'role', label: '03. My Role' },
    { id: 'process', label: '04. Design Process' },
    { id: 'key-pages', label: '05. Key Pages' },
    { id: 'branding', label: '06. Branding' },
    { id: 'seo', label: '07. SEO' },
  ];

  return (
    <article className="sbi-page">
      <button className="sbi-back-link" type="button" onClick={() => onNavigate('/projects')}>
        <ChevronLeft size={17} /> Back to Projects
      </button>

      {/* Background Blurs */}
      <div className="sbi-bg-blur blur-purple-top"></div>
      <div className="sbi-bg-blur blur-purple-mid"></div>

      {/* Hero Section */}
      <section className="sbi-hero">
        <div className="hero-bg-text">SMART BRAINS INDIA</div>
        <div className="hero-content">
          <div className="tags">
            <span className="tag bg-pink">Website Design/ Development</span>
            <span className="tag bg-pink">Next.js</span>
            <span className="tag bg-pink">SEO + GEO</span>
            <span className="tag bg-green">Live Product</span>
            <span className="tag bg-green">Real Business Impact</span>
            <span className="tag bg-yellow">Interactive UX</span>
          </div>
          <h1 className="hero-title">SMART BRAINS INDIA</h1>
          <h2 className="hero-subtitle">End to end digital presence for a brain training academy</h2>
          <p className="hero-desc">Adding structure to conversations, without breaking them. Solo designer and developer. Real clients. Measurable growth. From zero to a functioning brand online.</p>
        </div>
        <div className="hero-image">
          <img src="/images/Smart Brains India/image 1.png" alt="Smart Brains India Hero" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      </section>

      <div className="sbi-layout">
        {/* Sticky Navigation */}
        <nav className="sbi-sticky-nav">
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

        <main className="sbi-main">
          {/* Project Overview Section */}
          <section id="overview" className="sbi-overview" ref={(el) => (sectionRefs.current[0] = el)}>
            <div className="overview-bg-text">INDIA</div>
            <div className="overview-image">
              <img src="/images/Smart Brains India/image 2.png" alt="Overview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div className="overview-content">
              <div className="section-label">01 — Project Overview</div>
              <h2 className="section-title blue">From invisible to credible</h2>
              <div className="title-underline bg-blue"></div>
              <p className="section-text">Smart Brains India is a brain training academy offering programs in abacus, vedic maths, phonics, and handwriting for children. Despite having a strong in-person reputation, the academy had no digital presence — no website, no way for interested parents to explore programs or inquire online, and no means of reaching families outside their immediate locality. I took ownership of the entire digital journey — from understanding the business goals and user needs, to designing the experience, building it in Next.js with AI assistance, and deploying it with SEO and GEO optimizations. This was a ground-up project with real stakes: real clients, a real business, and a real family depending on the outcome.</p>

              <div className="stats-row">
                <div className="stat-card">
                  <h3>35%</h3>
                  <p>Digital presence growth</p>
                </div>
                <div className="stat-card">
                  <h3>Multi-city</h3>
                  <p>Clients after launch</p>
                </div>
                <div className="stat-card">
                  <h3>18</h3>
                  <p>Pages, fully designed & built</p>
                </div>
              </div>
            </div>
          </section>

          {/* Problem Statement Section */}
          <section id="problem" className="sbi-problem" ref={(el) => (sectionRefs.current[1] = el)}>
            <div className="problem-card">
              <div className="section-label">02 — Problem Statement</div>
              <h2 className="section-title purple">The real problem wasn't just “No Website”.</h2>
              <div className="title-underline bg-purple"></div>
              <p className="section-text">The deeper problem was trust. Brain training programs are abstract — parents can't see the results upfront. They're skeptical. Competitors existed online, but their websites were cluttered, vague, and most are spiritually-worded. no real curriculum, no scientific backing, no transparency. Parents had no way to evaluate what they were signing their child up for.</p>

              <div className="comparison">
                <div className="comp-col">
                  <h3 className="comp-title orange">What competitors did</h3>
                  <div className="pill bg-gray">Vague, spiritual-sounding language</div>
                  <div className="pill bg-gray">No curriculum details</div>
                  <div className="pill bg-gray">No interactive experience</div>
                  <div className="pill bg-gray">No proof of what happens in class</div>
                  <div className="pill bg-gray">Dumped all info in a wall of text</div>
                </div>
                <div className="comp-col">
                  <h3 className="comp-title green">What we did differently</h3>
                  <div className="pill border-green">Scientific, evidence-based framing</div>
                  <div className="pill border-green">Full curriculum exposed per program</div>
                  <div className="pill border-green">Interactive program experiences</div>
                  <div className="pill border-green">Real student testimonials shown</div>
                  <div className="pill border-green">Transparent, structured content</div>
                </div>
              </div>

              <blockquote className="quote">
                "Parents don't buy programs. They buy confidence that the program will work for their child. Our job was to build that confidence before they picked up the phone."
              </blockquote>
            </div>
          </section>

          {/* My Role Section */}
          <section id="role" className="sbi-role" ref={(el) => (sectionRefs.current[2] = el)}>
            <div className="section-label">03 — My Role</div>
            <h2 className="section-title inline-title"><span className="blue">One person.</span> The full product lifecycle.</h2>
            <div className="title-underline bg-blue"></div>
            <p className="section-text role-desc">Smart Brains India is a brain training academy offering programs in abacus, vedic maths, phonics, and handwriting for children.</p>

            <div className="role-diagram">
              <div className="artist-profile">
                <img src="/images/Smart Brains India/artist-main 1.png" alt="Priyanka" className="artist-img" style={{ objectFit: 'cover' }} />
                <div className="artist-name">Priyanka | UI/UX Designer</div>
              </div>

              <div className="nodes">
                <div className="node research">
                  <h4>Research</h4>
                  <p>Parent personas, competitor teardowns, stakeholder interviews</p>
                </div>
                <div className="node dev">
                  <h4>Development</h4>
                  <p>Next.js, AI-assisted, fully responsive</p>
                </div>
                <div className="node uiux">
                  <h4>UI/UX Design</h4>
                  <p>All 7 pages — wireframes to high-fidelity</p>
                </div>
                <div className="node strategy">
                  <h4>Strategy</h4>
                  <p>Two-audience architecture, conversion funnel</p>
                </div>
                <div className="node interact">
                  <h4>Interactive UX</h4>
                  <p>Designed 4 program mini-games from scratch</p>
                </div>
                <div className="node seogeo">
                  <h4>SEO + GEO</h4>
                  <p>On-page, off-page, metadata, geographic targeting</p>
                </div>
              </div>
            </div>
          </section>

          {/* Design Process Section */}
          <section id="process" className="sbi-process" ref={(el) => (sectionRefs.current[3] = el)}>
            <div className="process-video-container">
              <video
                src="/images/AzzureQ/4.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="sbi-process-video"
              />
            </div>
          </section>

          {/* Key Pages Section */}
          <section id="key-pages" className="sbi-key-pages-video" ref={(el) => (sectionRefs.current[4] = el)}>
            <div className="process-video-container">
              <video
                src="/images/AzzureQ/5.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="sbi-process-video"
              />
            </div>
          </section>

          {/* Branding Section */}
          <section id="branding" className="sbi-branding" ref={(el) => (sectionRefs.current[5] = el)}>
            <h2 className="branding-title">Branding</h2>
            <p className="branding-desc">
              The goal was to build a strong visual identity and digital presence that feels:
            </p>
            <div className="branding-pills">
              <span className="b-pill pill-fun">Fun for children</span>
              <span className="b-pill pill-trust">Trustworthy for parents</span>
              <span className="b-pill pill-modern">Modern and professional</span>
              <span className="b-pill pill-inspire">Emotionally inspiring</span>
            </div>

            <div className="branding-bento-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <div key={num} className={`bento-item bento-item-${num}`}>
                  <img src={`/images/Smart Brains India/${num}.png`} alt={`Branding ${num}`} loading="lazy" />
                </div>
              ))}
            </div>
          </section>

          {/* SEO Section */}
          <section id="seo" className="sbi-seo" ref={(el) => (sectionRefs.current[6] = el)}>
            <img src="/images/Smart Brains India/SEO.png" alt="SEO" className="seo-image" loading="lazy" />
          </section>



          <div className="case-navigation sbi-case-navigation">
            {previous ? <button type="button" onClick={() => onNavigate(previous.route)}><ChevronLeft size={17} /><span><small>Previous Project</small>{previous.title}</span></button> : <span />}
            {next ? <button type="button" onClick={() => onNavigate(next.route)}><span><small>Next Project</small>{next.title}</span><ChevronRight size={17} /></button> : <button type="button" onClick={() => onNavigate('/projects')}><span><small>Return to</small>Projects</span><ChevronRight size={17} /></button>}
          </div>
        </main>
      </div>
    </article>
  );
}
