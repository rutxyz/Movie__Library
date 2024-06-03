import React from 'react';

const MovieListHeading = (props) => {
  return (
    <div className="col">
      <h1 className="movie-list-heading">{props.heading}</h1>
    </div>
  );
};

export default MovieListHeading;
