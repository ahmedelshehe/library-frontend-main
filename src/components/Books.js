import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import { useState } from "react";
const Books = (props) => {
  const [genre, setGenre] = useState("");
  const result = useQuery(ALL_BOOKS, { variables: { genre: genre } });
  const genreResult = useQuery(ALL_GENRES);
  if (result.loading) {
    return <div>loading...</div>;
  }
  const books = result.data.allBooks;
  const genres = genreResult.data.allGenres;

  return props.show ? (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th>Book Title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
      <button key="all" onClick={() => setGenre("")}>
        All
      </button>
    </div>
  ) : null;
};

export default Books;
