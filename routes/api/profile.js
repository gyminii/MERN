const express = require('express');
const router = express.Router();

// @Route   GET api/profile
// @desc    Test route
// @acess   Public
router.get('/', (req, res) => res.send('profile Route'));

module.exports = router;
