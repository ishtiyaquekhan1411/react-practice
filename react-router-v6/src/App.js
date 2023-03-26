import { Route, Routes, Navigate, Link } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Comments from "./components/comments/Comments";
import AllQuotes from './pages/AllQuotes';
import NewQuote from './pages/NewQuote';
import QuoteDetail from './pages/QuoteDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={< Navigate to="/quotes" />} />
          <Route path="/quotes" element={<AllQuotes />} />
          <Route path="/quotes/:quoteId" element={<QuoteDetail />} >
            <Route
              path="" 
              element={
                <div className="centered">
                  <Link className="btn--flat" to="comments">Load Comments</Link>
                </div>
              }
            />
            <Route path="comments" element={<Comments />} />
          </Route>
          <Route path="/new-quote" element={<NewQuote />} />
          <Route path="*" element={<NotFound />} />
            {/* Wildcard route to match everything which should be kept at last for general routing pages like not found. */}
            {/* Pages should be created for routes from where we can call respective components */}
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
