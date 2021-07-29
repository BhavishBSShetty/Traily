import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";
// import axios from "axios";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // a snippt code runs on special condition
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.original_title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          // console.log(url, movie);
        })
        .catch((error) => {
          setTrailerUrl("Ob4NC4D6zTU");
          console.log(error);
        });
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      {/* title */}
      <div className="row_posters">
        {movies.map((movie) =>
          movie?.backdrop_path ? (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            />
          ) : (
            ""
          )
        )}
      </div>
      {/* container */}

      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
