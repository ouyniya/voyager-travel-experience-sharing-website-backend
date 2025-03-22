const express = require("express");
const placeController = require("../controllers/place-controller.js");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");

// Routes definitions
// router.post("/", authenticate, placeController.createPlace);
// router.put("/:postId", authenticate, placeController.updatePlace);
// router.delete("/:postId", authenticate, placeController.deletePlace);
router.get("/", placeController.getPlaces);

module.exports = router;
