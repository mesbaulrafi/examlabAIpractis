const express = require('express')
const router = express.Router()
const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} = require('../controllers/courseController')

// Prefix endpoint: /api/v1/courses
router.post('/', createCourse)             // POST /api/v1/courses
router.get('/', getCourses)               // GET /api/v1/courses
router.get('/:id', getCourseById)         // GET /api/v1/courses/:id
router.patch('/:id', updateCourse)        // PATCH /api/v1/courses/:id
router.delete('/:id', deleteCourse)       // DELETE /api/v1/courses/:id

module.exports = router