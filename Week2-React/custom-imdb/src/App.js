import { useEffect, useState } from "react";
import MovieInfo from "./Movie";
import "./App.css";

// A movie poster project
// from example https://www.youtube.com/watch?v=b9eMGE7QtTk
// with optimization

const keyAPI = "http://www.omdbapi.com/?i=tt3896198&apikey=9b3044c6";

function App() {
  // Declare states
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [onStartUp, setOnStartUp] = useState(false);

  // Function to get all movies
  const movieSearch = async (keyWord, page = 1) => {
    if (keyWord.length < 3) {
      setMovies([]);
      setError("Enter at least 3 characters");
      return;
    }
    setError("");
    setOnStartUp(true);

    // Get all movies
    const response = await fetch(`${keyAPI}&s=${keyWord}&page=${page}`);
    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search);
      setTotalPages(Math.ceil(Number(data.totalResults / 10)));   // Paginating the data
      setCurrentPage(page);                                       // as the API only renders 10 results per page
    } else {
      setError("No movies found");
    }
  };

  // Handle user input events
  const getMovies = (event) => {      // hit search button
    setSearchKey(event.target.value);
  };
  const handleEnterKey = (event) => { // hit Enter
    if (event.key === "Enter") {
      movieSearch(searchKey);
    }
  };
  const handlePageChange = (newPage) => { // change page
    movieSearch(searchKey, newPage);
  };

  useEffect(() => {         // Renders the entire data 
    movieSearch("");        // Empty array to ensure data is only rendered once per user event
  }, []);

  return (      // returns HTML of the whole page
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

        {!onStartUp ? (
          <div className="welcome">
            <h2>Search for a title to get started!</h2>
          </div>
        ) : movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieInfo movie={movie} />       // Prop array to display data
            ))}
          </div>
        ) : (
          <div className="error">
            <h2>{error}</h2>
          </div>
        )}

        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
