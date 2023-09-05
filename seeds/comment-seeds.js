const { Comment } = require('../models');

const commentData = [
    {
        content: 'this is comment 1',
        user_id: 1,
        blogpost_id: 2
    },
    {
        content: 'this is comment 2',
        user_id: 2,
        blogpost_id: 1
    },
    {
        content: 'this is comment 3',
        user_id: 1,
        blogpost_id: 1
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;