import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";
const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("user-token");
    setToken(token);
  }, []);
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      updateCache(
        client.cache,
        { query: ALL_BOOKS, variables: { genre: "" } },
        addedBook
      );
      alert(`Book ${addedBook.title} is added`);
    },
  });
  const logout = () => {
    setToken(null);
    localStorage.clear();
    setPage("login");
  };
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <>
            <button onClick={() => setPage("recommended")}>recommended</button>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <LoginForm
        setPage={setPage}
        setToken={setToken}
        show={page === "login"}
      />
      {token ? <Recommended show={page === "recommended"} /> : null}
    </div>
  );
};
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByTitle = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    };
  });
};
export default App;
