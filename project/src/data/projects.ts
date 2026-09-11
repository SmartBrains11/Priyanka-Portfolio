export type ProjectSection = {
  id: string;
  title: string;
  content: string[];
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  route: string;
  accent: string;
  eyebrow: string;
  visualTitle: string;
  visualSubtitle: string;
  image?: string;
  sections?: ProjectSection[];
};

export const projects: Project[] = [
  {
    id: 'assure-q',
    title: 'Assure Q',
    category: 'Product Design',
    description: 'Redesigning Test Discovery & Navigation.',
    route: '/azure-q',
    accent: 'azure',
    eyebrow: 'B2B / ENTERPRISE',
    visualTitle: 'Assure Q',
    visualSubtitle: 'Redesigning a complex automation testing platform',
    image: '/thumbnails/23.png',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: [
          'AssureQ is an enterprise automation testing platform used by QA teams to manage test cases and execute testing workflows.',
          'Its previous version, NoGrunt, contained all the necessary features but suffered from a confusing user experience that slowed users down. My role was to redesign the platform and make testing simpler, faster, and more intuitive.'
        ]
      },
      {
        id: 'role',
        title: 'My Role & Timeline',
        content: [
          '**Role:** UI/UX Designer (Solo)',
          '**Responsibilities:** User Research, Information Architecture, Interaction Design, Design System, Developer Handoff, High Fidelity UI.',
          '**Timeline:** 8 Weeks (from Discovery to Handoff).'
        ]
      },
      {
        id: 'problem',
        title: 'Problem & Context',
        content: [
          '**Challenge:** "How might we help QA teams find, organize, and execute test cases faster without overwhelming them with information?"',
          'Users lost track of where they were: No breadcrumbs, no hierarchy, no navigation context.',
          'Test suites hid critical information: Folder cards showed no metadata.',
          'Users experienced decision overload: 3 large dropdowns, 500+ items, everything shown simultaneously.'
        ]
      },
      {
        id: 'process',
        title: 'Process & Research',
        content: [
          'Conducted User Observation Sessions, Stakeholder Interviews, and a Heuristic Audit (Nielsen Norman Group principles).',
          '**Key Audit Violations:** Dropdown-first navigation didn\'t match how QA teams think about test hierarchies (Match between system and mental model), Users had to remember module names and locations with no visible cues (Recognition over recall).'
        ]
      },
      {
        id: 'design',
        title: 'Design & Solution',
        content: [
          '**User Flow A (Test Execution):** Helped QA teams locate and execute a test case with minimal navigation effort using a progressive 5-step workflow.',
          '**User Flow B (Test Suite Navigation):** Made suite hierarchy visible while reducing unnecessary exploration using a two-panel navigator.',
          '**Key Design Responses:** Introduced breadcrumbs, a dedicated Test Case explorer, and context-rich lists instead of large dropdowns.'
        ]
      },
      {
        id: 'outcome',
        title: 'Outcome & Impact',
        content: [
          '**~77% Time Saved:** Time to locate & execute TC-031 dropped from 4m 12s to 58s.',
          'Reduced cognitive load through a fully visible Tree Navigator.',
          'Increased user confidence, task accuracy, and satisfaction during task execution.'
        ]
      }
    ]
  },
  {
    id: 'smartbrains-india',
    title: 'SmartBrains India',
    category: 'Case Study',
    description: 'Website SEO marketing case study.',
    route: '/smartbrains-india',
    accent: 'smartbrains',
    eyebrow: 'WEBSITE / SEO',
    visualTitle: 'SmartBrains India',
    visualSubtitle: 'Learn • Grow • Build',
    image: '/thumbnails/sbi.png',
  },
  {
    id: 'swarga',
    title: 'Swarga',
    category: 'Branding',
    description: 'Branding and visual identity case study.',
    route: '/swarga',
    accent: 'swarga',
    eyebrow: 'BRAND / IDENTITY',
    visualTitle: 'SWARGA',
    visualSubtitle: 'HEAVEN GROUNDED',
  },
  {
    id: 'illustration',
    title: 'Illustration',
    category: 'Illustration',
    description: 'Visual exploration.',
    route: '/illustration',
    accent: 'illustration',
    eyebrow: 'ART / EXPLORATION',
    visualTitle: 'Illustration',
    visualSubtitle: 'EXPLORE • CREATE • EXPRESS',
  },
];

export function getProjectByPath(pathname: string): Project | undefined {
  return projects.find((project) => project.route === pathname);
}
