// List.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const List = ({ userId }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/lists/${userId}`);
        setLists(response.data.lists);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };

    fetchLists();
  }, [userId]);

  return (
    <div>
      <h2>My Lists</h2>
      {lists.map(list => (
        <div key={list._id}>
          <h3>{list.name}</h3>
          <ul>
            {list.movies.map(movie => (
              <li key={movie._id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default List;
