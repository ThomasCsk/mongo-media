const { User } = require('../models');

const userController = {

  getAllUser(req,res){
    User.find({})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err));
  },

  getUserById({ params },res){
    User.findOne({ _id: params.id})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err));
  },

  createUser({ body },res){
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err));
  },

  createFriend({ params, body }, res) {
    User.create(body)
    .then(({ _id}) => {
      User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: _id } },
      { new: true}
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
    })
      .catch(err => res.status(500).json(err));
  },

  updateUser({params,body},res){
    User.findOneAndUpdate({_id:params.id}, body, {new:true, runValidators:true})
    .then(dbUserData => {
      if(!dbUserData){
        res.status(404).json({message: 'No user found with this id'});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(500).json(err));
  },

  removeUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
  },

  removeFriend({ params }, res) {
    User.findOneAndDelete({ _id: params.friendId })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      else{
        User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
      }
    })
    .catch(err => res.json(err));
  }

};

module.exports = userController;