import { useParams, Outlet } from "react-router-dom";

import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
  const { sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true)
  // const match = useMatch();
  // In v6, useRouteMatch is changed to useMatch
  // Similar to useLocation but with more information of currently loaded route (Internally managed data).
  // { path: "/quotes/:quoteId", isExact: false, url: "/quotes/q2", params: { quoteId: 'qa2'} }

  const { quoteId } = useParams();

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return <div className="centered"><LoadingSpinner /></div>
  }

  if (error) {
    return <p className="centered">{error}</p>
  }

  if (!loadedQuote.text) {
    return <p className="centered">No quote found</p>
  }

  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
      <Outlet />
    </>
  )
}

export default QuoteDetail;