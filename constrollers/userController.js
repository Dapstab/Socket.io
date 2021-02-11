const User = require("../models/userModel");
const factory = require("./handlerFactory");
//const catchAsync = require("../utils/catchAsync");

exports.createUser = factory.createOne(User);

/* exports.getRoomNames = catchAsync(async (req, res, next) => {
  const users = await User.aggregate([
    {
      $match: { activeRoom: "JavaScript" },
    },
    {
      $group: {
        _id: "$activeRoom",
        users: { $push: "$name" },
      },
    },
    {
      $project: { _id: 0 },
    },
  ]);

  console.log(users[0].users);

  res.status(200).json({
    status: "success",
    users,
  });
}); */
