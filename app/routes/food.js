const {
  create,
  food,
  addFood,
  edit,
  update,
  destroy,
  getCategory,
} = require("../controller/foodController");

const router = require("express").Router();

// const authMiddleware = require("../middleware/authMiddleware");

router.get("/", food);
router.post("/", addFood);
router.get("/create", create);
router.get("/category", getCategory);

router.get("/:id/edit", edit);
router.post("/:id/update", update);
router.get("/:id/delete", destroy);

module.exports = router;
