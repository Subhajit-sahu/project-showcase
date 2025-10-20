/*
DevShowcase - Single-file React app (App.jsx)

Instructions:
1. Create a new React app (Vite recommended):
   npm create vite@latest dev-showcase -- --template react
   cd dev-showcase
2. Install dependencies:
   npm install react-router-dom
3. Install Tailwind CSS (recommended):
   Follow Tailwind setup for Create React App / Vite:
   https://tailwindcss.com/docs/guides/vite
   (Or you can use the included utility classes by adding Tailwind.)

4. Replace src/App.jsx with this file's content. Replace src/main.jsx to import './index.css' as Tailwind setup requires.
5. Start dev server: npm run dev (Vite) or npm start (CRA)

Notes:
- This single-file app uses Tailwind utility classes. If you don't want Tailwind, replace classNames with your own CSS.
- Video embedding supports YouTube (iframe), external MP4s, or local videos via <video> tag.
- Projects data is in the `PROJECTS` array; add your own objects.

Components in this file:
- App (default export) sets up Router and global layout
- Home: shows project cards and search/filter
- ProjectPage: shows details, video embed, carousel, links
- Carousel: simple image carousel

--- START OF CODE ---
*/

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// ---------------------- Sample project data ----------------------
const PROJECTS = [
  // {
  //   id: 'golds-gym',
  //   title: "Golds Gym",
  //   tagline: "Fitness learning platform with RapidAPI video integration",
  //   videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // example YouTube embed
  //   description: 'A platform to teach exercises with demo videos, exercise details, and downloadable resources.',
  //   techStack: ['React', 'Node.js', 'Tailwind', 'Material UI', 'RapidAPI'],
  //   features: ['Exercise library', 'YouTube integration', 'Responsive UI', 'Search & Filters'],
  //   githubLink: 'https://github.com/yourusername/golds-gym',
  //   liveLink: 'https://golds-gym.example.com',
  //   images: ['/assets/gold1.jpg','/assets/gold2.jpg','https://res.cloudinary.com/dvnuqwyhs/image/upload/v1757327276/wanderlust_DEV/wthqpquarfkypvdvbdkl.jpg'],
  //   learnings: 'Integrated third-party APIs, async data fetching, responsive layout, and video embedding techniques.'
  // },
  {
  id: 'storeit',
  title: "StoreIt",
  tagline: "A stylish cloud storage web app — your own personal drive",
  videoUrl: '/assets/storeit/storeitnew.mp4', // demo walkthrough video
  description:
    'StoreIt is a modern cloud-based storage platform that allows users to securely upload, manage, and share files up to 2GB — all without using local storage. It provides OTP-based authentication, smart file categorization (Documents, Media, etc.), and real-time file actions including rename, delete, download, and share functionality.',
  techStack: ['Next.js', 'React', 'Tailwind CSS', 'Appwrite'],
  features: [
    'Sign-in and Sign-up with OTP verification',
    'Upload up to 2GB data stored securely in the cloud',
    'Automatic file categorization (Documents, Media, etc.)',
    'Recently uploaded files section for quick access',
    'Rename, view details, delete, and download files',
    'File sharing between users via email within the platform',
    'Debounced search functionality for instant file lookup',
    'Responsive and minimal UI inspired by Google Drive'
  ],
  githubLink: 'https://github.com/Subhajit-sahu/storage-management-system', // replace with your actual repo link
  liveLink: 'https://storeit-henna.vercel.app/', // replace with your live Vercel URL
  images: [
    '/assets/storeit/img1.png',
    '/assets/storeit/img2.png',
    '/assets/storeit/img3.png',
    '/assets/storeit/img4.png',
    '/assets/storeit/img5.png',
    '/assets/storeit/img6.png',
    
  ],
  learnings:
    'Learned to integrate Appwrite backend for file management, implement OTP-based authentication, design efficient UI workflows, and optimize deployment with Vercel for a seamless full-stack experience.'
}

];

// ---------------------- Utility components ----------------------
function IconExternal() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7m0 0L10 14M21 10l-7 7" />
    </svg>
  );
}

function Navbar() {
  return (
    <nav className="bg-white/60 backdrop-blur border-b sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-xl">Subhajit — DevShowcase</Link>
        <div className="space-x-3">
          <a className="text-sm" href="#projects">Projects</a>
          <a className="text-sm" href="#about">About</a>
        </div>
      </div>
    </nav>
  );
}

// ---------------------- Home / Cards ----------------------
function Home() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const techs = [...new Set(PROJECTS.flatMap(p => p.techStack))];

  const filtered = PROJECTS.filter(p => {
    const matchQuery = (p.title + ' ' + p.description + ' ' + p.techStack.join(' ')).toLowerCase().includes(query.toLowerCase());
    const matchFilter = filter === 'All' || p.techStack.includes(filter);
    return matchQuery && matchFilter;
  });

  return (
    <div className="max-w-5xl mx-auto p-4">
      <header className="py-8">
        <h1 className="text-3xl font-bold">Project Showcase</h1>
        <p className="text-muted mt-2">Short video explanations, writeups, screenshots and links for each project.</p>
      </header>

      <div className="flex gap-3 items-center mb-6">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search projects..." className="flex-1 border rounded px-3 py-2" />
        <select value={filter} onChange={e => setFilter(e.target.value)} className="border rounded px-3 py-2">
          <option>All</option>
          {techs.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      <section id="projects" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filtered.map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-muted">No projects match your search.</div>
        )}
      </section>

     
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="h-44 bg-gray-50 flex items-center justify-center">
        {/* Thumbnail preview: if images exist show first image else simple placeholder */}
        {project.images && project.images.length ? (
          <img src={project.images[0]} alt={project.title} className="object-cover h-full w-full" />
        ) : (
          <div className="text-center p-4">No Image</div>
        )}
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-lg">{project.title}</h2>
        <p className="text-sm text-muted mt-1">{project.tagline}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs">
            {project.techStack.slice(0,3).map(t => (
              <span key={t} className="inline-block mr-2 px-2 py-1 rounded bg-gray-100 text-xs">{t}</span>
            ))}
          </div>
          <Link to={`/project/${project.id}`} className="text-sm font-medium underline">View Details</Link>
        </div>
      </div>
    </div>
  );
}

// ---------------------- Project Page ----------------------
function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === id);

  useEffect(() => {
    if (!project) {
      // If project not found, navigate home after a short timeout
      const to = setTimeout(() => navigate('/'), 1200);
      return () => clearTimeout(to);
    }
  }, [project, navigate]);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-2xl font-semibold">Project not found</h2>
        <p className="mt-2">Redirecting home...</p>
      </div>
    );
  }

  const isYouTube = project.videoUrl?.includes('youtube.com') || project.videoUrl?.includes('youtu.be');
  const isEmbed = project.videoUrl?.includes('/embed/');

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-4">
        <button onClick={() => navigate(-1)} className="text-sm underline">← Back</button>
      </div>

      <header className="bg-white p-6 rounded shadow-sm">
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <p className="mt-1 text-muted">{project.tagline}</p>
        <div className="mt-3">
          {project.techStack.map(t => <span key={t} className="inline-block mr-2 px-2 py-1 rounded bg-gray-100 text-xs">{t}</span>)}
        </div>
      </header>

      <main className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <div className="rounded overflow-hidden border">
            {/* Video area: detect youtube vs mp4 */}
            {project.videoUrl && (
              isYouTube || isEmbed ? (
                <div className="aspect-video">
                  <iframe className="w-full h-full" src={project.videoUrl} title={project.title} frameBorder="0" allowFullScreen></iframe>
                </div>
              ) : project.videoUrl.endsWith('.mp4') || project.videoUrl.startsWith('/') ? (
                <video controls className="w-full h-auto">
                  <source src={project.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="p-4">Unsupported video format. Provide an embed URL or MP4.</div>
              )
            )}
          </div>

          <div className="mt-4 bg-white p-4 rounded border">
            <h3 className="font-semibold">Description</h3>
            <p className="mt-2">{project.description}</p>

            <h4 className="mt-4 font-semibold">Features</h4>
            <ul className="list-disc ml-5 mt-2">
              {project.features.map(f => <li key={f}>{f}</li>)}
            </ul>

            <h4 className="mt-4 font-semibold">What I learned</h4>
            <p className="mt-2">{project.learnings}</p>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Screenshots</h4>
            <Carousel images={project.images} />
          </div>
        </section>

        <aside className="bg-white rounded p-4 border">
          <div>
            <a className="block mb-3" href={project.githubLink} target="_blank" rel="noreferrer">GitHub <IconExternal /></a>
            <a className="block mb-3" href={project.liveLink} target="_blank" rel="noreferrer">Live Demo <IconExternal /></a>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold">Meta</h4>
            <p className="text-sm mt-2">Project ID: <code className="bg-gray-100 px-1 rounded">{project.id}</code></p>
            <p className="text-sm mt-2">Tech: {project.techStack.join(', ')}</p>
          </div>
        </aside>
      </main>
    </div>
  );
}

// ---------------------- Carousel ----------------------
function Carousel({ images = [] }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return <div className="p-4 border rounded">No screenshots available.</div>;

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="relative">
      <div className="h-60 bg-gray-50 flex items-center justify-center overflow-hidden rounded">
        <img src={images[index]} alt={`shot-${index}`} className="object-contain h-full" />
      </div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button onClick={prev} className="px-3 py-2 rounded-r bg-white/80">‹</button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button onClick={next} className="px-3 py-2 rounded-l bg-white/80">›</button>
      </div>
      <div className="flex gap-2 mt-2 justify-center">
        {images.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full ${i===index? 'bg-gray-700':'bg-gray-300'}`} />
        ))}
      </div>
    </div>
  );
}

// ---------------------- App (Router) ----------------------
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="*" element={<Home />} />
        </Routes>

        <footer className="mt-12 border-t py-6 text-center text-sm text-muted">
          Built with ❤️ by Subhajit — Share the project link on LinkedIn.
        </footer>
      </div>
    </Router>
  );
}

/* --- END OF FILE --- */
