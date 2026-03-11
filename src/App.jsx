import { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating";
import "./App.css";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const average = (arr) =>
  arr?.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const API_key = "769177b1";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // const handleCloseMovie = useCallback(() => {
  //   setSelectedId(null);
  // }, []);

  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((curr) => (curr === id ? null : id));
  }

  function handleAddWatched(movie) {
    setWatched((watched) => {
      const exists = watched?.some((el) => el.imdbID === movie.imdbID);
      if (exists) return;
      return [...watched, movie];
    });

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDelete(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <ListBox>
          {!movies.length && !error && !isLoading && (
            <p className="intro">Search to see movies</p>
          )}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              watchlist={false}
              watched={watched}
              onSelectMovie={handleSelectMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </ListBox>

        <ListBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <MovieList
                movies={watched}
                watchlist={true}
                onDelete={handleDelete}
              />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}

function Loader() {
  return (
    <div className="loader-wrapper">
      <span className="loader"></span>
    </div>
  );
}
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>❌</span> {message}
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function ListBox({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  function handleToggle() {
    setIsOpen((open) => !open);
  }

  return (
    <div className="box">
      <ToggleButton onToggle={handleToggle} isOpen={isOpen} />

      {isOpen && children}
    </div>
  );
}

function ToggleButton({ isOpen, onToggle }) {
  return (
    <button className="btn-toggle" onClick={onToggle}>
      {isOpen ? "–" : "+"}
    </button>
  );
}

function MovieList({ watchlist, movies, onSelectMovie, onDelete }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <ListItem
          movie={movie}
          key={movie.imdbID}
          watchlist={watchlist}
          onSelectMovie={onSelectMovie}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

function ListItem({ movie, watchlist, onSelectMovie, onDelete }) {
  function handleDelete(e) {
    e.stopPropagation();
    onDelete(movie.imdbID);
  }

  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>

      {watchlist ? (
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
          <button className="btn-delete" onClick={(e) => handleDelete(e)}>
            X
          </button>
        </div>
      ) : (
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      )}
    </li>
  );
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0);

  const isWatched = watched.some((el) => el.imdbID === selectedId);
  // const selectedMovie = watched.find((movie) => movie.imdbID === selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId,
  )?.userRating;

  const {
    Title,
    Year,
    Poster,
    Runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // if (imdbRating > 8) [isTop, setIsTop] = useState(true);

  // if (imdbRating > 8) return <p>Greatest Ever</p>;

  // const [isTop, setIsTop] = useState(() => {
  //   imdbRating > 8;
  // });
  // console.log(isTop);

  // useEffect(() => {
  //   setIsTop(imdbRating > 8);
  // }, [imdbRating]);

  // const isTop = imdbRating > 8;
  // console.log(isTop);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title,
      Year,
      Poster,
      imdbRating: Number(imdbRating),
      userRating,
      runtime: Number(Runtime.split(" ").at(0)),
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useKey("escape", onCloseMovie);

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_key}&i=${selectedId}`,
        );
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!Title) return;
    document.title = `Movie | ${Title}`;

    return function () {
      document.title = "cineRate - Movie review";
    };
  }, [Title]);

  useEffect(() => {
    if (userRating) countRef.current += 1;
  }, [userRating]);

  return (
    <div className="details">
      {error && <ErrorMessage />}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <img src={Poster} alt={`Poster of ${movie.Title}`} />

            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {released} &bull; {Runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          {/* {avgRating} */}

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <div className="rating-btn">
                      <button className="btn-add" onClick={handleAdd}>
                        + Add to list
                      </button>
                      <button
                        className="btn-cancel"
                        onClick={() => {
                          setUserRating("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p>You rated this movie {watchedUserRating} ⭐️</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>

          <button className="btn-back" onClick={onCloseMovie}>
            &larr;
          </button>
        </>
      )}
    </div>
  );
}

function Summary({ watched }) {
  const avgImdbRating = average(watched?.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched?.map((movie) => movie.userRating));
  const avgRuntime = average(watched?.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched?.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("enter", () => {
    if (document.activeElement === inputEl.current) return;

    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>cineRate</h1>
    </div>
  );
}
function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
