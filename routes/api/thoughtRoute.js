const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtsController');

const {
    addReaction,
    deleteReaction
} = require('../../controllers/reactionController');

router.route('/')
    .get(getThoughts)
    .post(createThought)
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;