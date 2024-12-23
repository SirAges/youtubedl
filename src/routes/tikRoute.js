// routes/movieRoutes.js
const express = require("express");
const router = express.Router();
const { scrapTikTok } = require("../controllers/tikController");
router.post("/", scrapTikTok);
module.exports = router;
