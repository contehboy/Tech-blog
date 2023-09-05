const router = require('express').Router();
const { Comment } = require('../../models');

// this is at the /api endpoint


// POST - create a new comment
router.post('/', async (req, res) => {
    try {
        console.log(`\n Making new comment with id: ${req.body.id} \n`);

        const commentData = await Comment.create(req.body);

        res.status(200).json(commentData);

    } catch (err) {
        res.status(400).json(err);
    }
});


// PUT - modify a comment by its 'id' value
router.put('/:id', async (req, res) => {
    try {

        const commentData = await Comment.update(
            // set all attributes of comments to values passed in to req.body
            { content: req.body.content,
              user_id: req.body.user_id,
              blogpost_id: req.body.blogpost_id  },
              { where: {id: req.params.id} }
        )

        // if wrong id entered
        if (!commentData) {
            res.status(404).json({message: 'no comment found with this id'});
        } else {
            console.log(`\n Editing comment record id: ${req.params.id} \n`)
            res.status(200).json(commentData);
        }
        

    } catch (err) {
        res.status(400).json(err)
    }
});


// DELETE - delete a comment by its 'id' value
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: { id: req.params.id }
        });

        // if wrong id entered
        if (!commentData) {
            res.status(404).json({message: 'no comment found with this id'});
        } else {
            console.log(`\n Deleting comment with id: ${req.params.id} \n`);
            res.status(200).json(commentData);
        }

    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;