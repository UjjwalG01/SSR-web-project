const auth = (req, res, next) => {
  if (!req.session.user) return res.redirect("/login"); // If session not in then redirect back to login page
  next();
};

module.exports = auth;
