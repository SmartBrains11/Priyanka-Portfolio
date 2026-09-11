import re

filepath = r'c:\Users\user\Downloads\project-bolt-sb1-udbk4udg\project\src\pages\AzureQ\AzureQ.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Nav items update
new_nav = """  const navItems = [
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
  ];"""

content = re.sub(r'const navItems = \[.*?\];', new_nav, content, flags=re.DOTALL)

# Let's perform some explicit replacements
reps = [
    ("<h3>What is AssureQ?</h3>", "<h3>1.1 WHAT IS ASSUREQ?</h3>"),
    ("<h4>1.2 My Role !!</h4>", "<h4>1.2 MY ROLE !!</h4>"),
    ("<h4>1.3 Timeline</h4>", "<h4>1.3 TIMELINE</h4>"),
    (
        '<section id="problem" ref={(el) => (sectionRefs.current[1] = el)}>',
        '<section id="metrics" ref={(el) => (sectionRefs.current[1] = el)}>'
    ),
    (
        '<span className="section-number">02</span>\n              <h2>The Challenge</h2>',
        '<span className="section-number">01</span>\n              <h2>Project Overview</h2>\n            </div>\n            <h3>1.4 CHALLENGE</h3>'
    ),
    # Let's fix the above which might be slightly wrong. The Challenge was its own section. 
    # Actually, let's rewrite the headers carefully.
]

# We will just write a function to replace exactly what we need
def repl(old, new):
    global content
    content = content.replace(old, new)

# 01
repl("<h3>What is AssureQ?</h3>", "<h3>1.1 WHAT IS ASSUREQ ?</h3>")
repl("<h4>1.2 My Role !!</h4>", "<h4>1.2 MY ROLE !!</h4>")
repl("<h4>1.3 Timeline</h4>", "<h4>1.3 TIMELINE</h4>")

# 1.4 Challenge is actually part of overview but currently in 'The Challenge' section
repl('<section id="problem" ref={(el) => (sectionRefs.current[1] = el)}>\n            <div className="section-header">\n              <span className="section-number">02</span>\n              <h2>The Challenge</h2>\n            </div>\n            <p className="azure-highlight-text">',
     '<h3 style={{ marginTop: "3rem" }}>1.4 CHALLENGE</h3>\n            <p className="azure-highlight-text">')

repl('<h3>Success Metrics</h3>',
     '</section>\n\n          {/* SUCCESS METRICS */}\n          <section id="metrics" ref={(el) => (sectionRefs.current[1] = el)}>\n            <div className="section-header">\n              <span className="section-number">02</span>\n              <h2>SUCCESS METRICS</h2>\n            </div>\n            <p>To determine whether the redesign was successful, I defined four measurable goals:</p>')

# 03
repl('<span className="section-number">03</span>\n              <h2>Research & Discovery</h2>',
     '<span className="section-number">03</span>\n              <h2>RESEARCH & DISCOVERY</h2>')
repl('<h3>User Personas</h3>', '<h3>3.1 USER RESEARCH</h3>\n            <p>Before redesigning screens, I investigated how information architecture and navigation patterns impacted daily QA workflows.</p>\n            <h4>User Personas</h4>')

repl('<h3>Research Findings</h3>', '<h3>3.2 RESEARCH FINDINGS</h3>')
repl('<h3>Heuristic Audit</h3>', '<h4>Heuristic Audit</h4>')

repl('<h3>Project Constraints</h3>', '</section>\n\n          <section id="constraints" ref={(el) => (sectionRefs.current[3] = el)}>\n            <div className="section-header">\n              <span className="section-number">04</span>\n              <h2>PROJECT CONSTRAINTS</h2>\n            </div>')

# 04 -> 05 Insights & Strategy
repl('<section id="insights" ref={(el) => (sectionRefs.current[3] = el)}>\n            <div className="section-header">\n              <span className="section-number">04</span>\n              <h2>Insights & Strategy</h2>\n            </div>\n            \n            <h3>Affinity Map</h3>',
     '<section id="affinity" ref={(el) => (sectionRefs.current[4] = el)}>\n            <div className="section-header">\n              <span className="section-number">05</span>\n              <h2>AFFINITY MAP</h2>\n            </div>')

# 06 Journey Mapping
repl('<section id="journey" ref={(el) => (sectionRefs.current[4] = el)}>\n            <div className="section-header">\n              <span className="section-number">05</span>\n              <h2>Journey & Flow Mapping</h2>\n            </div>\n            \n            <h3>Understanding the Existing Test Execution Workflow</h3>',
     '<section id="journey" ref={(el) => (sectionRefs.current[5] = el)}>\n            <div className="section-header">\n              <span className="section-number">06</span>\n              <h2>JOURNEY MAPPING</h2>\n            </div>\n            \n            <h3>Understanding the Existing Test Execution Workflow</h3>')

# 07 User Flow
repl('<h3>User Flows</h3>', '</section>\n\n          <section id="flow" ref={(el) => (sectionRefs.current[6] = el)}>\n            <div className="section-header">\n              <span className="section-number">07</span>\n              <h2>USER FLOW</h2>\n            </div>\n            <p>Mapping the journeys that mattered most. I identified three critical user flows that accounted for 80% of daily usage. Each was redesigned around progressive disclosure — commit to context one step at a time.</p>')
repl('<p>Mapping the journeys that mattered most. I identified three critical user flows that accounted for 80% of daily usage. Each was redesigned around progressive disclosure — commit to context one step at a time.</p>\n            \n            <div className="flow-block">', '<div className="flow-block">')

# 08 Insights -> Design Strategy
repl('<h3>From Insights to Design Strategy</h3>', '</section>\n\n          <section id="strategy" ref={(el) => (sectionRefs.current[7] = el)}>\n            <div className="section-header">\n              <span className="section-number">08</span>\n              <h2>INSIGHTS → DESIGN STRATEGY</h2>\n            </div>')

# 09 Information Architecture
repl('<section id="ideation" ref={(el) => (sectionRefs.current[5] = el)}>\n            <div className="section-header">\n              <span className="section-number">06</span>\n              <h2>Information Architecture</h2>',
     '<section id="ia" ref={(el) => (sectionRefs.current[8] = el)}>\n            <div className="section-header">\n              <span className="section-number">09</span>\n              <h2>INFORMATION ARCHITECTURE</h2>')

# 10 Key Design Decisions
repl('<h3 className="mt-large">Key Design Decisions</h3>', '</section>\n\n          <section id="decisions" ref={(el) => (sectionRefs.current[9] = el)}>\n            <div className="section-header">\n              <span className="section-number">10</span>\n              <h2>KEY DESIGN DECISIONS</h2>\n            </div>')

# 11 Why Not Other Solutions?
repl('<div className="decision-block">\n              <h4>Why not other solutions?</h4>', '</section>\n\n          <section id="solutions" ref={(el) => (sectionRefs.current[10] = el)}>\n            <div className="section-header">\n              <span className="section-number">11</span>\n              <h2>WHY NOT OTHER SOLUTIONS?</h2>\n            </div>\n            <div className="decision-block">')

# 12 Wireframes
repl('<section id="wireframes" ref={(el) => (sectionRefs.current[6] = el)}>\n            <div className="section-header">\n              <span className="section-number">07</span>\n              <h2>Wireframes</h2>',
     '<section id="wireframes" ref={(el) => (sectionRefs.current[11] = el)}>\n            <div className="section-header">\n              <span className="section-number">12</span>\n              <h2>WIREFRAMES</h2>')

# 13 Design System
repl('<section id="ui" ref={(el) => (sectionRefs.current[7] = el)}>\n            <div className="section-header">\n              <span className="section-number">08</span>\n              <h2>Design System</h2>',
     '<section id="ui" ref={(el) => (sectionRefs.current[12] = el)}>\n            <div className="section-header">\n              <span className="section-number">13</span>\n              <h2>DESIGN SYSTEM</h2>')

# Design system subsections
repl('<h3 className="mt-large">Components & Patterns</h3>', '<h3>13.6 COMPONENTS</h3>')
content = content.replace('<h2>DESIGN SYSTEM</h2>\n            </div>\n            <p>', '<h2>DESIGN SYSTEM</h2>\n            </div>\n            <h3>13.3 COLOR PALETTE</h3>\n            <p>')

# Add Grids, Font, Logo, Buttons
repl('<h3>13.3 COLOR PALETTE</h3>', '<h3>13.1 GRIDS</h3>\n            <Placeholder id="azure-q-grids" label="[AZURE Q — GRIDS]" />\n            <h3>13.2 FONT</h3>\n            <Placeholder id="azure-q-font" label="[AZURE Q — FONT]" />\n            <h3>13.3 COLOR PALETTE</h3>')
repl('<Placeholder id="azure-q-design-system-components" label="[AZURE Q — COMPONENTS PREVIEW]" />', '<h3>13.4 LOGO</h3>\n            <Placeholder id="azure-q-logo" label="[AZURE Q — LOGO]" />\n            <h3>13.5 BUTTONS</h3>\n            <Placeholder id="azure-q-buttons" label="[AZURE Q — BUTTONS]" />\n            <h3>13.6 COMPONENTS</h3>\n            <Placeholder id="azure-q-design-system-components" label="[AZURE Q — COMPONENTS PREVIEW]" />')
# To avoid double 13.6 COMPONENTS:
repl('<h3>13.6 COMPONENTS</h3>\n            <h3>13.4 LOGO</h3>', '<h3>13.4 LOGO</h3>')

# 14 Interaction Principles
repl('<section id="features" ref={(el) => (sectionRefs.current[8] = el)}>\n            <div className="section-header">\n              <span className="section-number">09</span>\n              <h2>Interaction Principles</h2>',
     '<section id="principles" ref={(el) => (sectionRefs.current[13] = el)}>\n            <div className="section-header">\n              <span className="section-number">14</span>\n              <h2>INTERACTION PRINCIPLES</h2>')

# 15 Final Interfaces Visuals
repl('<section id="solution" ref={(el) => (sectionRefs.current[9] = el)}>\n            <div className="section-header">\n              <span className="section-number">10</span>\n              <h2>Final Solution & Interfaces</h2>',
     '<section id="solution" ref={(el) => (sectionRefs.current[14] = el)}>\n            <div className="section-header">\n              <span className="section-number">15</span>\n              <h2>FINAL INTERFACES VISUALS</h2>')

# 16 Validation
repl('<section id="outcome" ref={(el) => (sectionRefs.current[10] = el)}>\n            <div className="section-header">\n              <span className="section-number">11</span>\n              <h2>Validation & Impact</h2>',
     '<section id="validation" ref={(el) => (sectionRefs.current[15] = el)}>\n            <div className="section-header">\n              <span className="section-number">16</span>\n              <h2>VALIDATION</h2>')
repl('<div className="validation-task">\n              <strong>TASK GIVEN:</strong> Locate and execute a specific test case (TC-031) within the platform.\n            </div>',
     '<h3>16.1 TASK GIVEN</h3>\n            <div className="validation-task">\n              Locate and execute a specific test case (TC-031) within the platform.\n            </div>')
repl('<div className="results-table">', '<h3>16.2 RESULT</h3>\n            <div className="results-table">')
repl('<h4>Key Observations</h4>', '<h3>16.3 KEY OBSERVATIONS</h3>')
repl('<h4>Validation Insight</h4>', '<h3>16.4 VALIDATION INSIGHT</h3>')

# 17 Before vs After
repl('<Placeholder id="azure-q-before-after-path" label="[AZURE Q — BEFORE VS AFTER TANGLED PATH VISUAL]" />',
     '</section>\n\n          <section id="before-after" ref={(el) => (sectionRefs.current[16] = el)}>\n            <div className="section-header">\n              <span className="section-number">17</span>\n              <h2>BEFORE VS AFTER</h2>\n            </div>\n            <Placeholder id="azure-q-before-after-path" label="[AZURE Q — BEFORE VS AFTER TANGLED PATH VISUAL]" />\n          </section>')

# 18 Impact
repl('<h3 className="mt-large">User Feedback</h3>', '</section>\n\n          <section id="outcome" ref={(el) => (sectionRefs.current[17] = el)}>\n            <div className="section-header">\n              <span className="section-number">18</span>\n              <h2>IMPACT</h2>\n            </div>\n            <h3>18.1 Results that validated every decision</h3>\n            <p>The redesign focused on improving discoverability, hierarchy visibility, and workflow efficiency across the platform.</p>\n            <h3>18.2 Feedbacks</h3>')
repl('<h3 className="mt-large">Key Outcomes</h3>', '<h3>18.3 Key Outcomes</h3>')

repl('</ul>\n          </section>\n\n          {/* LEARNINGS & REFLECTION */}',
     '</ul>\n            <h3>18.4 Validation Method</h3>\n            <p>Outcomes were derived from stakeholder interviews, internal usability validation sessions, workflow observation, and comparative task-completion testing conducted before and after the redesign.</p>\n          </section>\n\n          {/* LEARNINGS & REFLECTION */}')


# 19 Reflection
repl('<section id="learnings" ref={(el) => (sectionRefs.current[11] = el)}>\n            <div className="section-header">\n              <span className="section-number">12</span>\n              <h2>Reflection</h2>',
     '<section id="learnings" ref={(el) => (sectionRefs.current[18] = el)}>\n            <div className="section-header">\n              <span className="section-number">19</span>\n              <h2>REFLECTION</h2>')
repl('<h3>What This Project Reinforced...</h3>', '<h3>19.1 What This Project Reinforced ........</h3>')
repl('<h3>What I\'d Explore Next</h3>', '<h3>19.2 What I\'d Explore Next</h3>')
repl('<h3>Final Takeaway</h3>', '<h3>19.3 Final Takeaway</h3>')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated AzureQ.tsx successfully")
