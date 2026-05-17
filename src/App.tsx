import { lazy, Suspense } from 'react';
import { Route, Switch } from 'wouter';
import { Background } from './components/Background';
import { Portfolio } from './Portfolio';

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
        <Route component={Portfolio} />
      </Switch>
    </>
  );
}

export default App;
