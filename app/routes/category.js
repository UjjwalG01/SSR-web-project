const {
  getCategory,
  postCategory,
  editCategory,
  updateCategory,
  deleteCategory,
  toggleCategory,
} = require("../controller/categoryController");

const router = require("express").Router();

router.get("/food/show-category", getCategory);

router.post("/food/category", postCategory);

router.get("/food/category/:id/edit", editCategory);

router.post("/food/category/:id/update", updateCategory);

router.get("/food/category/:id/delete", deleteCategory);

router.get("/food/category/:id/toggle", toggleCategory);

module.exports = router;
