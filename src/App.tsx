import { lazy, Suspense } from 'react';
import { Route, Switch } from 'wouter';
import { Background } from './components/Background';
import { Portfolio } from './Portfolio';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  status: 'active' | 'completed' | 'in-progress';
  videoSrc?: string;
}

export const projects: Project[] = [
  {
    title: 'Playground',
    description:
      'A playground for me to experiment with Python, it has an application featuring a custom question-generation engine and JSON data persistence layer designed to drill advanced bitwise logic operations, as well as applications featuring the visualization of connections between the objects.',
    tags: ['Python', 'Tools', 'JSON'],
    status: 'completed',
  },
  {
    title: 'AetherScope',
    description:
      'A website featuring some cool fractals using WebGL using Typescript.',
    tags: ['Typescript', 'Fractal', 'Website'],
    link: 'https://aetherscope.alexanderluo.com',
    status: 'completed',
  },
  {
    title: 'Nebulance',
    description:
      'A 3D space game with cool gameplay, using Three.js and React, go check it out in the link below!',
    tags: ['TypeScript', 'Game', '3D'],
    link: 'https://nebulance.alexanderluo.com',
    videoSrc: '/videos/nebulance-preview.mp4',
    status: 'active',
  },
  {
    title: 'Neon-Drift',
    description:
      'A 2D simple driving simulator with a futurstic feel, you can play by yourself, play with your freinds and even play with a bot!',
    tags: ['Typescript', 'Web-Game', '2D'],
    link: 'https://neon-drift.alexanderluo.com',
    status: 'completed',
  },
  {
    title: 'Velora-React',
    description:
      'A simple planner made by me, contains features like focus, priorities and interests',
    tags: ['Typescript', 'Planner', 'Useful'],
    link: 'https://velora-react.alexanderluo.com',
    status: 'completed',
  },
  {
    title: 'AxionPlot',
    description:
      'A 2D Desmos-like graphing engine, supports multiple equations and up to three constants',
    tags: ['Typescript', 'Graphing', 'Math'],
    link: 'https://axionplot.alexanderluo.com',
    status: 'completed',
  },
];

const ArticlePage = lazy(() =>
  import('./pages/ArticlePage').then((m) => ({ default: m.ArticlePage })),
);

function ArticleRouteFallback() {
  return (
    <div className="page page--has-section">
      <main className="content-view content-view--article">
        <p className="articles-intro">Loading article…</p>
      </main>
    </div>
  );
}

function App() {
  return (
    <>
      <Background />
      <Switch>
        <Route path="/articles/:slug">
          <Suspense fallback={<ArticleRouteFallback />}>
            <ArticlePage />
          </Suspense>
        </Route>
        <Route>{() => <Portfolio projects={projects} />}</Route>
      </Switch>
    </>
  );
}

export default App;
