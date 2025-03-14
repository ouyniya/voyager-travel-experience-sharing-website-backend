const express = require("express");
const placeController = require("../controllers/place-controller.js");
const router = express.Router();
const authenticate = require("../")

router.post("/", authenticate, placeController.createPlace); // create places
router.put("/:postId", authenticate, placeController,updatePlace); // Update Place
router.delete("/:postId", authenticate, placeController.deletePlace); // delete place

module.exports = router;
