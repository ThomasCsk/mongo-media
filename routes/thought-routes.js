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

// /thoughts/<userId>/<thoughtId>
router
.route('/:userId/:thoughtId')
.delete(deleteThought);


// /thoughts/<thoughtId>/reactions
router
  .route('/:thoughtId/reactions')
  .post(createReaction)

// /thoughts/<thoughtId>/reactions/<reactionId>
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);
module.exports = router;