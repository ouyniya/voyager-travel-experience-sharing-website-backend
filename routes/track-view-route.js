const express = require("express");
const trackViewController = require("../controllers/track-view-controller");
const router = express.Router();

router.post("/", trackViewController.trackView);
router.get("/", trackViewController.getAllTrackViews);
router.get("/:postId", trackViewController.getTrackViewsByPostId);
router.get("/:placeId", trackViewController.getTrackViewsByPlaceId);

module.exports = router;