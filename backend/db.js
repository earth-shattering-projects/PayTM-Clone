const mongoose = require("mongoose");

const { MONGO_URI } = require("./config");

mongoose
  .connect(`${MONGO_URI}/paytm`)
  .then(() => console.log("Connected to DB"));

const UserSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
