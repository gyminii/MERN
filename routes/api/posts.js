const express = require('express');
const router = express.Router();

// @Route   GET api/posts
// @desc    Test route
// @acess   Public
router.get('/', (req, res) => res.send('posts Route'));

module.exports = router;
