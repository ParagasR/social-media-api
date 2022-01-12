const User = require('../models/Users');

const getUsers = async (req, res) => {
  try {
    const allUserData = await User.find();
    if (!allUserData) {
      res.status(404).json({ message: 'There are no users' });
    }
    res.status(200).json(allUserData);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getSingleUser = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')
      .populate('friends');
    if (!userData) {
      res.status(404).json({ message: 'There is no user by that Id' });
    }
    res.status(200).json(userData);
  } catch {
    res.status(500).json(err);
  }
}

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser)
  } catch {
    res.status(500).json(err);
  }
}

const updateUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}


module.exports = { getUsers, getSingleUser, createUser, updateUser, deleteUser }