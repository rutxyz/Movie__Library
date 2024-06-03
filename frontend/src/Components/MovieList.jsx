import React from 'react';

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;

	return (
		<div className='movie-grid'>
			{props.movies.map((movie, index) => (
				<div className='card movie-card' key={index}>
					<img src={movie.Poster} alt='movie' className='card-img-top' />
					<div
						onClick={() => props.handleFavouritesClick(movie)}
						className='card-body d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div>
				</div>
			))}
		</div>
	);
};

export default MovieList;
