const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.json({ success: true, course });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error adding course' });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('tutorId', 'email');
    res.json({ success: true, courses });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching courses' });
  }
};
