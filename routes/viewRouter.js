const express = require("express");
const viewController = require("../constrollers/viewController");

const router = express.Router();

router.get("/", viewController.getOverview);
router.get("/chat/:username", viewController.getRoom);

module.exports = router;
