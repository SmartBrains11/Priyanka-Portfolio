import { useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import './Experience.css';

type ExperienceProps = {
  onNavigate: (path: string) => void;
};

export default function Experience({ onNavigate }: ExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="experience-page" ref={containerRef}>
      <button 
        className="back-link" 
        onClick={() => onNavigate('/')}
        aria-label="Back to home"
      >
        <ChevronLeft size={16} /> Back
      </button>

      <header className="exp-header animate-on-scroll">
        <div className="exp-kicker">My Journey</div>
        <h1 className="exp-title">Experience</h1>
        <p className="exp-subtitle">
          From visual design and UX to product design, my journey has been shaped by curiosity, experimentation and solving real problems through design.
        </p>
      </header>

      <div className="chapter-list">
        
        {/* CHAPTER I */}
        <section className="chapter-item">
          <div className="chapter-sidebar animate-on-scroll">
            <div className="chapter-label">Chapter I</div>
            <div className="chapter-date">2026 – Present</div>
          </div>
          <div className="chapter-content animate-on-scroll">
            <h2 className="chapter-company">Varna Infotech</h2>
            <h3 className="chapter-role">Product Designer</h3>
            <p className="chapter-desc">
              Designed the core product experience for MechZie, a mobility marketplace connecting drivers with on-demand roadside mechanics. I led the visual identity across logo, colour, typography and UI, and translated complex requirements into seamless mobile experiences.
            </p>
            <div className="chapter-tags">
              <span>MECHZIE</span>
              <span>PRODUCT</span>
              <span>BRAND</span>
            </div>
          </div>
        </section>

        {/* CHAPTER II */}
        <section className="chapter-item">
          <div className="chapter-sidebar animate-on-scroll">
            <div className="chapter-label">Chapter II</div>
            <div className="chapter-date">2025 – 2026</div>
          </div>
          <div className="chapter-content animate-on-scroll">
            <h2 className="chapter-company">Smart Brains India</h2>
            <h3 className="chapter-role">UI/UX Designer</h3>
            <p className="chapter-desc">
              Worked across enterprise SaaS and AI products like Azure Q, Ignis AI and DaVinci. I redesigned complex architectures and built scalable Figma design systems from the ground up, moving concepts from early research directly to developer handoff.
            </p>
            
            <div className="chapter-metrics">
              <div className="metric-box">
                <div className="metric-value">58s</div>
                <div className="metric-label">Task Time (Down from 4m 12s)</div>
              </div>
              <div className="metric-box">
                <div className="metric-value">94%</div>
                <div className="metric-label">Task Success Rate</div>
              </div>
              <div className="metric-box">
                <div className="metric-value">7+</div>
                <div className="metric-label">Client Websites Designed</div>
              </div>
            </div>

            <div className="chapter-tags">
              <span>AZURE Q</span>
              <span>IGNIS AI</span>
              <span>DAVINCI</span>
              <span>DESIGN SYSTEMS</span>
            </div>
          </div>
        </section>

        {/* CHAPTER III */}
        <section className="chapter-item">
          <div className="chapter-sidebar animate-on-scroll">
            <div className="chapter-label">Chapter III</div>
            <div className="chapter-date">2024 – 2025</div>
          </div>
          <div className="chapter-content animate-on-scroll">
            <h2 className="chapter-company">iSpatial Techno Solutions</h2>
            <h3 className="chapter-role">Visual & UX Designer</h3>
            <p className="chapter-desc">
              Exploring the intersection of visual communication and product design. I designed high-impact marketing creatives for Smart City and Tech sectors while simultaneously researching and redesigning intuitive user flows for client software.
            </p>
            
            <div className="chapter-metrics">
              <div className="metric-box">
                <div className="metric-value">20+</div>
                <div className="metric-label">Creative Assets</div>
              </div>
              <div className="metric-box">
                <div className="metric-value">30%</div>
                <div className="metric-label">Faster Asset Creation</div>
              </div>
            </div>

            <div className="chapter-tags">
              <span>VISUAL DESIGN</span>
              <span>UX</span>
              <span>BRANDING</span>
              <span>CAMPAIGNS</span>
            </div>
          </div>
        </section>

        {/* CHAPTER IV */}
        <section className="chapter-item">
          <div className="chapter-sidebar animate-on-scroll">
            <div className="chapter-label">Chapter IV</div>
            <div className="chapter-date">2024</div>
          </div>
          <div className="chapter-content animate-on-scroll">
            <h2 className="chapter-company">Startapodero Ventures</h2>
            <h3 className="chapter-role">UX Research Intern</h3>
            <p className="chapter-desc">
              Focused heavily on user research, competitor analysis and usability testing to redesign key workflows for Telangana Schools' digital platforms.
            </p>
            <div className="chapter-tags">
              <span>USER RESEARCH</span>
              <span>WIREFRAMES</span>
              <span>PROTOTYPING</span>
            </div>
          </div>
        </section>

        <div className="chapter-divider animate-on-scroll"></div>

        {/* BEYOND THE TITLE */}
        <section className="chapter-item beyond-section">
          <div className="chapter-sidebar animate-on-scroll">
            <div className="chapter-label">Epilogue</div>
            <div className="chapter-date">2026 – Present</div>
          </div>
          <div className="chapter-content animate-on-scroll">
            <h2 className="chapter-company" style={{ fontFamily: 'Playfair Display', fontSize: '32px' }}>Beyond the Job Title</h2>
            <h3 className="chapter-role">Co-Founder & Founding Designer</h3>
            <p className="chapter-desc" style={{ fontStyle: 'italic', marginBottom: '32px' }}>
              "Some of my most meaningful design work happens outside a traditional role."
            </p>
            <p className="chapter-desc">
              Co-founded a children's brain-development institute in Andhra Pradesh. I lead the full design function—from branding and UI/UX to digital content strategy and local SEO.
            </p>
            
            <div className="chapter-metrics">
              <div className="metric-box">
                <div className="metric-value">100+</div>
                <div className="metric-label">Digital & Print Creatives</div>
              </div>
            </div>

            <div className="chapter-tags">
              <span>BRANDING</span>
              <span>UI/UX</span>
              <span>SEO</span>
              <span>STRATEGY</span>
            </div>
          </div>
        </section>
      </div>

      <div className="chapter-divider animate-on-scroll"></div>

      {/* DESIGN EVOLUTION */}
      <section className="evolution-section animate-on-scroll">
        <h2 className="evolution-heading">How My Practice Evolved</h2>
        
        <div className="evolution-stages">
          <div className="evo-stage">
            <span className="evo-num">01</span>
            <h4>Visual Design</h4>
            <p>Communicating through colour, composition, typography and imagery.</p>
          </div>
          <div className="evo-stage">
            <span className="evo-num">02</span>
            <h4>UX Design</h4>
            <p>Understanding people, problems, workflows and interactions.</p>
          </div>
          <div className="evo-stage">
            <span className="evo-num">03</span>
            <h4>Product Design</h4>
            <p>Bringing research, UX, UI and systems together.</p>
          </div>
          <div className="evo-stage">
            <span className="evo-num">04</span>
            <h4>Brand + Product</h4>
            <p>Connecting product experiences with visual identity and storytelling.</p>
          </div>
        </div>

        <div className="evolution-quote">
          “Each step added a new layer to how I think—from making things look right, to making them work, feel and communicate beautifully.”
        </div>
      </section>

    </div>
  );
}
