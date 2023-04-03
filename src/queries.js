import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query ($genre: String) {
    allBooks(genre: $genre) {
      published
      title
      genres
      author {
        name
        born
      }
    }
  }
`;
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
    }
  }
`;
export const ALL_GENRES = gql`
  query {
    allGenres
  }
`;
export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      id
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`;
export const ADD_AUTHOR_BORNYEAR = gql`
  mutation editAuthorBornyear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
export const ME = gql`
  query Me {
    me {
      username
      favoriteGenre
    }
  }
`;
export const RECOMMENDED_BOOKS = gql`
  query {
    me {
      username
      favoriteGenre
    }
    recommendedBooks {
      published
      title
      genres
      author {
        name
        born
      }
    }
  }
`;

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published
    author {
      name
      born
    }
    genres
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      author {
        born
        name
      }
      genres
      id
      published
      title
    }
  }
`;
