const express = require("express");
const router = express.Router();
const Student = require("../models/Student"); // Your Student model
const Parent = require("../models/parent");   // Your Parent model
const Course = require("../models/Course");   // Your Course model

// Get courses for student via parent enrollment
router.post("/get-courses", async (req, res) => {
  try {
    const { email } = req.body;

    // Find the student by email
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Find the parent of the student
    const parent = await Parent.findById(student.parentId);
    if (!parent) return res.status(404).json({ message: "Parent not found" });

    // Get the courses the parent enrolled for this student
    const enrolledCourseIds = parent.enrolledCourses || [];

    // Fetch full course details
    const courses = await Course.find({ _id: { $in: enrolledCourseIds } });

    res.json({ courses });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
