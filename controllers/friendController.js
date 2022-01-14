const User = require('../models/Users');

// /api/users/:userId/friends/:friendId

const addFriend = async (req, res) => {
    try {
        const userData = User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )

        const friendData = User.findOneAndUpdate(
            { _id: req.params.friendId },
            { $addToSet: { friends: req.params.userId } },
            { runValidators: true, new: true }
        )

        if (!userData || friendData) {
            res.status(404).json({ message: 'Invalid Queries' })
        }

        res.status(200).json({ message: 'Friends successfully updated' })
    } catch (err) {
        res.status(500).json(err)
    }
}

const deleteFriend = async (req, res) => {
    try {
        const userData = User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )

        const friendData = User.findOneAndUpdate(
            { _id: req.params.friendId },
            { $pull: { friends: req.params.userId } },
            { runValidators: true, new: true }
        )

        if (!userData || friendData) {
            res.status(404).json({ message: 'Invalid Queries' })
        }

        res.status(200).json({ message: 'Friends successfully deleted' })
    } catch (err) {
        res.status(500).json(err)
    }
}