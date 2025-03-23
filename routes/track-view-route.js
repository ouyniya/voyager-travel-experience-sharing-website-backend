const express = require("express");
const trackViewController = require("../controllers/track-view-controller");
const router = express.Router();

router.get("/places", trackViewController.getTrackViewsByPlace);
router.get("/", trackViewController.getAllTrackViews);
router.get("/:postId", trackViewController.getTrackViewsByPostId);
router.get("/place/:placeId", trackViewController.getTrackViewsByPlaceId);
router.get("/place/top/provinces", trackViewController.getTopProvinces);
router.post("/", trackViewController.trackView);

module.exports = router;
