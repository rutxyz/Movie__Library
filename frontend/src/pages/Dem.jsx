import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dem.css';
import MovieList from '../Components/MovieList';
import MovieListHeading from '../Components/MovieListHeading';
import SearchBox from '../Components/SearchBox';
import AddFavourites from '../Components/AddFavourites';
import RemoveFavourites from '../Components/RemoveFavourites';

const Dem = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('auth-token');
    navigate('/');
  };

  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=355e455b`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <Fragment>
      <div className="logout-container">
        <button onClick={logout} className="btn btn-danger">Logout</button>
      </div>
      <div className="container-fluid movie-app">
        <div className="row mt-5 mb-3 text-center justify-content-center">
          <div className="col-12">
            <MovieListHeading heading="Discover Movies" />
            <div className="explore-container">
              <p className="mt-3 explore-now">Explore Now!</p>
            </div>
          </div>
          <div className="col-auto ml-auto">
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>
        </div>
        <div className="row">
          <MovieList
            movies={movies}
            handleFavouritesClick={addFavouriteMovie}
            favouriteComponent={AddFavourites}
          />
        </div>
        <div className="row d-flex align-items-center mt-5 mb-5 justify-content-center">
          <div className="col-12 text-center">
            <MovieListHeading heading="Favourites-List" />
          </div>
        </div>
        <div className="row">
          <MovieList
            movies={favourites}
            handleFavouritesClick={removeFavouriteMovie}
            favouriteComponent={RemoveFavourites}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default Dem;
