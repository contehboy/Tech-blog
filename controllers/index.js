const router = require('express').Router();

const apiRoutes = require('./api');
//building an object in homeRoutes that contains a bunch of routes. Import this router object to be used by express
//all these routes are like a table of content for all available routes
const homeRoutes = require('./homeRoutes');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);


module.exports = router;