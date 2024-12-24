// routes/movieRoutes.js
const express = require("express");
const router = express.Router();
const { scrapYouTube } = require("../controllers/youController");
router.get("/", scrapYouTube);
module.exports = router;
