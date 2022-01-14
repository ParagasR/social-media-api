const Thoughts = require('../models/Thought');

const addReaction = async (req, res) => {
    try {
        const thoughtData = await Thoughts.findOneAndUpdate(
            { _id: req.params.ThoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        if (!thoughtData) {
            res.status(404).json({ message: 'Thought not found' })
        }
        res.status(200).json(thoughtData)
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteReaction = async (req, res) => {
    try {
        const thoughtData = await Thoughts.findOneAndDelete(
            { _id: req.params.ThoughtId },
            { $pull: { reactions: req.params.reactionId } },
        )
        if (!thoughtData) {
            res.status(404).json({ message: 'Thought not found' })
        }
        res.status(200).json(thoughtData)
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    addReaction,
    deleteReaction
}