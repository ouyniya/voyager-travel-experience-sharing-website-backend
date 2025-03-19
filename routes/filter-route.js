const express = require("express");
const filterController = require("../controllers/filter-controller");
const router = express.Router();

router.get("/", filterController.getFilterPosts); // Get Comments by Post (no authenticate function)

module.exports = router;