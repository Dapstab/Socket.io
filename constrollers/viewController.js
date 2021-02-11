const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

exports.getOverview = (req, res) => {
  res.status(200).render("overview", {
    title: "Join chat",
  });
};

exports.getRoom = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ name: req.params.username });
  res.status(200).render("room", {
    title: user.activeRoom,
    user,
  });
});
