const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const Food = require("../model/foodModel");
const Banner = require("../model/bannerModel");

exports.index = async (req, res) => {
  const foods = await Food.find({
    name: new RegExp(req.query.q, "i"),
  }).populate("category");
  // const foods = await Food.find().populate("category");
  const banner = await Banner.find();
  res.render("home", { foods, banner });
};

exports.login = (req, res) => {
  res.render("login");
};

// Here
exports.attemptLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        req.session.user = user; // Setting the session
        res.redirect("/");
      } else {
        res.send("Username or Password incorrect!");
      }
    } else {
      res.send("User Not Found");
    }
  } catch (err) {
    res.send("Something went wrong: " + err.message);
  }
};

exports.register = (req, res) => {
  res.render("register");
};

exports.signup = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.redirect("/login");
  } catch (err) {
    res.redirect("/register");
  }
};

exports.logout = (req, res) => {
  if (req.session.user) {
    delete req.session.user;
  }
  res.redirect("/");
};
