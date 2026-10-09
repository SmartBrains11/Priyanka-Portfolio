import { useEffect, useMemo, useState } from 'react';
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Folder,
  Menu,
  MoveUpRight,
  Search,
  Sparkles,
  Star,
  X,
  Lightbulb,
  FileText,
  User,
  Compass,
  Paintbrush,
  MoveRight
} from 'lucide-react';
import { getProjectByPath, projects, type Project } from '@/data/projects';
import AzureQ from './pages/AzureQ/AzureQ';
import UnderstandHowIThink from './pages/UnderstandHowIThink/UnderstandHowIThink';
import SmartBrainsIndia from './pages/SmartBrainsIndia/SmartBrainsIndia';

import RoomExperience from './pages/RoomExperience/RoomExperience';
import Swarga from './pages/Swarga/Swarga';
import Inspiration from './pages/Inspiration/Inspiration';
import Experience from './pages/Experience/Experience';
import Art from './pages/Art/Art';
import Contact from './pages/Contact/Contact';
import GlobalMapMenu from './components/GlobalMapMenu';


type RouteState = { project?: Project };

function readRoute(): RouteState {
  return { project: getProjectByPath(window.location.pathname) };
}

function App() {
  const [route, setRoute] = useState<RouteState>(readRoute);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handlePopState = () => setRoute(readRoute());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.title = route.project
      ? `${route.project.title} — Lakkoju Priyanka`
      : 'Lakkoju Priyanka — Portfolio';
  }, [route.project]);

  const openPath = (path: string) => {
    window.history.pushState({}, '', path);
    setRoute({ project: getProjectByPath(path) });
    setMobileNavOpen(false);
    setSearch('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    if (window.location.pathname === '/understand-how-i-think') {
      return <UnderstandHowIThink onNavigate={openPath} />;
    }
    if (window.location.pathname === '/inspiration') {
      return <Inspiration onNavigate={openPath} />;
    }
    if (window.location.pathname === '/experience') {
      return <Experience onNavigate={openPath} />;
    }
    if (window.location.pathname === '/art') {
      return <Art onNavigate={openPath} />;
    }
    if (window.location.pathname === '/contact') {
      return <Contact onNavigate={openPath} />;
    }
    if (route.project) {
      if (route.project.id === 'assure-q') {
        return <AzureQ project={route.project} onNavigate={openPath} />;
      }
      if (route.project.id === 'smartbrains-india') {
        return <SmartBrainsIndia project={route.project} onNavigate={openPath} />;
      }
      if (route.project.id === 'swarga') {
        return <Swarga project={route.project} onNavigate={openPath} />;
      }
      return <ProjectPage project={route.project} onNavigate={openPath} />;
    }
    if (!route.project && window.location.pathname === '/') {
      return <RoomExperience onNavigate={openPath} />;
    }
    return null;
  };

  const pageContent = renderPage();
  if (pageContent) {
    return (
      <>
        {window.location.pathname !== '/' && <GlobalMapMenu onNavigate={openPath} />}
        {pageContent}
      </>
    );
  }

  return (
    <>
      {window.location.pathname !== '/' && <GlobalMapMenu onNavigate={openPath} />}
      <div className="app-shell home-shell">
        <div className="workspace-layout">
          <Sidebar
          activeProject={route.project}
          mobileOpen={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          onNavigate={openPath}
        />
        <div className="flex-1 flex flex-col min-w-0 h-screen">
          <TopBar activeProject={route.project} onNavigate={openPath} />
          <main className="main-workspace">
            <button
              className="mobile-menu-button"
              type="button"
              aria-label="Open navigation"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu size={20} />
            </button>
            <ProjectsHome search={search} onSearchChange={setSearch} onNavigate={openPath} />
          </main>
        </div>
      </div>
    </div>
    </>
  );
}

function FigmaIcon({ size = 38 }: { size?: number }) {
  const height = size * 1.5;
  return (
    <svg width={size} height={height} viewBox="0 0 24 36" role="img" aria-label="Figma" className="figma-icon">
      <path d="M6 0h6v12H6A6 6 0 0 1 6 0Z" fill="#F24E1E" />
      <path d="M12 0h6a6 6 0 0 1 0 12h-6V0Z" fill="#FF7262" />
      <path d="M6 12h6v12H6a6 6 0 0 1 0-12Z" fill="#A259FF" />
      <path d="M12 12h6a6 6 0 0 1 0 12h-6V12Z" fill="#1ABCFE" />
      <path d="M6 24h6v6a6 6 0 1 1-6-6Z" fill="#0ACF83" />
    </svg>
  );
}

type TopBarProps = {
  activeProject?: Project;
  onNavigate: (path: string) => void;
};

function TopBar({ activeProject, onNavigate }: TopBarProps) {
  return (
    <header className="topbar">
      <nav className="project-tabs" aria-label="Project tabs">
        {projects.map((project) => (
          <button
            className={`project-tab ${activeProject?.id === project.id ? 'active' : ''}`}
            key={project.id}
            type="button"
            onClick={() => onNavigate(project.route)}
            aria-current={activeProject?.id === project.id ? 'page' : undefined}
          >
            <span className={`tab-dot dot-${project.accent}`} />
            {project.title}
          </button>
        ))}
      </nav>
      <div className="topbar-actions">
        <label className="search-box">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">Search projects</span>
          <input placeholder="Search projects..." aria-label="Search projects" />
        </label>
        <button className="avatar" type="button" aria-label="Lakkoju Priyanka profile" style={{ background: '#f5ded9', color: '#684541' }}>LP</button>
      </div>
    </header>
  );
}

type SidebarProps = {
  activeProject?: Project;
  mobileOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
};

function Sidebar({ activeProject, mobileOpen, onClose, onNavigate }: SidebarProps) {
  return (
    <>
      {mobileOpen && <button className="sidebar-scrim" aria-label="Close navigation" type="button" onClick={onClose} />}
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="brand-mark-sidebar">
          <button type="button" aria-label="Back to Projects" onClick={() => onNavigate('/')}>
            <FigmaIcon />
          </button>
        </div>
        <div className="sidebar-heading">
          <button className="sidebar-close" type="button" aria-label="Close navigation" onClick={onClose}><X size={18} /></button>
          <strong style={{ fontFamily: 'Avenue Mono, serif', fontSize: '24px', letterSpacing: '0', fontWeight: '500', marginTop: '10px' }}>Priyanka</strong>
          <span style={{ fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: '#9da4b3', fontWeight: '600' }}>PRODUCT DESIGNER</span>
        </div>
        <nav className="sidebar-nav" aria-label="Portfolio navigation">
          <button className={window.location.pathname === '/projects' ? 'selected' : ''} type="button" onClick={() => onNavigate('/projects')}>
            <Folder size={18} /> Projects
          </button>
          <button className={window.location.pathname === '/experience' ? 'selected' : ''} type="button" onClick={() => onNavigate('/experience')}>
            <FileText size={18} /> Experience
          </button>
          <button className={window.location.pathname === '/contact' ? 'selected' : ''} type="button" onClick={() => onNavigate('/contact')}>
            <User size={18} /> Contact
          </button>
          <button className={window.location.pathname === '/understand-how-i-think' ? 'selected' : ''} type="button" onClick={() => onNavigate('/understand-how-i-think')}>
            <Compass size={18} /> Process
          </button>
          <button className={window.location.pathname === '/art' ? 'selected' : ''} type="button" onClick={() => onNavigate('/art')}>
            <Paintbrush size={18} /> Art
          </button>
        </nav>
        <div className="sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#687184', fontSize: '12px', marginBottom: '12px' }}>
            <span style={{ width: '6px', height: '6px', background: '#3ecf8e', borderRadius: '50%' }}></span>
            Available for<br/>opportunities
          </div>
          <button style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #e2e6ed', borderRadius: '20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', color: '#171b2b', width: '100%', justifyContent: 'space-between' }}>
            Let's talk <MoveRight size={14} />
          </button>
        </div>
      </aside>
    </>
  );
}

type ProjectsHomeProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onNavigate: (path: string) => void;
};

function ProjectsHome({ search, onSearchChange, onNavigate }: ProjectsHomeProps) {
  const filteredProjects = useMemo(
    () => projects.filter((project) => `${project.title} ${project.category}`.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <section className="home-content relative">
      <div className="section-heading" style={{ display: 'block', margin: '0 0 16px 0' }}>
        <p className="kicker" style={{ color: '#8791a4', letterSpacing: '3px', fontSize: '11px', marginBottom: '8px' }}>SELECTED WORKS</p>
        <h1 style={{ fontFamily: 'Avenue Mono, serif', fontSize: '56px', margin: '0 0 4px 0', letterSpacing: '-1.5px', color: '#171b2b', fontWeight: '500' }}>Projects</h1>
        <p style={{ color: '#7f8797', fontSize: '17px', margin: '0 0 24px 0' }}>Product design, branding and visual exploration.</p>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ padding: '8px 24px', borderRadius: '24px', background: '#000', color: '#fff', fontSize: '13px' }}>All</button>
          <button style={{ padding: '8px 24px', borderRadius: '24px', border: '1px solid #e2e6ed', background: '#fff', color: '#677185', fontSize: '13px' }}>Product Design</button>
          <button style={{ padding: '8px 24px', borderRadius: '24px', border: '1px solid #e2e6ed', background: '#fff', color: '#677185', fontSize: '13px' }}>Branding</button>
          <button style={{ padding: '8px 24px', borderRadius: '24px', border: '1px solid #e2e6ed', background: '#fff', color: '#677185', fontSize: '13px' }}>Illustration</button>
        </div>
      </div>
      
      {filteredProjects.length > 0 ? (
        <div className="project-grid mt-4">
          {filteredProjects.map((project) => <ProjectCard key={project.id} project={project} onOpen={() => onNavigate(project.route)} />)}
        </div>
      ) : (
        <div className="empty-search">No projects match “{search}”.</div>
      )}
    </section>
  );
}

type ProjectCardProps = { project: Project; onOpen: () => void };

function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <button className={`project-card accent-${project.accent}`} type="button" onClick={onOpen} aria-label={`Open ${project.title} project`} style={{ borderRadius: '16px' }}>
      <div className={`project-visual ${project.image ? 'has-image' : ''}`}>
        {project.image ? (
          <img src={project.image} alt={`${project.title} project preview`} />
        ) : (
          <>
            <span className="visual-orbit orbit-one" />
            <span className="visual-orbit orbit-two" />
            <span className="visual-eyebrow">{project.eyebrow}</span>
            {project.accent === 'illustration' && <span className="floral-line">✳</span>}
            {project.accent === 'swarga' && <span className="swarga-leaf">♢</span>}
            <strong>{project.visualTitle}</strong>
            <span>{project.visualSubtitle}</span>
          </>
        )}
      </div>
      <div className="card-footer" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' }}>
        <div className="card-copy">
          <h3 style={{ fontFamily: 'Avenue Mono, serif', fontSize: '20px', fontWeight: '500', marginBottom: '8px', color: '#171b2b' }}>{project.title}</h3>
          <p style={{ color: '#7f8797', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>{project.description}</p>
        </div>
        <div className="card-meta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px' }}>
          <span className="category-pill">{project.category}</span>
          <span className="open-arrow" aria-hidden="true" style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#f5f6f8', color: '#677185' }}>
            <MoveRight size={14} />
          </span>
        </div>
      </div>
    </button>
  );
}

type ProjectPageProps = { project: Project; onNavigate: (path: string) => void };

function ProjectPage({ project, onNavigate }: ProjectPageProps) {
  const index = projects.findIndex((item) => item.id === project.id);
  const previous = projects[index - 1];
  const next = projects[index + 1];

  return (
    <article className="project-fullscreen">
      <button className="back-link" type="button" onClick={() => onNavigate('/projects')}><ChevronLeft size={17} /> Back to Projects</button>
      <div className="case-heading">
        <div><p className="kicker">{project.category.toUpperCase()}</p><h1>{project.title}</h1><p className="case-description">{project.description}</p></div>
        <span className={`case-dot dot-${project.accent}`} aria-hidden="true" />
      </div>
      <div className={`case-hero accent-${project.accent} ${project.image ? 'has-image' : ''}`}>
        {project.image ? (
          <img src={project.image} alt={`${project.title} case study visual`} />
        ) : (
          <><span className="visual-eyebrow">{project.eyebrow}</span><strong>{project.visualTitle}</strong><span>{project.visualSubtitle}</span></>
        )}
      </div>
      <div className="case-body">
        <div className="case-intro"><p className="kicker">CASE STUDY / {project.category.toUpperCase()}</p><h2>A closer look at the work.</h2><p>This space is ready for the story behind the project, from the original context through the design process.</p></div>
        <div className="detail-list">
          {project.sections ? (
            project.sections.map((section) => (
              <section key={section.id}>
                <h3>{section.title}</h3>
                {section.content.map((paragraph, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ))}
              </section>
            ))
          ) : (
            ['Overview', 'My Role', 'Problem / Context', 'Process', 'Design', 'Outcome'].map((label) => <section key={label}><h3>{label}</h3><p>Case-study content coming soon.</p></section>)
          )}
        </div>
      </div>
      <div className="case-navigation">
        {previous ? <button type="button" onClick={() => onNavigate(previous.route)}><ChevronLeft size={17} /><span><small>Previous Project</small>{previous.title}</span></button> : <span />}
        {next ? <button type="button" onClick={() => onNavigate(next.route)}><span><small>Next Project</small>{next.title}</span><ChevronRight size={17} /></button> : <button type="button" onClick={() => onNavigate('/projects')}><span><small>Return to</small>Projects</span><ChevronRight size={17} /></button>}
      </div>
    </article>
  );
}

export default App; // Force reload
