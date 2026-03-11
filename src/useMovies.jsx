import { useState, useEffect } from "react";

const API_key = "769177b1";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // callback?.();

    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_key}&s=${encodeURIComponent(query)}`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error("Fetching movies failed, Try again!!");

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found!");

        setMovies(data.Search);
        setError("");
      } catch (error) {
        if (error.name !== "AbortError")
          (setError(error.message), console.log(error.message));
      } finally {
        setIsLoading(false);
      }
    }
    if (!query || query.length < 3) {
      setMovies([]);
      return;
    }

    // closeMovie();
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
