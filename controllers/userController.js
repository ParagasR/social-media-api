const User = require('../models/Users');

const getUsers = async (req, res) => {
  try {
    const allUserData = await User.find();
    if (!allUserData) {
      res.status(404).json({ message: 'There are no users' });
    }
    res.status(200).json(allUserData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
}

const getSingleUser = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.params.userId })
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' });
    if (!userData) {
      res.status(404).json({ message: 'User does not exist' });
    }
    res.status(200).json(userData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
}

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser)
  } catch (err) {
    res.status(500).json(err);
  }
}

const updateUser = async (req, res) => {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    if (!userData) {
      res.status(404).json({ message: 'User does not exist' })
    }
    res.status(200).json({ message: 'User successfully updated' })
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteUser = async (req, res) => {
  try {
    const userData = await User.fineOneAndRemove({ _id: req.params.userId })
    if (!userData) {
      res.status(404).json({ message: 'User does not exist' })
    }

    res.status(200).json({ message: 'User successfully removed' })
  } catch (err) {
    res.status(500).json(err)
  }
}


module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
}