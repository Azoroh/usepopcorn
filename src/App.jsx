import { useState } from "react";
import "./App.css";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  const [movieData, setMovieData] = useState(tempMovieData);

  return (
    <>
      <NavBar />
      <main className="main">
        <MovieList movieData={movieData} />

        <MovieList movieData={tempWatchedData} />
      </main>
    </>
  );
}

function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span>🍿</span>
        <h1>usePopcorn</h1>
      </div>

      <input className="search" type="text" placeholder="Search movies..." />

      <p className="num-results">Found X results</p>
    </nav>
  );
}

function MovieList({ movieData }) {
  return (
    <div className="box">
      <button className="btn-toggle">-</button>

      {movieData === tempWatchedData && <Summary />}

      <ul className="list list-movies">
        {movieData.map((movie) => (
          <MovieItem key={movie.imdbID} movie={movie} movieData={movieData} />
        ))}
      </ul>
    </div>
  );
}

function MovieItem({ movie, movieData }) {
  return (
    <li>
      {movieData === tempWatchedData ? (
        <>
          <img src={movie.Poster} alt="Hello, My Name Is Doris poster" />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
        </>
      ) : (
        <>
          <img src={movie.Poster} alt="Hello, My Name Is Doris poster" />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </>
      )}
    </li>
  );
}

function Summary() {
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>0 movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>0.00</span>
        </p>
        <p>
          <span>🌟</span>
          <span>0.00</span>
        </p>
        <p>
          <span>⏳</span>
          <span>0 min</span>
        </p>
      </div>
    </div>
  );
}
