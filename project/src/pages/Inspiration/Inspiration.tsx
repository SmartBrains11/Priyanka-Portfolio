import { ChevronLeft } from 'lucide-react';
import './Inspiration.css';

type InspirationProps = {
  onNavigate: (path: string) => void;
};

export default function Inspiration({ onNavigate }: InspirationProps) {
  return (
    <article className="inspiration-page">
      <button 
        className="back-link" 
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#8c8881', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '40px' }}
        type="button" 
        onClick={() => onNavigate('/')}
      >
        <ChevronLeft size={16} /> Back
      </button>

      <header className="inspiration-header">
        <div className="inspiration-kicker">About Me</div>
        <h1 className="inspiration-title">What Inspires Me</h1>
      </header>

      <div className="inspiration-hero">
        <img 
          src="/images/what inspires me/hero me.png" 
          alt="Open book collage showcasing inspiration" 
        />
      </div>

      <div className="inspiration-intro">
        <p className="intro-lead">
          I find inspiration in the little things — <br/>
          art, people, nature, stories, and everyday moments.
        </p>
        <p className="intro-body">
          As an artist and designer, I’m drawn to details, emotions, and unexpected connections. 
          I collect these little observations and turn them into ideas, visuals, and experiences.
        </p>
        <div className="intro-signature">
          I don't just look for inspiration.<br/>
          I look for connections.
        </div>
      </div>

      <div className="divider"></div>

      <div className="collage-section">
        {/* 01 - Art */}
        <div className="collage-item">
          <div className="collage-img-wrapper">
            <img src="/images/what inspires me/art_illustration_1791478077835.jpg" alt="Art and Illustration" />
          </div>
          <div className="collage-number">01</div>
          <div className="collage-category">Art & Illustration</div>
          <div className="collage-desc">Colour, expression, composition.</div>
        </div>

        {/* 02 - Nature */}
        <div className="collage-item">
          <div className="collage-img-wrapper">
            <img src="/images/what inspires me/nature_collage_1791478090287.jpg" alt="Nature" />
          </div>
          <div className="collage-number">02</div>
          <div className="collage-category">Nature</div>
          <div className="collage-desc">Organic forms, textures, quiet details.</div>
        </div>

        {/* 03 - Everyday Life */}
        <div className="collage-item">
          <div className="collage-img-wrapper">
            <img src="/images/what inspires me/everyday_life_1791478102816.jpg" alt="Everyday Life" />
          </div>
          <div className="collage-number">03</div>
          <div className="collage-category">Everyday Life</div>
          <div className="collage-desc">People, places, objects, little moments.</div>
        </div>

        {/* 04 - Stories & Culture */}
        <div className="collage-item">
          <div className="collage-img-wrapper">
            <img src="/images/what inspires me/stories_culture_1791478115670.jpg" alt="Stories and Culture" />
          </div>
          <div className="collage-number">04</div>
          <div className="collage-category">Stories & Culture</div>
          <div className="collage-desc">Traditions, experiences, visual narratives.</div>
        </div>

        {/* 05 - Curiosity */}
        <div className="collage-item">
          <div className="collage-img-wrapper">
            <img src="/images/what inspires me/curiosity_1791478127709.jpg" alt="Curiosity" />
          </div>
          <div className="collage-number">05</div>
          <div className="collage-category">Curiosity</div>
          <div className="collage-desc">New tools, technology, ideas, experiments.</div>
        </div>
      </div>
    </article>
  );
}
