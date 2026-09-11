import React, { useState, useEffect, useRef } from 'react';
import './HoverPreview.css';

type HoverPreviewProps = {
  title: string;
  list?: string;
  explanation: string;
  children: React.ReactNode;
};

export function HoverPreview({ title, list, explanation, children }: HoverPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click for mobile
  useEffect(() => {
    if (!isOpen) return;
    
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        triggerRef.current && !triggerRef.current.contains(event.target as Node) &&
        panelRef.current && !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Adjust position if it flows off-screen
  useEffect(() => {
    if (isOpen && panelRef.current && triggerRef.current) {
      const rect = panelRef.current.getBoundingClientRect();
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const offset = 10;
      
      let newTop = triggerRect.top - rect.height - offset;
      let newLeft = triggerRect.left + (triggerRect.width / 2) - (rect.width / 2);
      
      // Prevent off-screen
      if (newTop < 10) newTop = triggerRect.bottom + offset; // show below if not enough room above
      if (newLeft < 10) newLeft = 10;
      if (newLeft + rect.width > window.innerWidth - 10) newLeft = window.innerWidth - rect.width - 10;
      
      panelRef.current.style.top = `${newTop}px`;
      panelRef.current.style.left = `${newLeft}px`;
    }
  }, [isOpen]);

  const toggle = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsOpen(false);
    }
  };

  return (
    <span className="hover-preview-container">
      <span
        ref={triggerRef}
        role="button"
        tabIndex={0}
        className={`hover-trigger-text ${isOpen ? 'active' : ''}`}
        onClick={toggle}
        onTouchEnd={toggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-expanded={isOpen}
      >
        {children}
      </span>

      {isOpen && (
        <div 
          className="hover-panel"
          ref={panelRef}
          role="tooltip"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="hover-panel-title">{title}</div>
          {list && <div className="hover-panel-list">{list}</div>}
          <div className="hover-panel-body">
            <p>{explanation}</p>
          </div>
        </div>
      )}
    </span>
  );
}
