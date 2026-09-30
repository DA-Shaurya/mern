const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// @route   GET /students or /api/students
// @desc    Get all students with optional search & course filter
router.get("/", async (req, res) => {
  try {
    const { search, course } = req.query;
    let query = {};

    if (course && course !== "All") {
      query.course = course;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { course: { $regex: search, $options: "i" } },
      ];
    }

    const students = await Student.find(query).sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route   GET /students/dashboard/stats
// @desc    Get aggregate stats for dashboard
router.get("/dashboard/stats", async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const courses = await Student.distinct("course");

    // Course distribution
    const courseDistribution = await Student.aggregate([
      { $group: { _id: "$course", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Average age
    const ageStats = await Student.aggregate([
      { $group: { _id: null, avgAge: { $avg: "$age" } } },
    ]);
    const avgAge = ageStats.length > 0 ? Math.round(ageStats[0].avgAge * 10) / 10 : 0;

    // Recent 5 students
    const recentStudents = await Student.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      totalStudents,
      totalCourses: courses.length,
      avgAge,
      courseDistribution,
      recentStudents,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to calculate stats", error: err.message });
  }
});

// @route   GET /students/:id
// @desc    Get single student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route   POST /students
// @desc    Create a student (As specified in PDF Step 5)
router.post("/", async (req, res) => {
  try {
    const { name, email, course, age, phone, gender, status } = req.body;
    if (!name || !email || !course || age === undefined) {
      return res.status(400).json({ message: "Please fill in all required fields (name, email, course, age)" });
    }

    const student = new Student({
      name,
      email,
      course,
      age: Number(age),
      phone: phone || "",
      gender: gender || "",
      status: status || "Active",
    });

    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: "Could not create student", error: err.message });
  }
});

// @route   PUT /students/:id
// @desc    Update a student (As specified in PDF Step 5)
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: "Could not update student", error: err.message });
  }
});

// @route   DELETE /students/:id
// @desc    Delete a student (As specified in PDF Step 5)
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Could not delete student", error: err.message });
  }
});

module.exports = router;
