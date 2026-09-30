const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { MockUserModel } = require("../store");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "student"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving in Mongoose
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const MongooseUser = mongoose.models.User || mongoose.model("User", userSchema);

// Transparent proxy
const UserProxy = new Proxy(MongooseUser, {
  construct(target, args) {
    if (mongoose.connection.readyState === 1) {
      return new target(...args);
    }
    return new MockUserModel(...args);
  },
  get(target, prop) {
    if (mongoose.connection.readyState === 1) {
      return target[prop];
    }
    if (prop in MockUserModel) {
      return MockUserModel[prop];
    }
    return target[prop];
  },
});

module.exports = UserProxy;
