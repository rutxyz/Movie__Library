


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Home.css'; // Import the CSS file for styling

// const Home = ({ userId }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [lists, setLists] = useState([]);
//   const [selectedListId, setSelectedListId] = useState('');
//   const [newListName, setNewListName] = useState('');

//   useEffect(() => {
//     const fetchLists = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/lists/${userId}`);
//         setLists(response.data.lists);
//       } catch (error) {
//         console.error('Error fetching lists:', error);
//       }
//     };

//     fetchLists();
//   }, [userId]);

//   const handleSearch = async () => {
//     setError('');
//     setLoading(true);
//     try {
//       const response = await axios.get(`https://www.omdbapi.com/?apikey=355e455b&s=${searchTerm}`);
//       setSearchResults(response.data.Search || []);
//     } catch (error) {
//       setError('An error occurred while fetching data.');
//     }
//     setLoading(false);
//   };

//   const handleAddToList = async (movieId) => {
//     if (!selectedListId || !movieId) return;
//     try {
//       await axios.post(`http://localhost:4000/lists/${selectedListId}/add`, { movieId });
//       // Refresh the lists after adding a movie
//       const updatedListsResponse = await axios.get(`http://localhost:4000/lists/${userId}`);
//       setLists(updatedListsResponse.data.lists);
//     } catch (error) {
//       console.error('Error adding movie to list:', error);
//     }
//   };

//   const handleCreateList = async () => {
//     if (!newListName) return;
//     try {
//       await axios.post(`http://localhost:4000/lists/create`, { name: newListName, userId });
//       // Refresh the lists after creating a new list
//       const updatedListsResponse = await axios.get(`http://localhost:4000/lists/${userId}`);
//       setLists(updatedListsResponse.data.lists);
//       setNewListName('');
//     } catch (error) {
//       console.error('Error creating list:', error);
//     }
//   };

//   return (
//     <div className="home-container">
//       <h1 className="home-heading">Discover Movies</h1>
//       <div className="search-container">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search movies..."
//           className="search-input"
//         />
//         <button onClick={handleSearch} disabled={loading} className="search-button">Search</button>
//       </div>
//       {loading && <p>Loading...</p>}
//       {error && <p className="error-message">{error}</p>}
//       <div className="movie-grid">
//         {searchResults.map((movie) => (
//           <div key={movie.imdbID} className="movie-card">
//             <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
//             <div className="movie-details">
//               <h3 className="movie-title">{movie.Title}</h3>
//               <p className="movie-year">Year: {movie.Year}</p>
//               <button onClick={() => handleAddToList(movie.imdbID)}>Add to List</button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div>
//         <h2>My Lists</h2>
//         <div>
//           <input
//             type="text"
//             value={newListName}
//             onChange={(e) => setNewListName(e.target.value)}
//             placeholder="Enter list name..."
//           />
//           <button onClick={handleCreateList}>Create List</button>
//         </div>
//         <ul>
//           {lists.map((list) => (
//             <li key={list._id}>
//               {list.name}
//               {/* Add remove option for each list item */}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Home;


// // src/pages/Home.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Home.css'; // Import the CSS file for styling


// const Home = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [lists, setLists] = useState([]);
//   const [selectedListId, setSelectedListId] = useState('');
//   const [newListName, setNewListName] = useState('');
//   const userId = localStorage.getItem('user-id');

//   useEffect(() => {
//     const fetchLists = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/lists/${userId}`, {
//           headers: {
//             'auth-token': localStorage.getItem('auth-token'),
//           },
//         });
//         setLists(response.data.lists);
//       } catch (error) {
//         console.error('Error fetching lists:', error);
//       }
//     };

//     fetchLists();
//   }, [userId]);

//   const handleSearch = async () => {
//     setError('');
//     setLoading(true);
//     try {
//       const response = await axios.get(`https://www.omdbapi.com/?apikey=355e455b&s=${searchTerm}`);
//       setSearchResults(response.data.Search || []);
//     } catch (error) {
//       setError('An error occurred while fetching data.');
//     }
//     setLoading(false);
//   };

//   const handleAddToList = async (movie) => {
//     if (!selectedListId || !movie) return;
//     try {
//       await axios.post(`http://localhost:4000/lists/${selectedListId}/add`, movie, {
//         headers: {
//           'auth-token': localStorage.getItem('auth-token'),
//         },
//       });
//       // Refresh the lists after adding a movie
//       const updatedListsResponse = await axios.get(`http://localhost:4000/lists/${userId}`, {
//         headers: {
//           'auth-token': localStorage.getItem('auth-token'),
//         },
//       });
//       setLists(updatedListsResponse.data.lists);
//     } catch (error) {
//       console.error('Error adding movie to list:', error);
//     }
//   };

//   const handleCreateList = async () => {
//     if (!newListName) return;
//     try {
//       await axios.post(`http://localhost:4000/lists/create`, { name: newListName, userId }, {
//         headers: {
//           'auth-token': localStorage.getItem('auth-token'),
//         },
//       });
//       // Refresh the lists after creating a new list
//       const updatedListsResponse = await axios.get(`http://localhost:4000/lists/${userId}`, {
//         headers: {
//           'auth-token': localStorage.getItem('auth-token'),
//         },
//       });
//       setLists(updatedListsResponse.data.lists);
//       setNewListName('');
//     } catch (error) {
//       console.error('Error creating list:', error);
//     }
//   };

//   return (
//     <div className="home-container">
//       <h1 className="home-heading">Discover Movies</h1>
//       <div className="search-container">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search movies..."
//           className="search-input"
//         />
//         <button onClick={handleSearch} disabled={loading} className="search-button">Search</button>
//       </div>
//       {loading && <p>Loading...</p>}
//       {error && <p className="error-message">{error}</p>}
//       <div className="movie-grid">
//         {searchResults.map((movie) => (
//           <div key={movie.imdbID} className="movie-card">
//             <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
//             <div className="movie-details">
//               <h3 className="movie-title">{movie.Title}</h3>
//               <p className="movie-year">Year: {movie.Year}</p>
//               <button onClick={() => handleAddToList({
//                 imdbID: movie.imdbID,
//                 title: movie.Title,
//                 year: movie.Year,
//                 poster: movie.Poster,
//               })}>
//                 Add to List
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div>
//         <h2>My Lists</h2>
//         <div>
//           <input
//             type="text"
//             value={newListName}
//             onChange={(e) => setNewListName(e.target.value)}
//             placeholder="Enter list name..."
//           />
//           <button onClick={handleCreateList}>Create List</button>
//         </div>
//         <ul>
//           {lists.map((list) => (
//             <li key={list._id} onClick={() => setSelectedListId(list._id)}>
//               {list.name}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Home;




// import React, { useState } from 'react';
// import axios from 'axios';
// import './Home.css'; // Import the CSS file for styling

// const Home = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSearch = async () => {
//     setError('');
//     setLoading(true);
//     try {
//       const response = await axios.get(`https://www.omdbapi.com/?apikey=355e455b&s=${searchTerm}`);
//       setSearchResults(response.data.Search || []);
//     } catch (error) {
//       setError('An error occurred while fetching data.');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="home-container">
//       <h1 className="home-heading">Discover Movies</h1>
//       <div className="search-container">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search movies..."
//           className="search-input"
//         />
//         <button onClick={handleSearch} disabled={loading} className="search-button">Search</button>
//       </div>
//       {loading && <p>Loading...</p>}
//       {error && <p className="error-message">{error}</p>}
//       <div className="movie-grid">
//         {searchResults.map((movie) => (
//           <div key={movie.imdbID} className="movie-card">
//             <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
//             <div className="movie-details">
//               <h3 className="movie-title">{movie.Title}</h3>
//               <p className="movie-year">Year: {movie.Year}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;




import React, { useState } from 'react';
import axios from 'axios';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=355e455b&s=${searchTerm}`);
      setSearchResults(response.data.Search || []);
    } catch (error) {
      setError('An error occurred while fetching data.');
    }
    setLoading(false);
  };

  const addToFavorites = async (movie) => {
    try {
      await axios.post('/lists/add-to-favorites', { movie });
      // You may want to show a success message or update the UI after adding to favorites
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-heading">Discover Movies</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search movies..."
          className="search-input"
        />
        <button onClick={handleSearch} disabled={loading} className="search-button">Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="movie-grid">
        {searchResults.map((movie) => (
          <div key={movie.imdbID} className="movie-card" onClick={() => addToFavorites(movie)}>
            <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
            <div className="movie-details">
              <h3 className="movie-title">{movie.Title}</h3>
              <p className="movie-year">Year: {movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
