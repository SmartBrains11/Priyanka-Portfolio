import { useEffect, useMemo, useRef, useState } from 'react';

type Stage = {
  number: string;
  title: string;
  headline: string;
  body: string[];
  methods: string[];
  takeaway: string;
  side: 'left' | 'right';
  progress: number;
};

const stages: Stage[] = [
  {
    number: '01', title: 'OBSERVE', headline: 'Before I design, I look.',
    body: ['I begin by understanding the world around the problem.', 'I look at the people using it, the environment they are in, the product they interact with, the business behind it and the things that already exist.', 'I gather context before forming conclusions.'],
    methods: ['Research', 'Observation', 'User understanding', 'Context mapping', 'Competitive exploration', 'Stakeholder understanding'],
    takeaway: 'Look closely before jumping to solutions.', side: 'left', progress: 0.12,
  },
  {
    number: '02', title: 'DEFINE', headline: 'I turn information into direction.',
    body: ['Once I understand the landscape, I look for the real problem hiding underneath the obvious one.', 'I organise what I have learned, identify patterns, uncover constraints and define what actually needs to be solved.', "The goal isn't to solve everything. It is to find the right thing to solve."],
    methods: ['Synthesis', 'Pattern finding', 'Problem framing', 'User needs', 'Business goals', 'Constraints', 'Opportunity areas'],
    takeaway: 'A well-defined problem creates better possibilities.', side: 'right', progress: 0.26,
  },
  {
    number: '03', title: 'QUESTION', headline: 'The brief tells me what to make. Questions tell me what to solve.',
    body: ['I challenge assumptions before accepting them.', 'Who is this really for? Why does this problem exist? What are we assuming? What could be simpler? What happens if we approach it differently?', 'Questioning helps me move beyond the first obvious answer.'],
    methods: ['How Might We questions', 'Assumption mapping', 'Root-cause thinking', 'Why / Why not', 'Opportunity framing', 'Critical thinking'],
    takeaway: 'Curiosity is part of the process.', side: 'left', progress: 0.40,
  },
  {
    number: '04', title: 'EXPLORE', headline: "I don't fall in love with the first idea.",
    body: ['I explore before I commit.', "Sketches, flows, wireframes, moodboards, visual experiments, information architecture and prototypes help me see possibilities that aren't obvious at the beginning.", 'Some ideas work. Some fail. Some lead to something better.'],
    methods: ['Ideation', 'Sketching', 'Information architecture', 'User flows', 'Wireframing', 'Visual exploration', 'Concept development'],
    takeaway: 'Explore widely. Commit deliberately.', side: 'right', progress: 0.55,
  },
  {
    number: '05', title: 'DESIGNER + ARTIST', headline: 'This is where the two sides of me meet.',
    body: ['Design gives me structure, purpose and problem-solving. Art gives me observation, emotion, composition, colour and the freedom to experiment.', "I don't switch between being a designer and an artist. I bring both into the room.", 'The way I see composition, colour, storytelling and detail through art influences the way I build digital experiences. It helps me think beyond function — and design with feeling.'],
    methods: [],
    takeaway: 'Different disciplines. One way of seeing.', side: 'left', progress: 0.70,
  },
  {
    number: '06', title: 'PROTOTYPE & TEST', headline: 'Ideas become real when they meet people.',
    body: ['I turn ideas into something tangible — flows, wireframes, prototypes and working experiences.', 'Then I put them in front of people. I observe what makes sense, what creates friction and what I may have overlooked.', "Feedback isn't the final step. It changes the design."],
    methods: ['Prototyping', 'Usability testing', 'User feedback', 'Iteration', 'Validation', 'Interaction design', 'Design refinement'],
    takeaway: 'Make it real. Learn from it. Make it better.', side: 'right', progress: 0.84,
  },
  {
    number: '07', title: 'EVOLVE', headline: 'The design is never the end of the thinking.',
    body: ['I refine, simplify and evolve the experience based on what I learn.', 'Sometimes the best design decision is adding something. Sometimes it is removing it.', 'Sometimes it means going back to the beginning and asking a better question. For me, design is a continuous loop of curiosity, making, learning and improving.'],
    methods: ['Iteration', 'Reflection', 'Measurement', 'Learning', 'Refinement', 'Continuous improvement'],
    takeaway: 'Good design evolves.', side: 'left', progress: 0.96,
  },
];

const PATH_D = 'M 280 200 C 750 280, 880 620, 580 880 C 280 1140, 120 1380, 360 1640 C 620 1900, 860 2180, 640 2480 C 420 2780, 160 2980, 330 3280 C 510 3580, 790 3740, 730 4040 C 670 4340, 380 4480, 270 4740 C 160 5000, 320 5200, 580 5380';

const STAGE_STOPS = [0, 0.12, 0.26, 0.40, 0.55, 0.70, 0.84, 0.96, 1.0];

function mapStageProgress(raw: number): number {
  for (let i = 0; i < STAGE_STOPS.length - 1; i++) {
    const lo = STAGE_STOPS[i];
    const hi = STAGE_STOPS[i + 1];
    if (raw >= lo && raw <= hi) {
      const segT = (raw - lo) / (hi - lo);
      const restRatio = 0.14;
      if (segT < restRatio) return lo;
      if (segT > 1 - restRatio) return hi;
      const t = (segT - restRatio) / (1 - 2 * restRatio);
      const eased = t * t * (3 - 2 * t);
      return lo + eased * (hi - lo);
    }
  }
  return raw;
}

function App() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ballPos, setBallPos] = useState({ xPct: 28, yPct: 3.6 });
  const [settleKey, setSettleKey] = useState(0);
  const [humanLean, setHumanLean] = useState(0);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    updateMotion();
    motionQuery.addEventListener('change', updateMotion);
    return () => motionQuery.removeEventListener('change', updateMotion);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      progressRef.current = 1;
      setProgress(1);
      if (pathRef.current) {
        const len = pathRef.current.getTotalLength();
        const pt = pathRef.current.getPointAtLength(len);
        setBallPos({ xPct: (pt.x / 1000) * 100, yPct: (pt.y / 5500) * 100 });
      }
      return;
    }
    let frame = 0;
    let lastSettledStage = -1;
    let prevProgress = 0;

    const update = () => {
      if (!journeyRef.current || !pathRef.current) {
        frame = requestAnimationFrame(update);
        return;
      }
      const bounds = journeyRef.current.getBoundingClientRect();
      const usable = Math.max(1, bounds.height - window.innerHeight);
      const raw = Math.min(1, Math.max(0, -bounds.top / usable));
      const target = mapStageProgress(raw);

      progressRef.current += (target - progressRef.current) * 0.075;
      const p = progressRef.current;

      const length = pathRef.current.getTotalLength();
      const point = pathRef.current.getPointAtLength(length * p);

      setProgress(p);
      setBallPos({ xPct: (point.x / 1000) * 100, yPct: (point.y / 5500) * 100 });

      const velocity = p - prevProgress;
      prevProgress = p;
      setHumanLean(Math.max(-12, Math.min(12, velocity * 400)));

      const settledStage = stages.findIndex(s => Math.abs(s.progress - p) < 0.018);
      if (settledStage !== -1 && settledStage !== lastSettledStage) {
        lastSettledStage = settledStage;
        setSettleKey(k => k + 1);
      }
      if (settledStage === -1) {
        lastSettledStage = -1;
      }

      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  const activeStage = useMemo(() => {
    let closest = 0;
    let minDist = Infinity;
    stages.forEach((s, i) => {
      const d = Math.abs(s.progress - progress);
      if (d < minDist) { minDist = d; closest = i; }
    });
    return closest;
  }, [progress]);

  const isArtistMode = stages[activeStage]?.number === '05';
  const traveled = progress;

  return (
    <main className={`page ${isArtistMode ? 'artist-mode' : ''}`}>
      <div className="grain" aria-hidden="true" />

      <header className="intro">
        <div className="intro-copy">
          <p className="eyebrow">Understand how I think</p>
          <h1>Inside the mind<br />behind the work.</h1>
          <div className="intro-rule" />
          <p>I don't start with pixels.<br />I start with understanding.</p>
          <p>Every project begins with questions — about people, context, business, technology and possibility.</p>
          <p>My process is not a straight line. It's a cycle of observing, questioning, exploring, making and learning.</p>
        </div>
        <div className="intro-note">Scroll to follow<br />an idea in motion <span>&#8595;</span></div>
      </header>

      <section className="journey" ref={journeyRef} aria-label="The seven stages of my design thinking process">
        <div className="stage-backdrop" aria-hidden="true"><span>01</span><span>07</span></div>

        <svg className="path-art" viewBox="0 0 1000 5500" preserveAspectRatio="none" aria-hidden="true">
          <path className="path-bg" d={PATH_D} vectorEffect="non-scaling-stroke" />
          <path
            ref={pathRef}
            className="path-progress"
            d={PATH_D}
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 - traveled }}
          />
        </svg>

        <div className="ball-wrapper" style={{ left: `${ballPos.xPct}%`, top: `${ballPos.yPct}%` }}>
          <div className="ball-settle" key={settleKey}>
            <div className="ball-circle">
              <div className="ball-highlight" />
            </div>
          </div>
        </div>

        <div
          className="human-wrapper"
          style={{ left: `${ballPos.xPct}%`, top: `${ballPos.yPct}%`, '--lean': `${humanLean}deg` } as React.CSSProperties}
        >
          <svg className="human-svg" viewBox="-50 -85 100 155" aria-hidden="true">
            <circle cx="0" cy="-58" r="13" fill="#1a2b28" />
            <path
              d="M -4 -44 L -16 -2 L -42 36 M -14 -4 L 16 18 L 38 10 M -16 -2 L 7 28"
              fill="none" stroke="#1a2b28" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="stages">
          {stages.map((stage, index) => (
            <article
              className={`stage stage-${index + 1} ${stage.side} ${index === activeStage ? 'is-active' : ''}`}
              key={stage.number}
            >
              <div className="stage-label"><span>{stage.number}</span><strong>{stage.title}</strong></div>
              <h2>{stage.headline}</h2>
              <div className="stage-body">{stage.body.map((para) => <p key={para}>{para}</p>)}</div>
              {stage.methods.length > 0 && (
                <div className="methods">{stage.methods.map((m) => <span key={m}>{m}</span>)}</div>
              )}
              <div className="stage-takeaway">{stage.takeaway}</div>
              {index === 4 && (
                <div className="art-marks" aria-hidden="true">
                  <i className="mark-rect" />
                  <i className="mark-line" />
                  <i className="mark-circle" />
                  <b>&#10033;</b>
                </div>
              )}
            </article>
          ))}
        </div>
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

export default App;
