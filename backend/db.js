const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { MONGO_URI } = require("./config");

mongoose
  .connect(`${MONGO_URI}/paytm`)
  .then(() => console.log("Connected to DB"));

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password_hash: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

UserSchema.methods.createHash = async (plainTextPassword) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword, salt);
};

UserSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password_hash);
};

const User = mongoose.model("User", UserSchema);

const AccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true },
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = {
  User,
  Account,
};
