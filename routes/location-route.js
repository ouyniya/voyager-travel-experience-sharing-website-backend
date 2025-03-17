const express = require("express");
const locationController = require("../controllers/location-controller.js");
const router = express.Router();

router.get("/province", locationController.getProvince); 
router.get("/district", locationController.getDistrict); 

module.exports = router;
