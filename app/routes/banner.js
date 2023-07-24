const router = require("express").Router();
const {
  getBanner,
  postBanner,
  showBanner,
} = require("../controller/bannerController");

router.get("/food/banner", getBanner);

router.post("/food/banner", postBanner);

router.get("/", showBanner);

module.exports = router;
