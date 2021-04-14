const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
// @Route   GET api/users
// @desc    Register User
// @acess   Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array });
    }
    const { name, email, password } = req.body;

    try {
      // See if user exists
      // Existing user should not be able to register with same email
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
      // Get user gravatar
      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
      user = new User({ name, email, avatar, password });
      // Encrypt password (hash )
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      // return JSON webtoken
      res.send('User Registered');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
