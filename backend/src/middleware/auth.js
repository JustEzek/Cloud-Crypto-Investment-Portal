function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Please log in first.' });
  }
  return next();
}

function publicUser(user) {
  return {
    id: user.id,
    userid: user.userid,
    name: user.name,
    email: user.email,
    zipcode: user.zipcode,
    role: user.role,
    walletAddress: user.walletAddress
  };
}

module.exports = { requireLogin, publicUser };

