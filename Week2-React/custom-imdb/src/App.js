import { useEffect, useState } from "react";
import MovieInfo from "./Movie";
import "./App.css";

// Taken from https://www.youtube.com/watch?v=b9eMGE7QtTk
const keyAPI = "http://www.omdbapi.com/?i=tt3896198&apikey=9b3044c6";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const movieSearch = async (keyWord, page = 1) => {
    if (keyWord.length < 4) {
      setMovies([]);
      setError("Enter at least 3 characters");
      return;
    }
    setError("");

    const response = await fetch(`${keyAPI}&s=${keyWord}&page=${page}`);
    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search);
      setTotalPages(Math.ceil(Number(data.totalResults / 10)));
      setCurrentPage(page);
    } else {
      setMovies([]);
      setError("No movies found");
    }
  };

  const getMovies = (event) => {
    setSearchKey(event.target.value);
  };
  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      movieSearch(searchKey);
    }
  };
  const handlePageChange = (newPage) => {
    movieSearch(searchKey, newPage);
  }

  useEffect(() => {
    movieSearch('');
  }, []);

  return (
    <>
      <div className="app">
        <h1>CineLand</h1>
        <div className="search">
          <input
            placeholder="What do you want to watch today?"
            value={searchKey}
            onChange={(e) => getMovies(e)}
            onKeyDown={handleEnterKey}
          />
          <img
            src="https://raw.githubusercontent.com/gist/adrianhajdin/997a8cdf94234e889fa47be89a4759f1/raw/f13e5a9a0d1e299696aa4a0fe3a0026fa2a387f7/search.svg"
            alt="search"
            onClick={() => movieSearch(searchKey)}
          />
        </div>

        {error ? (
          <div className="error">
            <h2>{error}</h2>
          </div>
        ) : movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieInfo movie={movie} />
            ))}
          </div>
        ) : null}

        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        </div>
      </div>
    </>
  );
}

export default App;
