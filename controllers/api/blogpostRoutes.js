const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');

// this is at the /api endpoint


// Make new blog post route
router.post('/newPost', async (req, res) => {
          
    // validating username
    const postData = await User.findOne({ where: { username: req.body.username } });
    
    if (!postData) {
      res
        .status(400)
        .json({ message: 'Incorrect username, please enter valid username' });
      return;
    }

    // create object with data structure I need for new blog post
    const bpData = {
        title: req.body.title,
        content: req.body.content,
        user_id: postData.id,
    }

    // render individual blog post page
    res.render('home');

    // create new blog post
    const newPost = await BlogPost.create(bpData);

    
});



// delete blog post route delete a blog post by its 'id' value
router.delete('/:id', async (req, res) => {
    try {
        const bpData = await BlogPost.destroy({
            where: { id: req.params.id }
        });

        // if wrong id entered
        if (!bpData) {
            res.status(404).json({message: 'no blog post found with this id'});
        } else {
            console.log(`\n Deleting blog post with id: ${req.params.id} \n`);
            res.status(200).json(bpData);
        }

    } catch (err) {
        res.status(500).json(err);
    }
})



// edit blog post route by its 'id' value
router.put('/:id', async (req, res) => {
    try {

        const bpData = await BlogPost.update(
            // set all attributes of blog posts to values passed in to req.body
            { title: req.body.title,
              content: req.body.content,
              user_id: req.body.user_id },
              { where: {id: req.params.id} }
        )

        // if wrong id entered
        if (!bpData) {
            res.status(404).json({message: 'no blog post found with this id'});
        } else {
            console.log(`\n Editing blog post record id: ${req.params.id} \n`)
            res.status(200).json(bpData);
        }
        

    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router;