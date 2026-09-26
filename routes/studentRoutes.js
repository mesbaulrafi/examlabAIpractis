const express = require('express')
const router = express.Router()
const {
    createStudent,getStudents,getStudentById,updateStudent,deleteStudent,enrollStudent,getEnrolledCourses} = require('../controllers/studentController')


router.post('/', createStudent)                         
router.get('/', getStudents)                           
router.get('/:id', getStudentById)                     
router.patch('/:id', updateStudent)                     
router.delete('/:id', deleteStudent)                    


router.post('/enrollment', enrollStudent)               
router.get('/enrolled/:studentId', getEnrolledCourses)  

module.exports = router