import { useQuery } from "@apollo/client";
import { RECOMMENDED_BOOKS } from "../queries";

const Recommended = ({ show }) => {
  const result = useQuery(RECOMMENDED_BOOKS);
  if (result.loading) {
    return <div>Loading</div>;
  }
  const favoriteGenre = result.data.me.favoriteGenre;
  const favoriteBooks = result.data.recommendedBooks;
  return show ? (
    <>
      <h1>Recommended</h1>
      <p>
        books in you favorite genre <strong>{favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th>Book Title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favoriteBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : null;
};
export default Recommended;
