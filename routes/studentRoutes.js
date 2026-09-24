const express = require('express')
const router = express.Router()
const {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    enrollStudent,
    getEnrolledCourses
} = require('../controllers/studentController')

// Prefix endpoint: /api/v1/students
router.post('/', createStudent)                          // POST /api/v1/students
router.get('/', getStudents)                            // GET /api/v1/students
router.get('/:id', getStudentById)                      // GET /api/v1/students/:id
router.patch('/:id', updateStudent)                     // PATCH /api/v1/students/:id
router.delete('/:id', deleteStudent)                    // DELETE /api/v1/students/:id

// Enrollment & Populate Endpoints
router.post('/enrollment', enrollStudent)               // POST /api/v1/students/enrollment
router.get('/enrolled/:studentId', getEnrolledCourses)  // GET /api/v1/students/enrolled/:studentId

module.exports = router