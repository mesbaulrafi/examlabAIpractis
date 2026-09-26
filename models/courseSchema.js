const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true },

  description: { 
    type: String },

  price: {
     type: Number, 
     required: true 
    },
    
  category: {
     type: String,
      required: true 
    },
  duration: {
     type: Number,
      required: true 
    },
  isPublished: { 
    type: Boolean,
     default: false
     },
  createdDate: { 
    type: Date, 
    default: Date.now
   },
});

module.exports = mongoose.model("Course", courseSchema);
