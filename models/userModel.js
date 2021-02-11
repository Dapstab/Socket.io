const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Pleae tell us your name"],
    unique: true,
    trim: true,
  },
  activeRoom: {
    type: String,
    enum: {
      values: ["JavaScript", "Python", "PHP", "C#", "Ruby", "Java"],
      message: "Your room is wrong",
    },
  },
});

userSchema.methods.userLeave = async function () {
  await this.deleteOne();
};

const User = mongoose.model("User", userSchema);
module.exports = User;
