const express = require("express");
const userController = require("../constrollers/userController");

const router = express.Router();

router.route("/").post(userController.createUser);
/* router.get("/getRoomNames", userController.getRoomNames); */

module.exports = router;
