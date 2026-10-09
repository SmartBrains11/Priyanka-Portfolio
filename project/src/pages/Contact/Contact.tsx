import { ChevronLeft, Phone, Linkedin, Palette } from 'lucide-react';
import './Contact.css';

type ContactProps = {
  onNavigate: (path: string) => void;
};

export default function Contact({ onNavigate }: ContactProps) {
  return (
    <div className="contact-page">
      <button 
        className="back-link contact-back" 
        onClick={() => onNavigate('/')}
        aria-label="Back to home"
      >
        <ChevronLeft size={16} /> Back
      </button>

      <div className="contact-content">
        <h1 className="contact-title">Let's Connect</h1>
        <p className="contact-subtitle">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>

        <div className="contact-links">
          <div className="contact-item">
            <span className="contact-label"><Phone size={14} /> Phone</span>
            <a href="tel:+917386209090" className="contact-value">+91 7386209090</a>
          </div>

          <div className="contact-item">
            <span className="contact-label"><Linkedin size={14} /> LinkedIn</span>
            <a href="https://www.linkedin.com/in/priyanka-lakkoju/" target="_blank" rel="noopener noreferrer" className="contact-value">
              /in/priyanka-lakkoju
            </a>
          </div>

          <div className="contact-item">
            <span className="contact-label"><Palette size={14} /> Behance</span>
            <a href="https://www.behance.net/lakkojupriyanka" target="_blank" rel="noopener noreferrer" className="contact-value">
              /lakkojupriyanka
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
