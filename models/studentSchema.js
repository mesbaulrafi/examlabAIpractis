const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true },

  email: {
     type: String, 
     required: true, 
     unique: true },
  phone: {
     type: String,
      required: true },

  age: { 
    type: Number,
     required: true },

  isActive: { 
    type: Boolean, 
    default: true 
  },
  enrolledCourses: [{
     type: mongoose.Schema.Types.ObjectId, 
     ref: "Course" }],
});

module.exports = mongoose.model("Student", studentSchema);
