const Student = require('../models/studentModel');
const Course = require('../models/courseModel');
const mongoose = require('mongoose');

// Create Student
exports.createStudent = async (req, res) => {
  try {
    const { name, email, phone, age } = req.body;

    if (age < 18) {
      return res.status(400).json({ message: 'Age must be at least 18' });
    }

    const student = new Student({ name, email, phone, age });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Student
exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Student ID' });
  }
  try {
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Student
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Student ID' });
  }
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Student ID' });
  }
  try {
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (student.enrolledCourses.length > 0) {
      return res.status(400).json({ message: 'Cannot delete student while enrolled in courses' });
    }

    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Enrollment Logic (5. Enrollment Requirements)
exports.enrollStudent = async (req, res) => {
  const { studentId, courseId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (!student.isActive) {
      return res.status(400).json({ message: 'Student account is inactive' });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (!course.isPublished) {
      return res.status(400).json({ message: 'Course is not published' });
    }

    if (student.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Student is already enrolled in this course' });
    }

    student.enrolledCourses.push(courseId);
    await student.save();

    res.status(200).json({ message: 'Enrollment successful', student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Populate Logic (6. Populate Requirements)
exports.getEnrolledCourses = async (req, res) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({ message: 'Invalid Student ID' });
  }

  try {
    const student = await Student.findById(studentId).populate('enrolledCourses');
    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};