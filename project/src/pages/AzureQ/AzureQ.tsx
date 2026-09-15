import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projects, Project } from '@/data/projects';
import './AzureQ.css';

interface AzureQProps {
  project: Project;
  onNavigate: (path: string) => void;
}

// Visual Placeholder Component
const Placeholder = ({ id, aspectRatio = '16/9', label }: { id: string; aspectRatio?: string; label?: string }) => (
  <div className={`azure-placeholder ${id}`} style={{ aspectRatio }}>
    <span className="placeholder-label">{label || `[${id.toUpperCase().replace(/-/g, ' ')}]`}</span>
  </div>
);

export default function AzureQ({ project, onNavigate }: AzureQProps) {
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
    { id: 'overview', label: '01. Project Overview' },
    { id: 'metrics', label: '02. Success Metrics' },
    { id: 'research', label: '03. Research & Discovery' },
    { id: 'constraints', label: '04. Project Constraints' },
    { id: 'affinity', label: '05. Affinity Map' },
    { id: 'journey', label: '06. Journey Mapping' },
    { id: 'flow', label: '07. User Flow' },
    { id: 'strategy', label: '08. Insights & Strategy' },
    { id: 'ia', label: '09. Information Architecture' },
    { id: 'decisions', label: '10. Key Design Decisions' },
    { id: 'solutions', label: '11. Other Solutions' },
    { id: 'wireframes', label: '12. Wireframes' },
    { id: 'ui', label: '13. Design System' },
    { id: 'principles', label: '14. Interaction Principles' },
    { id: 'solution', label: '15. Final Interfaces' },
    { id: 'validation', label: '16. Validation' },
    { id: 'before-after', label: '17. Before vs After' },
    { id: 'outcome', label: '18. Impact' },
    { id: 'learnings', label: '19. Reflection' },
  ];

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const previous = projects[currentIndex - 1];
  const next = projects[currentIndex + 1];

  return (
    <article className="azure-case-study">
      <button className="azure-back-link" type="button" onClick={() => onNavigate('/projects')}>
        <ChevronLeft size={17} /> Back to Projects
      </button>

      {/* HERO SECTION */}
      <header className="azure-hero">
        <div className="azure-hero-content">
          <h1>Azure Q</h1>
          <p className="azure-hero-subtitle">Complete Product Design</p>
          <h2 className="azure-hero-tagline">500 test cases. One dropdown. No status. No context. We fixed that.</h2>
          <p className="azure-hero-intro">
            Redesigning a complex automation testing platform from 0 — transforming a tool QA teams feared into one they actually enjoy using.
          </p>
          
          <div className="azure-metadata">
            <div className="meta-item">
              <strong>Role</strong>
              <span>UI/UX Designer (Solo)</span>
            </div>
            <div className="meta-item">
              <strong>Type</strong>
              <span>Full Product Redesign</span>
            </div>
            <div className="meta-item">
              <strong>Platform</strong>
              <span>Web App (B2B / Enterprise)</span>
            </div>
            <div className="meta-item">
              <strong>Source</strong>
              <span>NoGrunt → AssureQ</span>
            </div>
            <div className="meta-item">
              <strong>Delivered</strong>
              <span>Test Studio redesign, Test Suites module, Design System, Developer Handoff documentation</span>
            </div>
            <div className="meta-item">
              <strong>Timeline</strong>
              <span>8 Weeks</span>
            </div>
          </div>
        </div>
        <img src="/images/AzzureQ/[AZURE Q — HERO DASHBOARD].png" alt="Azure Q Hero Dashboard" className="azure-image" />
      </header>

      <div className="azure-layout">
        {/* Sticky Navigation */}
        <nav className="azure-sticky-nav">
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

        <main className="azure-content">
          
          {/* PROJECT OVERVIEW */}
          <section id="overview" ref={(el) => (sectionRefs.current[0] = el)}>
            <div className="section-header">
              <span className="section-number">01</span>
              <h2>Project Overview</h2>
            </div>
            <h3>1.1 WHAT IS ASSUREQ ?</h3>
            <p>
              AssureQ is an enterprise automation testing platform used by QA teams to manage test cases and execute testing workflows.
            </p>
            <p>
              Its previous version, NoGrunt, contained all the necessary features but suffered from a confusing user experience that slowed users down. My role was to redesign the platform and make testing simpler, faster, and more intuitive.
            </p>
            <div className="azure-role-timeline-wrapper">
              <div className="azure-role-orbit">
                <h4>1.2 MY ROLE !!</h4>
                <div className="orbit-diagram">
                  <div className="orbit-ring r1"></div>
                  <div className="orbit-ring r2"></div>
                  <div className="orbit-ring r3"></div>
                  <div className="orbit-node n1"><span>User Research</span></div>
                  <div className="orbit-node n2"><span>Information Architecture</span></div>
                  <div className="orbit-node n3"><span>Interaction Design</span></div>
                  <div className="orbit-node n4"><span>Design System</span></div>
                  <div className="orbit-node n5"><span>High Fidelity UI</span></div>
                  <div className="orbit-node n6"><span>Developer Handoff</span></div>
                </div>
              </div>

              <div className="azure-timeline-chart">
                <div className="timeline-header">
                  <h4>1.3 TIMELINE</h4>
                  <span>8 Weeks</span>
                </div>
                <div className="timeline-grid">
                  <div className="week-col" style={{gridColumn: 1, animationDelay: '0.1s'}}><div className="week-bar">Week - 1</div><span>Discovery</span></div>
                  <div className="week-col" style={{gridColumn: 2, marginTop: '2.5rem', animationDelay: '0.2s'}}><div className="week-bar">Week - 2</div><span>Research</span></div>
                  <div className="week-col" style={{gridColumn: 3, marginTop: '5rem', animationDelay: '0.3s'}}><div className="week-bar">Week - 3</div><span>Information Architecture</span></div>
                  <div className="week-col" style={{gridColumn: 4, marginTop: '7.5rem', animationDelay: '0.4s'}}><div className="week-bar">Week - 4</div><span>User Flows</span></div>
                  <div className="week-col" style={{gridColumn: 5, marginTop: '10rem', animationDelay: '0.5s'}}><div className="week-bar">Week - 5</div><span>Wireframes &<br/>Exploration</span></div>
                  <div className="week-col" style={{gridColumn: 6, marginTop: '12.5rem', animationDelay: '0.6s'}}><div className="week-bar">Week - 6</div><span>Visual Design<br/>System</span></div>
                  <div className="week-col" style={{gridColumn: 7, marginTop: '15rem', animationDelay: '0.7s'}}><div className="week-bar">Week - 7</div><span>Validation &<br/>Iteration</span></div>
                  <div className="week-col" style={{gridColumn: 8, marginTop: '17.5rem', animationDelay: '0.8s'}}><div className="week-bar">Week - 8</div><span>Handoff &<br/>Documentation</span></div>
                </div>
              </div>
            </div>
          </section>

          {/* THE PROBLEM */}
          <h3 style={{ marginTop: "3rem" }}>1.4 CHALLENGE</h3>
            <p className="azure-highlight-text">
              How might we help QA teams find, organize, and execute test cases faster without overwhelming them with information?
            </p>



          {/* SUCCESS METRICS */}
          <section id="metrics" ref={(el) => (sectionRefs.current[1] = el)}>
            <div className="section-header">
              <span className="section-number">02</span>
              <h2>SUCCESS METRICS</h2>
            </div>
            <p>To determine whether the redesign was successful, I defined four measurable goals:</p>
            <p>To determine whether the redesign was successful, I defined four measurable goals:</p>
            <div className="azure-goals">
              <div className="goal-card"><strong>Goal 1:</strong> Reduce time required to locate a specific test case.</div>
              <div className="goal-card"><strong>Goal 2:</strong> Improve visibility of hierarchy relationships.</div>
              <div className="goal-card"><strong>Goal 3:</strong> Reduce navigation confusion.</div>
              <div className="goal-card"><strong>Goal 4:</strong> Increase user confidence during task execution.</div>
            </div>
          </section>

          {/* RESEARCH */}
          <section id="research" ref={(el) => (sectionRefs.current[2] = el)}>
            <div className="section-header">
              <span className="section-number">03</span>
              <h2>RESEARCH & DISCOVERY</h2>
            </div>
            <p className="azure-research-subtitle">Understanding the problem before touching pixels</p>
            <p className="azure-research-text">I started with three types of research of NoGrunt:</p>
            <div className="azure-research-pills">
              <span className="research-pill">stakeholder interviews</span>
              <span className="research-pill">user observation sessions</span>
              <span className="research-pill">heuristic audit</span>
            </div>
            <h3>3.1 USER RESEARCH</h3>
            <p>Before redesigning screens, I investigated how information architecture and navigation patterns impacted daily QA workflows.</p>
            <h4>User Personas</h4>
            <img src="/images/AzzureQ/[AZURE Q — USER PERSONAS DIAGRAM].png" alt="User Personas Diagram" className="azure-image" />
            <div className="azure-persona-details">
              <div className="persona">
                <h4>QA Engineer</h4>
                <p><strong>Primary user · daily usage</strong></p>
                <p>Needs to find and run test cases fast. Spends 3-5 minutes locating a single test case, causing execution delays across daily testing workflows. Hates scrolling through dropdown lists with 500+ items.</p>
              </div>
              <div className="persona">
                <h4>Test Lead</h4>
                <p><strong>Manager · weekly usage</strong></p>
                <p>Needs overview of suite structure and coverage. Can't see how many test cases are inside suites without drilling in one by one.</p>
              </div>
              <div className="persona">
                <h4>Product Manager</h4>
                <p><strong>Stakeholder · ad-hoc usage</strong></p>
                <p>Needs to review test reports and understand pass/fail status without being a QA expert. Current reports are too technical at a glance.</p>
              </div>
            </div>

            <blockquote className="azure-quote">
              "I open the module dropdown, scroll through everything, lose my place, and start again. This happened every single session"
              <cite>— Observed in 3 out of 5 user sessions, QA Engineer (Prasanthi)</cite>
            </blockquote>

            <h3>3.2 RESEARCH FINDINGS</h3>
            <p>Before redesigning screens, I investigated how information architecture and navigation patterns impacted daily QA workflows.</p>
            
            <img src="/images/AzzureQ/[AZURE Q — RESEARCH FINDINGS VISUAL].png" alt="Research Findings Visual" className="azure-image" />

            <h4>Heuristic Audit</h4>
            <p>The heuristic audit surfaced 4 critical violations across both modules:</p>
            <ul className="azure-heuristics-list">
              <li><strong>Visibility of system status:</strong> No test count, no last run date, no status on suite cards.</li>
              <li><strong>Match between system and mental model:</strong> Dropdown-first navigation doesn't match how QA teams think about test hierarchies.</li>
              <li><strong>Recognition over recall:</strong> Users had to remember module names and locations with no visible cues.</li>
              <li><strong>Aesthetic and minimalist design:</strong> Every screen showed all possible actions simultaneously.</li>
            </ul>

            </section>

          <section id="constraints" ref={(el) => (sectionRefs.current[3] = el)}>
            <div className="section-header">
              <span className="section-number">04</span>
              <h2>PROJECT CONSTRAINTS</h2>
            </div>
            <div className="azure-constraints">
              <div className="constraint">
                <h4>Technical Constraints</h4>
                <p>Existing backend architecture could not be modified. Existing test case relationships had to remain intact. Navigation improvements had to work with current data structures.</p>
              </div>
              <div className="constraint">
                <h4>Business Constraints</h4>
                <p>Redesign had to avoid disrupting active QA workflows. Solution needed to support both experienced and new QA users. Scope was limited to navigation and discoverability improvements.</p>
              </div>
              <div className="constraint">
                <h4>Design Constraint</h4>
                <p>Improve usability without increasing interface complexity.</p>
              </div>
            </div>
          </section>

          {/* INSIGHTS */}
          <section id="affinity" ref={(el) => (sectionRefs.current[4] = el)}>
            <div className="section-header">
              <span className="section-number">05</span>
              <h2>AFFINITY MAP</h2>
            </div>
            <p>Turning research observations into actionable design insights.</p>
            
            <div className="azure-affinity-map">
              <div className="affinity-col">
                <h5>Navigation Friction</h5>
                <div className="affinity-card">Lost location</div>
                <div className="affinity-card">No breadcrumbs</div>
                <div className="affinity-card">Memory reliance</div>
                <div className="affinity-card">Inconsistent paths</div>
              </div>
              <div className="affinity-col">
                <h5>Discoverability</h5>
                <div className="affinity-card">Large dropdowns</div>
                <div className="affinity-card">No search visibility</div>
                <div className="affinity-card">Hidden metadata</div>
                <div className="affinity-card">Hard to find TCs</div>
              </div>
              <div className="affinity-col">
                <h5>Hidden Hierarchy</h5>
                <div className="affinity-card">Flat folder cards</div>
                <div className="affinity-card">No nested visibility</div>
                <div className="affinity-card">No counts visible</div>
                <div className="affinity-card">Poor structure</div>
              </div>
              <div className="affinity-col">
                <h5>Cognitive Overload</h5>
                <div className="affinity-card">Too many choices</div>
                <div className="affinity-card">Simultaneous decisions</div>
                <div className="affinity-card">Context switching</div>
                <div className="affinity-card">Information overload</div>
              </div>
              <div className="affinity-col">
                <h5>Workflow Efficiency</h5>
                <div className="affinity-card">Repetitive actions</div>
                <div className="affinity-card">Extra clicks</div>
                <div className="affinity-card">Scattered actions</div>
                <div className="affinity-card">Slower execution</div>
              </div>
            </div>

            <blockquote className="azure-quote">
              "Patterns from the affinity map directly shaped which journey stages we mapped in depth."
            </blockquote>

            </section>

          <section id="strategy" ref={(el) => (sectionRefs.current[7] = el)}>
            <div className="section-header">
              <span className="section-number">08</span>
              <h2>INSIGHTS → DESIGN STRATEGY</h2>
            </div>
            <div className="azure-strategy-table">
              <div className="strategy-row header">
                <div>Research Finding</div>
                <div>Design Response</div>
              </div>
              <div className="strategy-row">
                <div>Users lost location</div>
                <div>→ Breadcrumbs</div>
              </div>
              <div className="strategy-row">
                <div>Hidden hierarchy</div>
                <div>→ Two-panel navigator</div>
              </div>
              <div className="strategy-row">
                <div>Large dropdowns</div>
                <div>→ Dedicated TC explorer</div>
              </div>
              <div className="strategy-row">
                <div>Decision overload</div>
                <div>→ Progressive workflow</div>
              </div>
              <div className="strategy-row">
                <div>Hidden metadata</div>
                <div>→ Context-rich lists</div>
              </div>
            </div>
          </section>

          {/* USER JOURNEY / FLOW */}
          <section id="journey" ref={(el) => (sectionRefs.current[5] = el)}>
            <div className="section-header">
              <span className="section-number">06</span>
              <h2>JOURNEY MAPPING</h2>
            </div>
            
            <h3>Understanding the Existing Test Execution Workflow</h3>
            <p>To identify where users experienced friction, I mapped the journey of a QA Engineer while locating and executing a test case in NoGrunt.</p>
            
            <div className="azure-journey-table-wrapper">
              <table className="azure-journey-table">
                <thead>
                  <tr>
                    <th>Stage</th>
                    <th>User Action</th>
                    <th>Experience</th>
                    <th>Cognitive Overload</th>
                    <th>Opportunity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="journey-row">
                    <td><strong>Enter Test Studio</strong></td>
                    <td>Open testing module</td>
                    <td><span className="exp-badge neutral">Clear starting point</span></td>
                    <td>None</td>
                    <td>Maintain simplicity</td>
                  </tr>
                  <tr className="journey-row">
                    <td><strong>Select Application</strong></td>
                    <td>Choose application from dropdown</td>
                    <td><span className="exp-badge positive">Easy</span></td>
                    <td>None</td>
                    <td>Keep existing pattern</td>
                  </tr>
                  <tr className="journey-row">
                    <td><strong>Select Module</strong></td>
                    <td>Browse module list</td>
                    <td><span className="exp-badge neutral">Manageable</span></td>
                    <td className="warning-text">Long lists in some cases</td>
                    <td>Better organization</td>
                  </tr>
                  <tr className="journey-row">
                    <td><strong>Find Test Case</strong></td>
                    <td>Search through 500+ test cases in dropdown</td>
                    <td><span className="exp-badge negative">Frustrating</span></td>
                    <td className="warning-text">Poor discoverability, information overload</td>
                    <td><strong>Dedicated test case explorer</strong></td>
                  </tr>
                  <tr className="journey-row">
                    <td><strong>Verify Selection</strong></td>
                    <td>Check if selected test case is correct</td>
                    <td><span className="exp-badge negative">Uncertain</span></td>
                    <td className="warning-text">No preview or metadata</td>
                    <td>Show context before selection</td>
                  </tr>
                  <tr className="journey-row">
                    <td><strong>Execute Test Case</strong></td>
                    <td>Open and start execution</td>
                    <td><span className="exp-badge neutral">Functional</span></td>
                    <td className="warning-text">Too many steps before reaching here</td>
                    <td>Streamline workflow</td>
                  </tr>
                  <tr className="journey-row">
                    <td><strong>Repeat Process</strong></td>
                    <td>Navigate back and repeat</td>
                    <td><span className="exp-badge negative">Time consuming</span></td>
                    <td className="warning-text">Repetitive navigation</td>
                    <td>Faster access to related test cases</td>
                  </tr>
                </tbody>
              </table>
            </div>

            </section>

          <section id="flow" ref={(el) => (sectionRefs.current[6] = el)}>
            <div className="section-header">
              <span className="section-number">07</span>
              <h2>USER FLOW</h2>
            </div>
            <p>Mapping the journeys that mattered most. I identified three critical user flows that accounted for 80% of daily usage. Each was redesigned around progressive disclosure — commit to context one step at a time.</p>
            <div className="flow-block">
              <h4>User Flow A — (Test Execution)</h4>
              <p>Help QA teams locate and execute a test case with minimal navigation effort.</p>
              <img src="/images/AzzureQ/[AZURE Q — USER FLOW A].png" alt="User Flow A" className="azure-image" />
            </div>

            <div className="flow-block">
              <h4>User Flow B — (Test Suite Navigation)</h4>
              <p>Make suite hierarchy visible while reducing unnecessary exploration.</p>
              <img src="/images/AzzureQ/[AZURE Q — USER FLOW B].png" alt="User Flow B" className="azure-image" />
            </div>
          </section>

          {/* IDEATION & IA */}
          <section id="ia" ref={(el) => (sectionRefs.current[8] = el)}>
            <div className="section-header">
              <span className="section-number">09</span>
              <h2>INFORMATION ARCHITECTURE</h2>
            </div>
            <p>Mapping the system before redesigning it. Before any wireframes, I mapped the complete IA of NoGrunt — every screen, every entity relationship, every nav path. This revealed structural problems I couldn't have found from screenshots alone.</p>
            
            <div className="azure-ia-diagram">
              <div className="ia-root">
                <div className="ia-node root-node">Overview & Navigation</div>
              </div>
              <div className="ia-branches">
                <div className="ia-branch">
                  <div className="ia-node">Test Studio</div>
                  <div className="ia-line"></div>
                  <div className="ia-node">Select Application & Module</div>
                  <div className="ia-line"></div>
                  <div className="ia-node">Test Case Lists</div>
                  <div className="ia-line"></div>
                  <div className="ia-node">Test Step Lists</div>
                </div>
                <div className="ia-branch">
                  <div className="ia-node">Test Suites</div>
                  <div className="ia-line"></div>
                  <div className="ia-node">Select Application</div>
                  <div className="ia-line"></div>
                  <div className="ia-node">Test Suites List</div>
                  <div className="ia-line"></div>
                  <div className="ia-node">Test Cases & Nested Suites</div>
                </div>
                <div className="ia-branch">
                  <div className="ia-node">Suite Reports</div>
                  <div className="ia-line"></div>
                  <div className="ia-node">Report lists</div>
                  <div className="ia-line"></div>
                  <div className="ia-node">Run detail</div>
                </div>
                <div className="ia-branch">
                  <div className="ia-node">Impact Analysis</div>
                  <div className="ia-line"></div>
                  <div className="ia-node">Change map</div>
                  <div className="ia-line"></div>
                  <div className="ia-node">Affected TCs</div>
                </div>
              </div>
            </div>
            
            <div className="insight-card">
              <h4>Key Insight</h4>
              <ul>
                <li>The problem wasn't missing features — NoGrunt had everything QA teams needed.</li>
                <li>The problem was that features were organized around system logic, not user workflows.</li>
                <li>Users had to learn the system's structure to do their job. The redesign flipped this: structure now follows how QA engineers actually think and work.</li>
              </ul>
            </div>

            </section>

          <section id="decisions" ref={(el) => (sectionRefs.current[9] = el)}>
            <div className="section-header">
              <span className="section-number">10</span>
              <h2>KEY DESIGN DECISIONS</h2>
            </div>
            <p>A deeper look into the architectural and user experience choices made during the product development process.</p>
            
            <div className="decision-block">
              <h4>Decision 01: Move TC selection to dedicated screen.</h4>
              <p><strong>Problem:</strong> 500+ TCs inside dropdown.</p>
              <p><strong>Reason:</strong> Provides visibility, pagination, filtering, status, and execution context.</p>
              <div className="alternatives">
                <p><strong>Alternatives Explored:</strong></p>
                <ul>
                  <li>❌ Option A: Searchable Dropdown (Still overwhelming)</li>
                  <li>❌ Option B: Grouped Dropdown (Doesn't scale)</li>
                  <li>✅ <strong>Option C: Dedicated Screen (Chosen)</strong></li>
                </ul>
              </div>
              <img src="/images/AzzureQ/[AZURE Q — DECISION 01 UI EXAMPLES].png" alt="Decision 01 UI Examples" className="azure-image" />
            </div>

            <div className="decision-block">
              <h4>Decision 02: Two Panel Suite Navigator.</h4>
              <p><strong>Problem:</strong> Users couldn't understand suite hierarchy.</p>
              <p><strong>Reason:</strong> Matches mental model of file explorer.</p>
              <div className="alternatives">
                <p><strong>Alternatives Explored:</strong></p>
                <ul>
                  <li>❌ Option A: Folder Cards (Hidden structure)</li>
                  <li>❌ Option B: Tree Table (Complex)</li>
                  <li>✅ <strong>Option C: Two Panel Layout (Chosen)</strong></li>
                </ul>
              </div>
              <img src="/images/AzzureQ/[AZURE Q — DECISION 02 UI EXAMPLES].png" alt="Decision 02 UI Examples" className="azure-image" />
            </div>

            <div className="decision-block">
              <h4>Decision 03: Status Pills over Text Labels.</h4>
              <p><strong>Problem:</strong> Test case health was invisible. Users couldn't scan pass/fail without opening each case.</p>
              <p><strong>Reason:</strong> Instant visual scanning. Color + label = accessible and fast. QA engineers can review 20 cases in seconds.</p>
              <div className="alternatives">
                <p><strong>Alternatives Explored:</strong></p>
                <ul>
                  <li>❌ Option A: Text labels (Pass/Fail/Running) (Slow to scan)</li>
                  <li>❌ Option B: Color-coded rows (Accessibility issues)</li>
                  <li>✅ <strong>Option C: Status Pills (Chosen)</strong></li>
                </ul>
              </div>
              <img src="/images/AzzureQ/[AZURE Q — DECISION 03 UI EXAMPLES].png" alt="Decision 03 UI Examples" className="azure-image" />
            </div>

            </section>

          <section id="solutions" ref={(el) => (sectionRefs.current[10] = el)}>
            <div className="section-header">
              <span className="section-number">11</span>
              <h2>WHY NOT OTHER SOLUTIONS?</h2>
            </div>
            <div className="decision-block">
              <ul>
                <li><strong>Why We Didn't Use Global Search:</strong> Although search would improve discoverability, it would not solve the underlying hierarchy problem. Users still needed to understand relationships between suites, modules, and test cases.</li>
                <li><strong>Why We Didn't Keep Dropdown Navigation:</strong> Even with search and grouping, dropdowns continued to hide context and scale poorly as datasets grew.</li>
                <li><strong>Why Dedicated Views Won:</strong> Dedicated views provided visibility, metadata, filtering, and progressive navigation while remaining scalable.</li>
              </ul>
            </div>
          </section>

          {/* WIREFRAMES */}
          <section id="wireframes" ref={(el) => (sectionRefs.current[11] = el)}>
            <div className="section-header">
              <span className="section-number">12</span>
              <h2>WIREFRAMES</h2>
            </div>
            <div className="azure-wireframes-grid">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <img 
                  key={num} 
                  src={`/images/AzzureQ/wireframe ${num}.png`} 
                  alt={`Wireframe ${num}`} 
                  className="azure-wireframe-item" 
                />
              ))}
            </div>
          </section>

          {/* UI DESIGN & SYSTEM */}
          <section id="ui" ref={(el) => (sectionRefs.current[12] = el)}>
            <div className="section-header">
              <span className="section-number">13</span>
              <h2>DESIGN SYSTEM</h2>
            </div>
            <h3>13.1 GRIDS</h3>
            <img src="/images/AzzureQ/[AZURE Q — GRIDS].png" alt="Grids" className="azure-image" />
            <h3>13.2 FONT</h3>
            <img src="/images/AzzureQ/[AZURE Q — FONT].png" alt="Font" className="azure-image" />
            <h3>13.3 COLOR PALETTE</h3>
            <p>The problem with the old colours: NoGrunt used dark orange and dark blue heavily across the entire interface. The screens felt visually heavy. What we changed: We shifted to a white-dominant theme with blue and orange used intentionally.</p>
            <img src="/images/AzzureQ/[AZURE Q — TYPOGRAPHY, COLORS & LOGO].png" alt="Typography, Colors & Logo" className="azure-image" />
            
            <h3>13.4 LOGO</h3>
            <img src="/images/AzzureQ/[AZURE Q — LOGO].png" alt="Logo" className="azure-image" />
            <h3>13.5 BUTTONS</h3>
            <img src="/images/AzzureQ/[AZURE Q — BUTTONS].png" alt="Buttons" className="azure-image" />
            <h3>13.6 COMPONENTS</h3>
            <img src="/images/AzzureQ/[AZURE Q — COMPONENTS PREVIEW].png" alt="Components Preview" className="azure-image" />
          </section>

          {/* FEATURES / INTERACTION PRINCIPLES */}
          <section id="principles" ref={(el) => (sectionRefs.current[13] = el)}>
            <div className="section-header">
              <span className="section-number">14</span>
              <h2>INTERACTION PRINCIPLES</h2>
            </div>
            <p>The 3 principles that guided every design decision:</p>
            
            <div className="principles-list">
              <div className="principle-card">
                <h4>1. Progressive Disclosure</h4>
                <p>Show users one decision at a time. App → Module → Test Case → Steps. Each screen has exactly one job.</p>
              </div>
              <div className="principle-card">
                <h4>2. Visible Hierarchy</h4>
                <p>If a user can't see the structure without clicking, the structure is broken. Every count, every nesting level, every status is surfaced by default.</p>
              </div>
              <div className="principle-card">
                <h4>3. Context-Scoped Actions</h4>
                <p>Actions available at each screen level match only what's relevant at that moment. No global action menus. No decision overload.</p>
              </div>
            </div>
          </section>

          {/* FINAL SOLUTION */}
          <section id="solution" ref={(el) => (sectionRefs.current[14] = el)}>
            <div className="section-header">
              <span className="section-number">15</span>
              <h2>FINAL INTERFACES VISUALS</h2>
            </div>
            
            <div className="solution-block">
              <h3>Module 1: Test Studio</h3>
              <p>The NoGrunt Test Studio crammed Application, Module, and Test Scenario selection into a single screen above a flat list of steps.</p>
              <img src="/images/AzzureQ/[AZURE Q — TEST STUDIO BEFORE VS AFTER VISUAL].png" alt="Test Studio Before Vs After Visual" className="azure-image" />
            </div>

            <div className="solution-block">
              <h3>Module 2: Test Suites</h3>
              <p>Making hierarchy visible at last. Test suites were flat folder icon cards. You had no idea how many test cases were inside, or whether nested suites existed.</p>
              <img src="/images/AzzureQ/[AZURE Q — TEST SUITES BEFORE VS AFTER VISUAL].png" alt="Test Suites Before Vs After Visual" className="azure-image" />
            </div>
          </section>

          {/* OUTCOME */}
          <section id="validation" ref={(el) => (sectionRefs.current[15] = el)}>
            <div className="section-header">
              <span className="section-number">16</span>
              <h2>VALIDATION</h2>
            </div>
            <p>Testing whether the redesign actually solved the problem. Before finalizing the redesign, I conducted internal usability validation sessions with QA stakeholders to evaluate whether the new workflow reduced navigation effort and improved task completion.</p>

            <h3>16.1 TASK GIVEN</h3>
            <div className="validation-task">
              Locate and execute a specific test case (TC-031) within the platform.
            </div>

            <h3>16.2 RESULT</h3>
            <div className="results-table">
              <div className="results-header">
                <div>Metric</div>
                <div>Before (NoGrunt)</div>
                <div>After (AssureQ)</div>
              </div>
              <div className="results-row">
                <div>Time To Locate & Execute TC-031</div>
                <div className="bad">4m 12s</div>
                <div className="good">58s</div>
              </div>
              <div className="results-row">
                <div>Navigation Steps</div>
                <div>Multiple dropdown selections</div>
                <div>Progressive workflow</div>
              </div>
              <div className="results-row">
                <div>Hierarchy Visibility</div>
                <div>Hidden</div>
                <div>Visible</div>
              </div>
              <div className="results-row">
                <div>User Confidence</div>
                <div className="bad">Low</div>
                <div className="good">High</div>
              </div>
            </div>

            </section>

          <section id="before-after" ref={(el) => (sectionRefs.current[16] = el)}>
            <div className="section-header">
              <span className="section-number">17</span>
              <h2>BEFORE VS AFTER</h2>
            </div>
            <Placeholder id="azure-q-before-after-path" label="[AZURE Q — BEFORE VS AFTER TANGLED PATH VISUAL]" />
          </section>

            <div className="outcomes-grid">
              <div className="outcome-col">
                <h3>16.3 KEY OBSERVATIONS</h3>
                <ul>
                  <li>Users spent significantly less time searching for test cases.</li>
                  <li>Hierarchical relationships were immediately understandable.</li>
                  <li>Reduced confusion during navigation and task execution.</li>
                  <li>Participants completed tasks with greater confidence and fewer errors.</li>
                  <li>The dedicated Test Case List improved discoverability and workflow clarity.</li>
                </ul>
              </div>
              <div className="outcome-col">
                <h3>16.4 VALIDATION INSIGHT</h3>
                <p>The redesign confirmed that the primary challenge was not test execution itself, but the effort required to locate and navigate to the correct test case.</p>
              </div>
            </div>



          <section id="outcome" ref={(el) => (sectionRefs.current[17] = el)}>
            <div className="section-header">
              <span className="section-number">18</span>
              <h2>IMPACT</h2>
            </div>
            <h3>18.1 Results that validated every decision</h3>
            <p>The redesign focused on improving discoverability, hierarchy visibility, and workflow efficiency across the platform.</p>
            <h3>18.2 Feedbacks</h3>
            <div className="feedback-quotes">
              <blockquote className="azure-quote">
                "Finding the right test case became significantly easier."
                <cite>— QA Engineer</cite>
              </blockquote>
              <blockquote className="azure-quote">
                "The suite hierarchy finally made sense."
                <cite>— Test Lead</cite>
              </blockquote>
              <blockquote className="azure-quote">
                "The workflow felt more predictable and structured."
                <cite>— Product Manager</cite>
              </blockquote>
            </div>

            <h3>18.3 Key Outcomes</h3>
            <ul className="outcomes-list">
              <li>Reduced navigation complexity across modules</li>
              <li>Improved discoverability of test cases</li>
              <li>Increased visibility of hierarchy relationships</li>
              <li>Reduced dependence on memory-based navigation</li>
              <li>Created a scalable IA foundation for future growth</li>
            </ul>
            <h3>18.4 Validation Method</h3>
            <p>Outcomes were derived from stakeholder interviews, internal usability validation sessions, workflow observation, and comparative task-completion testing conducted before and after the redesign.</p>
          </section>

          {/* LEARNINGS & REFLECTION */}
          <section id="learnings" ref={(el) => (sectionRefs.current[18] = el)}>
            <div className="section-header">
              <span className="section-number">19</span>
              <h2>REFLECTION</h2>
            </div>
            
            <div className="reflection-block">
              <h3>19.1 What This Project Reinforced ........</h3>
              <p>Enterprise complexity rarely lives in the data — it lives in how the data is organized and surfaced.</p>
              <p>NoGrunt had every feature QA teams needed. The problem was that the system was built around database logic, not human workflows. Users had to learn the system before they could do their job.</p>
              <p><strong>Progressive disclosure isn't just a UX pattern — it's a trust-building tool.</strong> Every time a user sees exactly what they need and nothing they don't, the product feels like it understands them.</p>
            </div>

            <div className="reflection-block">
              <h3>19.2 What I'd Explore Next</h3>
              <ul>
                <li>AI-powered test case search: surface relevant TCs based on module context and recent runs</li>
                <li>Cross-module shortcuts for repeated workflows (e.g. quick-run from dashboard)</li>
                <li>Long-term adoption tracking to measure workflow efficiency at scale</li>
                <li>Expand usability testing to QA teams across different organization types and sizes</li>
              </ul>
            </div>

            <div className="final-takeaway">
              <h3>19.3 Final Takeaway</h3>
              <p className="azure-highlight-text">
                Great product experiences are not created by adding more functionality—they are created by helping users reach their goals with less effort and greater confidence.
              </p>
            </div>
          </section>

        </main>
      </div>

      <footer className="azure-footer">
        <div className="azure-footer-nav">
          <div className="footer-col">
            {previous ? (
              <button className="nav-btn" type="button" onClick={() => onNavigate(previous.route)}>
                <ChevronLeft size={24} />
                <div className="nav-btn-text">
                  <small>Previous Project</small>
                  <span>{previous.title}</span>
                </div>
              </button>
            ) : <span />}
          </div>
          <div className="footer-col right">
            {next ? (
              <button className="nav-btn" type="button" onClick={() => onNavigate(next.route)}>
                <div className="nav-btn-text">
                  <small>Next Project</small>
                  <span>{next.title}</span>
                </div>
                <ChevronRight size={24} />
              </button>
            ) : (
              <button className="nav-btn" type="button" onClick={() => onNavigate('/')}>
                <div className="nav-btn-text">
                  <small>Return to</small>
                  <span>Projects</span>
                </div>
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        </div>
      </footer>
    </article>
  );
}
