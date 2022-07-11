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

// /users/<userId>/<friendId>
router
  .route('/:userId/:friendId')
  .put(createFriend)
  .delete(removeFriend);

module.exports = router;