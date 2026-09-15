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
} from 'lucide-react';
import { getProjectByPath, projects, type Project } from '@/data/projects';
import AzureQ from './pages/AzureQ/AzureQ';
import UnderstandHowIThink from './pages/UnderstandHowIThink/UnderstandHowIThink';
import SmartBrainsIndia from './pages/SmartBrainsIndia/SmartBrainsIndia';

import RoomExperience from './pages/RoomExperience/RoomExperience';
import Swarga from './pages/Swarga/Swarga';


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

  if (window.location.pathname === '/understand-how-i-think') {
    return <UnderstandHowIThink onNavigate={openPath} />;
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

  return (
    <div className="app-shell home-shell">
      <TopBar activeProject={route.project} onNavigate={openPath} />
      <div className="workspace-layout">
        <Sidebar
          activeProject={route.project}
          mobileOpen={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          onNavigate={openPath}
        />
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
      <button className="brand-mark" type="button" aria-label="Back to Projects" onClick={() => onNavigate('/')}>
        <FigmaIcon />
      </button>
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
        <button className="icon-button" type="button" aria-label="Notifications"><Bell size={18} /></button>
        <button className="avatar" type="button" aria-label="Lakkoju Priyanka profile">LP</button>
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
        <div className="sidebar-heading">
          <button className="sidebar-close" type="button" aria-label="Close navigation" onClick={onClose}><X size={18} /></button>
          <strong>Lakkoju Priyanka</strong>
          <span>Portfolio <i>•</i> Case Studies</span>
        </div>
        <nav className="sidebar-nav" aria-label="Portfolio navigation">
          <button className={!activeProject ? 'selected' : ''} type="button" onClick={() => onNavigate('/')}>
            <Folder size={19} /> Projects
          </button>
          <button type="button" onClick={() => onNavigate('/')}>
            <Star size={19} /> Starred
          </button>
        </nav>
        <div className="sidebar-footer">
          <div className="mini-mark"><FigmaIcon size={24} /></div>
          <span>Designed with intention</span>
          <small>Portfolio workspace</small>
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
      
      {/* Understand How I Think Pointer */}
      <div 
        className="cp-container flicking-pointer-container show-pop-work" 
        style={{ right: '5%', top: '15%', opacity: 1 }}
      >
        <div className="cp-dot" style={{ background: '#438bff', boxShadow: '0 0 0 2px rgba(67, 139, 255, 0.3)' }} />
        <svg className="cp-svg" width="60" height="60" style={{ bottom: 0, right: 0 }}>
          <path d="M 60,60 Q 60,0 0,0" fill="none" stroke="#438bff" strokeWidth="2" />
        </svg>
        <div className="cp-content" style={{ bottom: '60px', right: '60px', transform: 'translateY(50%)', flexDirection: 'row-reverse' }}>
          <Lightbulb color="#438bff" size={24} />
          <button 
            className="cp-button" 
            style={{ color: '#438bff', boxShadow: '0 4px 12px rgba(67, 139, 255, 0.15)' }}
            onClick={() => onNavigate('/?view=board')}
          >
            Understand How I Think
          </button>
        </div>
      </div>

      <div className="welcome-block">
        <p className="kicker">WELCOME BACK,</p>
        <h1>Lakkoju Priyanka</h1>
        <p className="subheading">Portfolio <i>•</i> Case Studies</p>
      </div>
      <div className="section-heading">
        <div>
          <h2>Projects</h2>
          <p>A collection of my work, case studies and explorations.</p>
        </div>
        <label className="content-search">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Filter projects</span>
          <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Filter projects" aria-label="Filter projects" />
        </label>
      </div>
      <p className="explore-hint"><Sparkles size={14} /> Click a project to explore</p>
      {filteredProjects.length > 0 ? (
        <div className="project-grid">
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
    <button className={`project-card accent-${project.accent}`} type="button" onClick={onOpen} aria-label={`Open ${project.title} project`}>
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
      <div className="card-footer">
        <div className="card-copy"><h3>{project.title}</h3><p>{project.description}</p></div>
        <div className="card-meta"><span className="category-pill">{project.category}</span><span className="open-arrow" aria-hidden="true"><MoveUpRight size={17} /></span></div>
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

export default App;
