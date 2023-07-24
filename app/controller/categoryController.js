const Category = require("../model/categoryModel");

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.find({});
    res.render("categoryShow", { category });
  } catch (err) {
    console.log(err);
  }
};

exports.postCategory = async (req, res) => {
  try {
    const { category, status } = req.body;
    const newCategory = await Category.create({
      category,
      status,
    });
    await newCategory.save();
    req.flash("success", "Category created successfully");
    res.redirect("/food/show-category");
  } catch (err) {
    console.log(err.message);
  }
};

exports.editCategory = async (req, res) => {
  const categories = await Category.findById(req.params.id);
  res.render("editCategory", { categories });
};

exports.updateCategory = async (req, res) => {
  const { category, status } = req.body;
  const categories = await Category.findById(req.params.id);
  categories.category = category;
  categories.status = status;
  await categories.save();
  req.flash("success", "Category updated successfully!");
  res.redirect("/food/show-category");
  console.log(categories);
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    req.flash("error", "Category deleted successfully");
    res.redirect("/food/show-category");
  } catch (err) {
    console.log(err);
  }
};

exports.toggleCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    category.status = category.status == "active" ? "inactive" : "active";
    await category.save();
    res.redirect("/food/show-category");
  } catch (err) {
    console.log(err);
  }
};
