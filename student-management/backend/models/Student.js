const mongoose = require("mongoose");
const { MockStudentModel } = require("../store");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [1, "Age must be at least 1"],
    },
    phone: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Graduated"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const MongooseStudent = mongoose.models.Student || mongoose.model("Student", studentSchema);

// Transparent proxy: uses real Mongoose when connected, fallback Mock model when offline
const StudentProxy = new Proxy(MongooseStudent, {
  construct(target, args) {
    if (mongoose.connection.readyState === 1) {
      return new target(...args);
    }
    return new MockStudentModel(...args);
  },
  get(target, prop) {
    if (mongoose.connection.readyState === 1) {
      return target[prop];
    }
    if (prop in MockStudentModel) {
      return MockStudentModel[prop];
    }
    return target[prop];
  },
});

module.exports = StudentProxy;
