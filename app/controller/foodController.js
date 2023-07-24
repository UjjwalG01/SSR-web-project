const uuid = require("uuid").v4;
const Food = require("../model/foodModel");
const Category = require("../model/categoryModel");

exports.food = async (req, res) => {
  const foods = await Food.find().populate("category");
  res.render("food", { foods: foods });
};

exports.addFood = async (req, res) => {
  try {
    const extension = req.files.image.name.split(".")[1];
    const path = `/uploads/${uuid()}.${extension}`;
    await req.files.image.mv(`public${path}`);
    const { name, price } = req.body;
    const newFood = await Food.create({
      name: name,
      price: price,
      category: req.body.category,
      image: path,
    });
    await newFood.save();
    req.flash("success", "Food added successfully!");
    res.redirect("/food");
  } catch (err) {
    res.send("Failed to add " + err.message);
  }
};

exports.create = async (req, res) => {
  const categories = await Category.find();
  res.render("create", { categories: categories });
};

exports.getCategory = async (req, res) => {
  const foods = await Food.find();
  res.render("category", { foods: foods });
};

exports.destroy = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    req.flash("error", "Food removed successfully!");
    res.redirect("/food");
  } catch (err) {
    console.log("Error: " + err);
  }
};

exports.edit = async (req, res) => {
  const food = await Food.findById(req.params.id);
  const categories = await Category.find();
  res.render("edit", { food, categories });
};

exports.update = async (req, res) => {
  const food = await Food.findById(req.params.id);

  food.name = req.body.name;
  food.price = req.body.price;
  food.category = req.body.category;

  if (req.files?.image) {
    const extension = req.files.image.name.split(".")[1];
    const path = `/uploads/${uuid()}.${extension}`;
    await req.files.image.mv(`public${path}`);
    food.image = path;
  }

  await food.save();
  req.flash("success", "Food Updated successfully");
  res.redirect("/food");
};
