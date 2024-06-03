const express = require('express');
const MovieList = require('../models/MovieList');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

// Get all lists for the authenticated user
router.get('/:userId', fetchuser, async (req, res) => {
  try {
    const lists = await MovieList.find({ userId: req.user.id });
    res.json({ success: true, lists });
  } catch (error) {
    res.status(500).json({ errors: 'Server error' });
  }
});

// Create a new list
router.post('/create', fetchuser, async (req, res) => {
  const { name } = req.body;
  try {
    const newList = new MovieList({ name, userId: req.user.id });
    await newList.save();
    res.status(201).json({ success: true, list: newList });
  } catch (error) {
    res.status(500).json({ errors: 'Server error' });
  }
});

// Add a movie to a list
router.post('/:listId/add', fetchuser, async (req, res) => {
  const { listId } = req.params;
  const { imdbID, title, year, poster } = req.body;
  try {
    const list = await MovieList.findOne({ _id: listId, userId: req.user.id });
    if (!list) {
      return res.status(404).json({ errors: 'List not found' });
    }
    list.movies.push({ imdbID, title, year, poster });
    await list.save();
    res.json({ success: true, list });
  } catch (error) {
    res.status(500).json({ errors: 'Server error' });
  }
});

// Remove a movie from a list
router.post('/:listId/remove', fetchuser, async (req, res) => {
  const { listId } = req.params;
  const { imdbID } = req.body;
  try {
    const list = await MovieList.findOne({ _id: listId, userId: req.user.id });
    if (!list) {
      return res.status(404).json({ errors: 'List not found' });
    }
    list.movies = list.movies.filter(movie => movie.imdbID !== imdbID);
    await list.save();
    res.json({ success: true, list });
  } catch (error) {
    res.status(500).json({ errors: 'Server error' });
  }
});

module.exports = router;
