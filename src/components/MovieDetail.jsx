import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [movie, setMovie] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch("http://www.omdbapi.com/?apikey=7a5a7210&s=" + params.id);

        if (response.ok) {
          const movieFetched = await response.json();
          console.log(movieFetched);
          setMovie(movieFetched);
        } else {
          setHasError(`Error during the request: ${response.statusText}`);
        }
      } catch (error) {
        console.error(error.message);
        setHasError(`An error occurred while fetching data.`);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      setIsLoading(true);
      fetchMovieData();
    }
  }, [params.id]);

  return (
    <div>
      <div>Movie Detail</div>
      {isLoading && <p>Loading...</p>}
      {hasError && <p>{hasError}</p>}
      {/* Renderizza i dettagli del film qui utilizzando lo stato `movie` */}
    </div>
  );
};

export default MovieDetail;
