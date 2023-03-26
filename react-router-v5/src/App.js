import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/layout/Layout';
// import AllQuotes from './pages/AllQuotes';
// import NewQuote from './pages/NewQuote';
// import QuoteDetail from './pages/QuoteDetail';
// import NotFound from './pages/NotFound';
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = React.lazy(() => import('./pages/NewQuote'));
// React supports lazy loading in order to optimize performance and avoid downloading of all the asset at once.
// It will download NewQuote component when it is needed (called).
// We need this type of scenario in production to improve the performance.
const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));
const NotFound = React.lazy(() => import('./pages/NotFound'));


function App() {
  return (
    <div>
      <Layout>
        <Suspense fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }>
        {/* Suspense is needed in case of lazy loading of component where if component is not loaded react should show something on screen in order to avoid error.
          It does it using fallback component.
        */}
          <Switch>
            <Route path="/" exact>
              <Redirect to="/quotes" />
            </Route>
            <Route path="/quotes" exact>
              <AllQuotes />
            </Route>
            <Route path="/quotes/:quoteId">
              <QuoteDetail />          
            </Route>
            <Route path="/new-quote">
              <NewQuote />
            </Route>
            <Route path="*">
              {/* Wildcard route to match everything which should be kept at last for general routing pages like not found. */}
              {/* Pages should be created for routes from where we can call respective components */}
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
