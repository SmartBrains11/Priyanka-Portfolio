import React, { useState, useEffect } from 'react';
import { 
  Map as MapIcon, 
  Home, 
  Folder, 
  User, 
  Briefcase, 
  Paintbrush, 
  Compass, 
  Mail, 
  X, 
  ChevronRight 
} from 'lucide-react';

export type GlobalMapMenuProps = {
  onNavigate: (path: string) => void;
  className?: string;
  isInline?: boolean;
};

export default function GlobalMapMenu({ onNavigate, className = '', isInline = false }: GlobalMapMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const currentSearch = typeof window !== 'undefined' ? window.location.search : '';

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const navItems = [
    { label: 'Home', path: '/', subtitle: '3D Room Experience', icon: <Home size={18} /> },
    { label: 'Projects', path: '/projects', subtitle: 'Selected Works', icon: <Folder size={18} /> },
    { label: 'About Me', path: '/?view=mirror', subtitle: 'Who I am & My story', icon: <User size={18} /> },
    { label: 'Experience', path: '/experience', subtitle: 'Career & timeline', icon: <Briefcase size={18} /> },
    { label: 'My Art', path: '/art', subtitle: 'Visual exploration', icon: <Paintbrush size={18} /> },
    { label: 'Inspiration', path: '/inspiration', subtitle: 'What inspires me', icon: <Compass size={18} /> },
    { label: 'Contact', path: '/contact', subtitle: 'Work with me', icon: <Mail size={18} /> },
  ];

  const handleSelect = (path: string) => {
    setIsOpen(false);
    onNavigate(path);
  };

  const containerStyle: React.CSSProperties = isInline
    ? { position: 'relative', display: 'flex', alignItems: 'center' }
    : { position: 'fixed', top: '24px', right: '24px', zIndex: 9999 };

  return (
    <div className={`map-legend-container ${isInline ? 'inline-map' : ''} ${className}`} style={containerStyle}>
      {/* Circular Map Icon Button */}
      <button 
        type="button"
        style={{ 
          width: '42px', 
          height: '42px', 
          borderRadius: '50%', 
          background: '#ffffff', 
          border: '1px solid #e2e6ed', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          cursor: 'pointer', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)', 
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', 
          padding: 0,
          color: '#171b2b',
        }}
        aria-label="Portfolio Navigation Map"
        className="map-legend-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MapIcon size={20} color="#171b2b" />
      </button>
      
      {/* Navigation Modal / Drawer */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            padding: '16px',
            animation: 'fadeIn 0.2s ease-out',
          }}
          onClick={() => setIsOpen(false)}
        >
          <div 
            style={{ 
              background: '#ffffff', 
              borderRadius: '20px', 
              border: '1px solid #e8ebf1', 
              padding: '20px', 
              width: 'min(340px, 100%)',
              boxShadow: '0 20px 48px rgba(15, 23, 42, 0.2)',
              marginTop: isInline ? '8px' : '16px',
              animation: 'slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid #f0f2f5' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#8791a4', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Navigation
              </div>
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#f4f6fa',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748b',
                  transition: 'background 0.2s',
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Links List */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navItems.map((item) => {
                const isSelected = 
                  item.path === '/' 
                    ? currentPath === '/' && !currentSearch.includes('view=mirror')
                    : item.path === '/?view=mirror'
                    ? currentPath === '/' && currentSearch.includes('view=mirror')
                    : currentPath === item.path;

                return (
                  <button 
                    key={item.label}
                    type="button"
                    onClick={() => handleSelect(item.path)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      padding: '10px 12px', 
                      borderRadius: '12px', 
                      border: 'none', 
                      background: isSelected ? '#f0f4ff' : 'transparent', 
                      cursor: 'pointer', 
                      width: '100%', 
                      transition: 'all 0.15s ease',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ color: isSelected ? '#2563eb' : '#64748b', display: 'flex', alignItems: 'center' }}>
                        {item.icon}
                      </span>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: isSelected ? 600 : 500, color: isSelected ? '#1e3a8a' : '#171b2b', lineHeight: 1.2 }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: '11px', color: '#8791a4', marginTop: '2px' }}>
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={15} color={isSelected ? '#2563eb' : '#cbd5e1'} />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

