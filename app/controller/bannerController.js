const uuid = require("uuid").v4;
const Banner = require("../model/bannerModel");

exports.getBanner = async (req, res) => {
  const banner = await Banner.find();
  res.render("addBanner", { banner });
};

exports.postBanner = async (req, res) => {
  const { name } = req.body;

  const extension = req.files.image.name.split(".")[1];
  const path = `/uploads/${uuid()}.${extension}`;
  await req.files.image.mv(`public/${path}`);

  const newBanner = await Banner.create({
    name: name,
    image: path,
  });
  await newBanner.save();
  req.flash("success", "New Banner Added");
  res.redirect("/");
};

exports.showBanner = async (req, res) => {
  const banner = await Banner.find();
  res.render("home", { banner });
};
