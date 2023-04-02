import { useMutation, useQuery } from "@apollo/client";
import { ADD_AUTHOR_BORNYEAR, ALL_AUTHORS } from "../queries";
import { useState } from "react";
import Select from "react-select";
const Authors = (props) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const result = useQuery(ALL_AUTHORS);
  const [editAuthorBornyear] = useMutation(ADD_AUTHOR_BORNYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (result.loading) {
    return <div>loading...</div>;
  }
  const authors = result.data.allAuthors;
  const options = authors.map((author) => {
    return { value: author.name, label: author.name };
  });
  const submit = (e) => {
    e.preventDefault();
    if (name !== "" && year !== "") {
      editAuthorBornyear({
        variables: { name: name.value, setBornTo: Number(year) },
      });
      setName("");
      setYear("");
    }
  };
  return props.show ? (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Set Birth Date </h1>
      <form onSubmit={submit}>
        Author
        <div style={{ width: "10%" }}>
          <Select defaultValue={name} onChange={setName} options={options} />
        </div>
        <div>
          Born Year <br />
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  ) : null;
};

export default Authors;
