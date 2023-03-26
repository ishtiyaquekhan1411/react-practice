import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();
  // It is used to redirect to specific page in programmatic navigation (in case to, trigger navigation action).
  // if we use push, it will add new entry to history stack.
  // if we use replace, it will replace current entry of history stack.
  // Similar to Redirect but it is imperative and Redirect is declarative.
  // Programmatic navigation means when a user is redirected as a result of an action that occurs on a route.
  
  useEffect(() => {
    if (status === 'completed') {
      history.push("/quotes")
    }
  }, [status, history]);

  const addQuoteHandler = quoteData => {
    sendRequest(quoteData);
  }

 return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />;
}

export default NewQuote;