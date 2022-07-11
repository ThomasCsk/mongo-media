const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  createThought,
  createReaction,
  updateThought,
  deleteThought,
  deleteReaction
} = require('../controllers/thought-controller')

// /thoughts
router
  .route('/')
  .get(getAllThought)
  .post(createThought);

// /thoughts/<thoughtId>
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /thoughts/<thoughtId>/<reactionId>
router
  .route('/:thoughtId/:reactionId')
  .put(createReaction)
  .delete(deleteReaction);

module.exports = router;