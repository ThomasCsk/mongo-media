const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  createFriend,
  updateUser,
  removeUser,
  removeFriend
} = require('../controllers/user-controller');

// /users
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// /users/<userId>
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(removeUser);

// /users/<userId>/friends
router
  .route('/:userId/friends')
  .post(createFriend)

// /users/<userId>/friends/<friendId>
router
  .route('/:userId/friends/:friendId')
  .delete(removeFriend);

module.exports = router;