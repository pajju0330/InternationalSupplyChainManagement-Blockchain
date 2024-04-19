const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  phone: {
    type: String,
    required: [true, "Phone Number is Required"],
    unique: true,
  },
  userType: {
    type: String,
    required: [true, "User Type is Required"],
    enum: ["Logistic provider", "Retailer", "Warehouse manager", "Supplier", "Customer", "Distributor"], // Define possible user types
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

module.exports = mongoose.model("Users", userSchema);