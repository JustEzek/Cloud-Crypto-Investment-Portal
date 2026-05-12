const express = require('express');
const { User } = require('../models');
const { requireLogin, publicUser } = require('../middleware/auth');

const router = express.Router();
const ethereumAddress = /^0x[a-fA-F0-9]{40}$/;

router.post('/', requireLogin, async (req, res, next) => {
  try {
    const { walletAddress } = req.body;

    if (!ethereumAddress.test(walletAddress || '')) {
      return res.status(400).json({ message: 'Enter a valid Ethereum wallet address.' });
    }

    const user = await User.findByPk(req.session.user.id);
    user.walletAddress = walletAddress;
    await user.save();

    req.session.user = publicUser(user);
    res.json({ message: 'Wallet saved.', user: req.session.user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

