// models/MovieList.js
const mongoose = require('mongoose');

const movieListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  movies: [{
    imdbID: { type: String, required: true },
    title: { type: String, required: true },
    year: { type: String },
    poster: { type: String }
  }]
});

const MovieList = mongoose.model('MovieList', movieListSchema);
module.exports = MovieList;
