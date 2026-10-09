import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Instagram } from 'lucide-react';
import './Art.css';

type DraggableImageProps = {
  src: string;
  delay: number;
  zIndex: number;
  bringToFront: () => void;
};

function DraggableImage({ src, delay, zIndex, bringToFront }: DraggableImageProps) {
  // Fix dimensions to know exact bottom
  const imgWidth = 280;
  const imgHeight = 350;
  
  // Scatter everywhere across the screen width
  const targetX = (Math.random() * (window.innerWidth - imgWidth - 40)) + 20; 
  
  // Start from high above, but aligned with targetX so they fall straight down (gravity)
  const startX = targetX + (Math.random() * 100 - 50); // slight wind/drift
  const [position, setPosition] = useState({ x: startX, y: -800 - (Math.random() * 500) });
  
  // Start with a random rotation and land with a messy rotation
  const [rotation, setRotation] = useState((Math.random() - 0.5) * 60);
  const [isDragging, setIsDragging] = useState(false);
  const [hasFallen, setHasFallen] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // End Y is precisely at the bottom of the viewport
    // Substract image height and a random tiny offset so they look piled
    const endY = window.innerHeight - imgHeight - (Math.random() * 40); 
    const endRotation = (Math.random() - 0.5) * 70; 

    const timer = setTimeout(() => {
      setHasFallen(true);
      setPosition({ x: targetX, y: endY });
      setRotation(endRotation);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, targetX]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    bringToFront();
    setIsDragging(true);
    startPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    if (imgRef.current) {
      imgRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (imgRef.current) {
      imgRef.current.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <img
      ref={imgRef}
      src={src}
      className={`draggable-art ${hasFallen ? 'fallen' : 'falling'} ${isDragging ? 'dragging' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${isDragging ? 1.05 : 1})`,
        zIndex,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      alt="Art piece"
      draggable="false"
    />
  );
}

const ART_IMAGES = [
  '/images/art/1.png',
  '/images/art/2.png',
  '/images/art/3.png',
  '/images/art/4.png',
  '/images/art/5.jpeg',
  '/images/art/6.jpeg',
  '/images/art/7.jpeg',
  '/images/art/8.jpeg',
  '/images/art/9.jpeg',
];

type ArtProps = {
  onNavigate: (path: string) => void;
};

export default function Art({ onNavigate }: ArtProps) {
  const [zIndices, setZIndices] = useState(ART_IMAGES.map((_, i) => i + 10));
  const maxZIndex = useRef(20);

  const bringToFront = (index: number) => {
    maxZIndex.current += 1;
    setZIndices((prev) => {
      const newIndices = [...prev];
      newIndices[index] = maxZIndex.current;
      return newIndices;
    });
  };

  return (
    <div className="art-page">
      <header className="art-header">
        <button 
          className="back-link art-back" 
          onClick={() => onNavigate('/')}
          aria-label="Back to home"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <h1 className="art-title">My Art</h1>
        <p className="art-subtitle">A messy desk is a sign of a creative mind. Drag the pieces around.</p>
      </header>

      <a href="https://www.instagram.com/artist_feels_11/?hl=en" target="_blank" rel="noopener noreferrer" className="art-insta-icon" aria-label="Instagram">
        <Instagram size={24} strokeWidth={1.5} />
      </a>
      
      <div className="art-canvas">
        {ART_IMAGES.map((src, i) => (
          <DraggableImage
            key={i}
            src={src}
            delay={300 + (i * 350)} // Fall one by one like dropping a stack
            zIndex={zIndices[i]}
            bringToFront={() => bringToFront(i)}
          />
        ))}
      </div>
    </div>
  );
}
