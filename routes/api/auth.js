const express = require('express');
const router = express.Router();

// @Route   GET api/auth
// @desc    Test route
// @acess   Public
router.get('/', (req, res) => res.send('Auth Route'));

module.exports = router;
