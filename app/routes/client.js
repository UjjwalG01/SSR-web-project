const router = require("express").Router();
const {
  index,
  login,
  register,
  signup,
  attemptLogin,
  logout,
} = require("../controller/clientController");

router.get("/", index);
router.get("/login", login);
router.post("/login", attemptLogin);
router.get("/register", register);
router.post("/register", signup);
router.get("/logout", logout);

module.exports = router;
