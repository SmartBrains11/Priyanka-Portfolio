import React, { useEffect, useState } from 'react';
import './UnderstandHowIThink.css';
import { HoverPreview } from './HoverPreview';

type Props = {
  onNavigate?: (path: string) => void;
};

export default function UnderstandHowIThink({ onNavigate }: Props) {
  return (
    <main className="page">
      <div className="grain" aria-hidden="true" />

      <header className="intro">
        {onNavigate && (
          <button 
            onClick={() => onNavigate('/')} 
            className="back-btn"
          >
            ← Back to Room
          </button>
        )}
        <div className="intro-copy">
          <p className="eyebrow">Understand how I think</p>
          <h1>Inside the mind<br />behind the work.</h1>
          <div className="intro-rule" />
          <p>I don't start with pixels.<br />I start with understanding.</p>
          <p>Every project begins with questions — about people, context, business, technology and possibility.</p>
          <p>My process is not a straight line. It's a cycle of observing, questioning, exploring, making and learning.</p>
        </div>
      </header>

      <section className="editorial-journey" aria-label="The core design philosophy">
        <p className="large-editorial-text">
          I{' '}
          <HoverPreview 
            title="OBSERVE" 
            list="Research · User understanding · Context · Competition · Stakeholders"
            explanation="I look at the people, product, business and environment before forming conclusions."
          >
            observe
          </HoverPreview>
          {' '}before I design,{' '}
          <HoverPreview 
            title="DEFINE" 
            list="Synthesis · Patterns · Problem framing · User needs · Business goals · Constraints"
            explanation="I turn scattered information into a clear problem worth solving."
          >
            define
          </HoverPreview>
          {' '}what truly needs solving,{' '}
          <HoverPreview 
            title="QUESTION" 
            list="Why? · How might we? · Assumptions · Root causes · Opportunities"
            explanation="I challenge the obvious brief to uncover what is actually worth solving."
          >
            question
          </HoverPreview>
          {' '}what others might overlook,{' '}
          <HoverPreview 
            title="EXPLORE" 
            list="Ideation · Sketching · User flows · Information architecture · Wireframes · Visual exploration"
            explanation="I explore multiple possibilities before committing to a direction."
          >
            explore
          </HoverPreview>
          {' '}possibilities without settling too soon, bring the{' '}
          <HoverPreview 
            title="DESIGNER + ARTIST" 
            list="Composition · Colour · Emotion · Storytelling · Observation · Visual expression"
            explanation="Design gives me structure. Art gives me another way of seeing."
          >
            designer + artist
          </HoverPreview>
          {' '}in me together,{' '}
          <HoverPreview 
            title="PROTOTYPE & TEST" 
            list="Prototypes · Interaction · Usability · Feedback · Validation · Iteration"
            explanation="I make ideas tangible, put them in front of people, learn from what happens, and refine."
          >
            prototype & test
          </HoverPreview>
          {' '}ideas in the real world, and{' '}
          <HoverPreview 
            title="EVOLVE" 
            list="Iteration · Reflection · Refinement · Learning · Improvement"
            explanation="I keep questioning, simplifying and improving even after the design feels finished."
          >
            evolve
          </HoverPreview>
          {' '}the experience through everything I learn.
        </p>
      </section>

      <footer className="ending">
        <p className="eyebrow">The thinking behind the work</p>
        <div className="thinking-list">
          Curiosity <span>&#8594;</span> Understanding <span>&#8594;</span> Questioning <span>&#8594;</span>
          <br className="desktop-break" /> Exploration <span>&#8594;</span> Creation <span>&#8594;</span> Testing <span>&#8594;</span> Evolution
        </div>
        <div className="ending-rule" />
        <p className="final-line">The final design is what you see.<br /><em>The thinking behind it is where the real work happened.</em></p>
        <p className="closing-loop">CURIOUS <span>&#8594;</span> QUESTION <span>&#8594;</span> EXPLORE <span>&#8594;</span> CREATE <span>&#8594;</span> REFINE</p>
      </footer>
    </main>
  );
}
