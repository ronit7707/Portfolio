import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDown,
  ArrowUpRight,
  BarChart3,
  BookOpenText,
  Check,
  ChevronRight,
  Copy,
  Database,
  ExternalLink,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Phone,
  X,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Project = {
  id: string;
  number: string;
  title: string;
  date: string;
  category: string;
  stack: string;
  summary: string;
  details: string;
};

const projects: Project[] = [
  {
    id: 'sales-analytics',
    number: '01',
    title: 'Sales Analytics Dashboard',
    date: 'April 2026',
    category: 'BI & Reporting',
    stack: 'SQL / Python / Pandas / Power BI / Excel',
    summary: 'A retail performance view designed to move from raw records to decisions.',
    details: 'Analyzed 50,000+ retail records, building KPI views and surfacing regional and product insights through Power BI and Excel.',
  },
  {
    id: 'hr-attrition',
    number: '02',
    title: 'HR Analytics — Employee Attrition Analysis',
    date: 'June 2026',
    category: 'Predictive Analytics',
    stack: 'Python / SQL / Power BI / Scikit-learn',
    summary: 'A people analytics workflow that pairs clear EDA with a predictive layer.',
    details: 'Built an exploratory analysis, dashboard, predictive attrition model, and retention recommendations using Python, SQL, Power BI, and Scikit-learn.',
  },
  {
    id: 'ecommerce-segmentation',
    number: '03',
    title: 'E-commerce Customer Segmentation',
    date: 'July 2026 — present',
    category: 'Data Analysis',
    stack: 'Python / SQL / Power BI / Scikit-learn',
    summary: 'RFM and K-Means clustering translated into a customer intelligence dashboard.',
    details: 'Applied RFM analysis and K-Means clustering, then shaped the results into a dashboard for understanding customer groups.',
  },
  {
    id: 'blood-donation',
    number: '04',
    title: 'Online Blood Donation Management Portal',
    date: 'Aug — Sep 2026',
    category: 'Web Systems',
    stack: 'HTML / CSS / JavaScript / Bootstrap / PHP / MySQL / XAMPP',
    summary: 'A full-stack portal for making urgent donor discovery easier to coordinate.',
    details: 'Includes donor registration, location and blood-group search, emergency requests, an admin dashboard, authentication, CRUD operations, and database integration.',
  },
];

const skillGroups = [
  { label: 'Analysis', icon: BarChart3, items: ['Python', 'SQL', 'MySQL', 'Pandas', 'NumPy', 'Jupyter Notebook'] },
  { label: 'Visualization', icon: Layers3, items: ['Power BI', 'Tableau', 'Excel', 'Matplotlib', 'Seaborn'] },
  { label: 'Workflow', icon: Database, items: ['VS Code', 'Git', 'GitHub'] },
];

const interests = ['Data Analysis', 'Business Intelligence', 'EDA', 'Predictive Analytics', 'Data Visualization', 'Reporting & KPI Analysis'];

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All work');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  useReveal();

  useEffect(() => {
    document.title = 'Ronit Kumar — Data Analyst & BI Portfolio';
    const description = 'Portfolio of Ronit Kumar, a B.Tech Computer Science student focused on data analytics, business intelligence, predictive analytics, and data visualization.';
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', description);
    const theme = document.querySelector('meta[name="theme-color"]') ?? document.createElement('meta');
    theme.setAttribute('name', 'theme-color');
    theme.setAttribute('content', '#f4f1e8');
    if (!theme.parentElement) document.head.appendChild(theme);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  const filteredProjects = useMemo(
    () => activeFilter === 'All work' ? projects : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  const copyEmail = async () => {
    await navigator.clipboard?.writeText('ronit7707singh@gmail.com');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="portfolio-shell">
      <header className="container-wide top-nav" data-testid="header-main">
        <a className="brand-mark" href="#top" data-testid="link-brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-dot">RK</span>
          <span>Ronit Kumar<span style={{ color: 'hsl(var(--ring))' }}>.</span></span>
        </a>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          <a className="nav-link" href="#work" data-testid="link-nav-work" onClick={() => setMenuOpen(false)}>Work</a>
          <a className="nav-link" href="#experience" data-testid="link-nav-experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a className="nav-link" href="#about" data-testid="link-nav-about" onClick={() => setMenuOpen(false)}>About</a>
          <a className="nav-contact" href="mailto:ronit7707singh@gmail.com" data-testid="link-nav-contact">Let&apos;s talk <ArrowUpRight size={14} /></a>
        </nav>
        <button className="mobile-menu-btn" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-menu" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <section className="container-wide hero" id="top">
        <div className="hero-grid">
          <div className="reveal">
            <div className="eyebrow">Open to entry-level data roles</div>
            <h1 className="hero-title">Making data<br /><em>make sense.</em></h1>
            <p className="hero-copy">I&apos;m Ronit Kumar, a Computer Science student who turns messy questions into clear analysis, useful dashboards, and decisions people can act on.</p>
            <div className="hero-actions">
              <button className="button-primary" data-testid="button-explore-work" onClick={() => goTo('work')}>Explore my work <ArrowDown size={15} /></button>
              <a className="button-ghost" href="mailto:ronit7707singh@gmail.com" data-testid="link-email-hero">Get in touch <Mail size={15} /></a>
            </div>
          </div>
          <div className="hero-visual reveal stagger-2" aria-label="Abstract data visualization">
            <div className="hero-visual-header"><span><span className="live-dot" />signal / 2026</span><span>ronit.kumar</span></div>
            <div className="hero-stat"><strong>50k+</strong><span>retail records analyzed</span></div>
            <div className="data-canvas" aria-hidden="true"><div className="data-line" /><div className="data-line-two" /></div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>Data analysis</span><span className="marquee-dot">/</span><span>Business intelligence</span><span className="marquee-dot">/</span><span>Predictive analytics</span><span className="marquee-dot">/</span><span>Data visualization</span><span className="marquee-dot">/</span><span>Data analysis</span><span className="marquee-dot">/</span><span>Business intelligence</span><span className="marquee-dot">/</span><span>Predictive analytics</span><span className="marquee-dot">/</span><span>Data visualization</span>
        </div>
      </div>

      <section className="section" id="about">
        <div className="container-wide">
          <div className="section-header reveal">
            <div><div className="section-kicker">01 / Perspective</div><h2 className="section-title">Curious by default.<br />Precise by practice.</h2></div>
            <p className="section-intro">I&apos;m building the instincts that make analysis valuable: asking better questions, checking the shape of the data, and communicating the finding without hiding behind jargon.</p>
          </div>
          <div className="about-layout">
            <p className="about-text reveal">Currently studying <strong>B.Tech Computer Science</strong> at Quantum University, I&apos;m focused on the space where technical fluency meets business context.</p>
            <div className="metric-grid reveal stagger-2">
              <div className="metric"><span className="metric-number">7.53</span><span className="metric-label">Current CGPA<br />Quantum University</span></div>
              <div className="metric"><span className="metric-number">04</span><span className="metric-label">Analytical projects<br />in the portfolio</span></div>
              <div className="metric"><span className="metric-number">02</span><span className="metric-label">Data-focused internships</span></div>
              <div className="metric"><span className="metric-number">02</span><span className="metric-label">Research publications</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="skills">
        <div className="container-wide">
          <div className="section-header reveal">
            <div><div className="section-kicker">02 / Toolkit</div><h2 className="section-title">The stack behind<br />the signal.</h2></div>
            <p className="section-intro">A practical toolkit for moving from a raw table to a useful story — with the discipline to keep both the query and the chart honest.</p>
          </div>
          <div className="skill-layout">
            <div className="reveal"><p className="skill-lead">Tools are only useful when they sharpen the <span>question.</span></p><div className="project-filter" style={{ marginTop: 28 }}><span className="eyebrow">Interested in</span></div><div className="skill-tags">{interests.map((interest) => <span className="skill-tag" key={interest}>{interest}</span>)}</div></div>
            <div className="skill-groups reveal stagger-2">
              {skillGroups.map(({ label, icon: Icon, items }) => <div className="skill-group" key={label}><h3><Icon size={13} style={{ verticalAlign: 'middle', marginRight: 6 }} />{label}</h3><div className="skill-tags">{items.map((item) => <span className="skill-tag" key={item}>{item}</span>)}</div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <div className="container-wide">
          <div className="section-header reveal">
            <div><div className="section-kicker">03 / Selected work</div><h2 className="section-title">Projects with<br />a point of view.</h2></div>
            <p className="section-intro">Each project is a small proof of process: define the problem, work the data, then make the result legible to someone who wasn&apos;t in the notebook.</p>
          </div>
          <div className="project-filter reveal" role="group" aria-label="Filter projects">
            {['All work', 'BI & Reporting', 'Predictive Analytics', 'Data Analysis', 'Web Systems'].map((filter) => <button className={`filter-btn ${activeFilter === filter ? 'active' : ''}`} key={filter} data-testid={`button-filter-${filter.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
          </div>
          <div className="project-list">
            {filteredProjects.map((project, index) => <article className={`project-card reveal stagger-${(index % 3) + 1}`} key={project.id} data-testid={`card-project-${project.id}`} onClick={() => setSelectedProject(project)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setSelectedProject(project); }} tabIndex={0} role="button">
              <div className="project-index">{project.number}</div>
              <div><h3 className="project-title">{project.title}</h3><p className="project-desc">{project.summary}</p></div>
              <div><div className="project-meta">{project.date}<br />{project.category}</div><span className="arrow-circle"><ChevronRight size={17} /></span></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="experience">
        <div className="container-wide">
          <div className="section-header reveal"><div><div className="section-kicker">04 / Experience</div><h2 className="section-title">Learning in<br />the real world.</h2></div><p className="section-intro">Internships and research that gave the work context — from a rule-based chatbot to telecom churn analysis and academic research.</p></div>
          <div className="timeline">
            <div className="timeline-row reveal"><div className="timeline-date">Jul — Dec<br />2025</div><div><h3 className="timeline-role">Research Assistant</h3><div className="timeline-company">Quantum University</div><p className="timeline-detail">Contributed to research work at the university while developing a stronger foundation for analytical and technical problem solving.</p></div></div>
            <div className="timeline-row reveal stagger-1"><div className="timeline-date">Jul — Aug<br />2025</div><div><h3 className="timeline-role">Data Analytics Intern</h3><div className="timeline-company">SaiKet System · Remote</div><p className="timeline-detail">Worked on telecom churn analysis and predictive modeling, connecting exploratory findings to a practical business question.</p></div></div>
            <div className="timeline-row reveal stagger-2"><div className="timeline-date">Jul — Aug<br />2024</div><div><h3 className="timeline-role">Python Programming Intern</h3><div className="timeline-company">CodTech IT Solutions Pvt Ltd · Remote</div><p className="timeline-detail">Built a basic rule-based chatbot and strengthened core Python programming practice in a remote internship setting.</p></div></div>
          </div>
        </div>
      </section>

      <section className="section" id="education">
        <div className="container-wide">
          <div className="section-header reveal"><div><div className="section-kicker">05 / Foundations</div><h2 className="section-title">Grounded in<br />computer science.</h2></div><p className="section-intro">An academic foundation that keeps the analytical work close to systems, logic, and the mechanics of how information moves.</p></div>
          <div className="education-grid">
            <div className="edu-card edu-card-feature reveal"><div><GraduationCap size={22} color="hsl(var(--accent))" /><div className="edu-label" style={{ marginTop: 24 }}>2023 — 2027</div><h3>B.Tech Computer Science &amp; Engineering</h3><div className="edu-detail">Quantum University</div></div><span className="edu-cgpa">CGPA / 7.53</span></div>
            <div className="scores reveal stagger-2"><div className="score"><strong>77.2%</strong><span>CBSE 12th</span></div><div className="score"><strong>82.2%</strong><span>CBSE 10th</span></div></div>
          </div>
        </div>
      </section>

      <section className="section" id="research">
        <div className="container-wide">
          <div className="section-header reveal"><div><div className="section-kicker">06 / Publications</div><h2 className="section-title">Questions worth<br />writing down.</h2></div><p className="section-intro">Research experience that reflects a broader curiosity about intelligent systems, language, and the networks behind modern computing.</p></div>
          <div className="publication-list">
            <article className="publication reveal"><div><div className="publication-number">P / 01</div><h3>AI System For Monitoring Mental Health From Text</h3></div><div className="publication-meta">IJWOS · Vol 02 Issue 12 · Dec 2025<br />ISSN 3049-2424 · DOI 10.71366</div></article>
            <article className="publication reveal stagger-2"><div><div className="publication-number">P / 02</div><h3>Congestion Control Techniques in Computer Networks</h3></div><div className="publication-meta">IJEDR · Vol 13 Issue 3 · Jul 2025<br />ISSN 2321-9939</div></article>
          </div>
        </div>
      </section>

      <section className="contact-band" id="contact">
        <div className="container-wide contact-layout">
          <div className="reveal"><div className="eyebrow" style={{ color: 'inherit' }}>07 / Contact</div><h2 className="contact-title">Let&apos;s find<br />the signal.</h2></div>
          <div className="reveal stagger-2"><p className="contact-copy">For entry-level data analyst and business intelligence opportunities, I&apos;d be glad to compare notes and talk through the work.</p><div className="contact-links"><a className="contact-link" href="mailto:ronit7707singh@gmail.com" data-testid="link-email-contact"><Mail size={15} />ronit7707singh@gmail.com</a><a className="contact-link" href="tel:+918102536755" data-testid="link-phone-contact"><Phone size={15} />+91 8102536755</a><a className="contact-link" href="https://www.linkedin.com/in/ronit-singh7" target="_blank" rel="noreferrer" data-testid="link-linkedin-contact"><Linkedin size={15} />linkedin.com/in/ronit-singh7 <ExternalLink size={12} /></a><button className="contact-link" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', textAlign: 'left' }} onClick={copyEmail} data-testid="button-copy-email">{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Copied email address' : 'Copy email address'}</button></div></div>
        </div>
      </section>

      <footer className="footer">
        <div className="container-wide footer-inner"><span>© 2026 Ronit Kumar</span><span>Built around questions, not templates.</span><a href="#top" data-testid="link-back-to-top">Back to top ↑</a></div>
      </footer>

      {selectedProject && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProject(null); }}><section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" data-testid="modal-project-detail"><button className="modal-close" aria-label="Close project details" data-testid="button-close-project-modal" onClick={() => setSelectedProject(null)}><X size={17} /></button><div className="eyebrow">{selectedProject.number} / {selectedProject.category}</div><h2 className="modal-title" id="project-dialog-title">{selectedProject.title}</h2><div className="project-meta" style={{ textAlign: 'left' }}>{selectedProject.date}</div><p className="modal-copy" style={{ marginTop: 23 }}>{selectedProject.details}</p><div className="modal-detail"><strong>Stack</strong><p className="modal-copy" style={{ margin: 0 }}>{selectedProject.stack}</p></div><div className="hero-actions"><button className="button-primary" onClick={() => setSelectedProject(null)} data-testid="button-close-project-details">Back to projects <ArrowUpRight size={15} /></button></div></section></div>}
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;