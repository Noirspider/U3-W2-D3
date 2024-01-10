import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [movie, setMovie] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=7a5a7210&i=${params.id}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        setHasError(true);
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [params.id]);

  if (isLoading) {
    return <div>Caricamento in corso...</div>;
  }

  if (hasError) {
    return <div>Errore nel caricamento dei dettagli del film.</div>;
  }

  return (
    <div className="text-white p-5">
      <div className="text-center">
        <h1>
          {movie.Title} ({movie.Year})
        </h1>
        <img src={movie.Poster} alt={`Poster di ${movie.Title}`} />
      </div>
      <p>
        <strong>Genere:</strong> {movie.Genre}
      </p>
      <p>
        <strong>Regia:</strong> {movie.Director}
      </p>
      <p>
        <strong>Attori:</strong> {movie.Actors}
      </p>
      <p>
        <strong>Trama:</strong> {movie.Plot}
      </p>
      <p>
        <strong>Durata:</strong> {movie.Runtime}
      </p>
      <p>
        <strong>Valutazione:</strong> {movie.imdbRating}
      </p>
      <p>
        <strong>Premi:</strong> {movie.Awards}
      </p>
    </div>
  );
};

export default MovieDetail;
