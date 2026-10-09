import React, { useState } from 'react';
import { Map as MapIcon } from 'lucide-react';

type GlobalMapMenuProps = {
  onNavigate: (path: string) => void;
};

export default function GlobalMapMenu({ onNavigate }: GlobalMapMenuProps) {
  const [mapHovered, setMapHovered] = useState(false);

  return (
    <div 
      className="map-legend-container" 
      style={{ position: 'fixed', top: '32px', right: '32px', pointerEvents: 'auto', zIndex: 9999 }}
    >
      <button 
        style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '1px solid #e8ebf1', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'all 0.2s', padding: 0 }}
        aria-label="Interactive Map"
        className="map-legend-trigger"
        onClick={() => setMapHovered(!mapHovered)}
      >
        <MapIcon size={20} color="#171b2b" />
      </button>
      
      {/* Dropdown Menu */}
      <div 
        style={{ 
          position: 'absolute', top: '100%', right: '0', marginTop: '12px', background: '#fff', 
          borderRadius: '16px', border: '1px solid #e8ebf1', padding: '12px', width: '220px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.1)', opacity: mapHovered ? 1 : 0, 
          transform: mapHovered ? 'translateY(0)' : 'translateY(-10px)',
          pointerEvents: mapHovered ? 'auto' : 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div style={{ fontSize: '11px', fontWeight: 600, color: '#8791a4', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', padding: '0 8px' }}>Explore Portfolio</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button onClick={() => { setMapHovered(false); onNavigate('/'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', color: '#171b2b', textAlign: 'left', width: '100%', transition: 'background 0.2s' }}>
            <span>🏠 3D Room</span><span style={{ color: '#8791a4' }}>Home</span>
          </button>
          <button onClick={() => { setMapHovered(false); onNavigate('/projects'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', color: '#171b2b', textAlign: 'left', width: '100%', transition: 'background 0.2s' }}>
            <span>💻 Laptop</span><span style={{ color: '#8791a4' }}>My work</span>
          </button>
          <button onClick={() => { setMapHovered(false); onNavigate('/understand-how-i-think'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', color: '#171b2b', textAlign: 'left', width: '100%', transition: 'background 0.2s' }}>
            <span>📌 Pinboard</span><span style={{ color: '#8791a4' }}>How I think</span>
          </button>
          <button onClick={() => { setMapHovered(false); onNavigate('/art'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', color: '#171b2b', textAlign: 'left', width: '100%', transition: 'background 0.2s' }}>
            <span>🎨 Easel</span><span style={{ color: '#8791a4' }}>My art</span>
          </button>
          <button onClick={() => { setMapHovered(false); onNavigate('/experience'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', color: '#171b2b', textAlign: 'left', width: '100%', transition: 'background 0.2s' }}>
            <span>📚 Bookshelf</span><span style={{ color: '#8791a4' }}>Experience</span>
          </button>
          <button onClick={() => { setMapHovered(false); onNavigate('/inspiration'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', color: '#171b2b', textAlign: 'left', width: '100%', transition: 'background 0.2s' }}>
            <span>🪟 Window</span><span style={{ color: '#8791a4' }}>What inspires me</span>
          </button>
          <button onClick={() => { setMapHovered(false); onNavigate('/contact'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', color: '#171b2b', textAlign: 'left', width: '100%', transition: 'background 0.2s' }}>
            <span>🗄️ Drawer</span><span style={{ color: '#8791a4' }}>Work with me</span>
          </button>
        </div>
      </div>
    </div>
  );
}
