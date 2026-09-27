const Course = require("../models/courseModel");
const mongoose = require("mongoose");

// Create Course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, price, category, duration, isPublished } =
      req.body;

    if (price < 0) {
      return res.status(400).json({ message: "Price cannot be negative" });
    }

    if (duration <= 0) {
      return res
        .status(400)
        .json({ message: "Duration must be greater than 0" });
    }

    const existingCourse = await Course.findOne({ title, category });
    if (existingCourse) {
      return res.status(400).json({
        message: "Course with same title and category already exists",
      });
    }

    const course = new Course({
      title,
      description,
      price,
      category,
      duration,
      isPublished,
    });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Course
exports.getCourseById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Course ID" });
  }
  
  try {
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Course
exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Course ID" });
  }
  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Course ID" });
  }
  try {
    await Course.findByIdAndDelete(id);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
