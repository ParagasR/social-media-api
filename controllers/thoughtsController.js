const Thoughts = require('../models/Thought');

const getThoughts = async (req, res) => {
    try {
        const allThoughts = await Thoughts.find();
        if (!allThoughts) {
            res.status(404).json({ message: 'There are no thoughts' });
        }
        res.status(200).json(allThoughts)
    } catch (err) {
        res.status(500).json(err);
    }
}

const getSingleThought = async (req, res) => {
    try {
        const singleThouht = await Thoughts.findOne({ _id: req.params.thoughtId })
        if (!singleThouht) {
            res.status(200).json({ message: 'Thought does not exist' })
        }
        res.status(200).json(singleThouht)
    } catch (err) {
        res.status(500).json(err);
    }
}

const createThought = async (req, res) => {
    try {
        const newThought = await Thoughts.create(req.body);
        res.status(200).json(newThought)
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateThought = async (req, res) => {
    try {
        const thoughtData = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )

        if (!thoughtData) {
            res.status(404).json({ message: 'Thought does not exist' });
        }

        res.status(200).json('Thought successfully updated');
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteThought = async (req, res) => {
    try {
        const thoughtData = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thoughtData) {
            res.status(404).json({ message: 'Thought does not exist' });
        }
        res.status(200).json({ message: 'Thought successfully deleted' })
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
}