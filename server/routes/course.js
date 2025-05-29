const express = require('express');
const router = express.Router();
const { createCourse, getAllCourses } = require('../controllers/courseController');

router.post('/create', createCourse);
router.get('/all', getAllCourses);

module.exports = router;
