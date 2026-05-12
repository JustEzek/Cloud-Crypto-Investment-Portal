const express = require('express');
const { Investment, User } = require('../models');
const { requireLogin } = require('../middleware/auth');

const router = express.Router();

router.get('/', requireLogin, async (req, res, next) => {
  try {
    const include = {
      model: User,
      as: 'user',
      attributes: ['userid', 'name', 'email', 'role', 'walletAddress']
    };

    const query =
      req.session.user.role === 'Customer'
        ? { where: { user_id: req.session.user.id }, include }
        : { include, order: [['id', 'ASC']] };

    const investments = await Investment.findAll(query);
    res.json({ investments });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

