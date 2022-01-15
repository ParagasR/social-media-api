const User = require('../models/Users');
const Thoughts = require('../models/Thought');

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
    res.status(200).json(userData)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteUser = async (req, res) => {
  try {
    const userData = await User.findOneAndDelete({ _id: req.params.userId })
    if (!userData) {
      res.status(404).json({ message: 'User does not exist' })
    }

    userData.friends.forEach(async (element) => {
      const friendData = await User.updateMany(
        { _id: element._id },
        { $pull: { friends: userData._id } },
        { many: true }
      )
    });

    userData.thoughs.forEach(async (element) => {
      const thoughtData = await Thoughts.deleteMany({ _id: element._id })
    })

    res.status(200).json(userData)
  } catch (err) {
    console.log(err)
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