const { User } = require('../models');

const userData = [
    {
        username: 'test1',
        email: 'test1@hotmail.com',
        password: '12345'
    },
    {
        username: 'test',
        email: 'test@gmail.com',
        password: 'abcde'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;