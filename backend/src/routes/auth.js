const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { publicUser } = require('../middleware/auth');

const router = express.Router();
const useridPattern = /^[a-zA-Z0-9_]{3,40}$/;

router.post('/login', async (req, res, next) => {
  try {
    const { userid, password } = req.body;

    if (!useridPattern.test(userid || '') || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ message: 'Enter a valid user ID and password.' });
    }

    const user = await User.findOne({ where: { userid } });
    const isValid = user ? await bcrypt.compare(password, user.passwordHash) : false;

    if (!isValid) {
      return res.status(401).json({ message: 'The user ID or password is incorrect.' });
    }

    req.session.user = publicUser(user);
    return res.json({ message: 'Login successful.', user: req.session.user });
  } catch (error) {
    return next(error);
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out.' });
  });
});

router.get('/me', (req, res) => {
  res.json({ user: req.session.user || null });
});

module.exports = router;

