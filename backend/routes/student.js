//NPM Packages
const express = require("express");
const router = express.Router();

// JWT Helper
const jwtHelper = require('../configuration/jwtHelper');

// import student controller
const studentController = require('../controllers/student');

// HTTP Request Route: POST - http://localhost:5000/student
router.post('/', studentController.addStudent);

// HTTP Request Route: POST - http://localhost:5000/student/authenticate
router.post('/authenticate', studentController.authentication);

// HTTP Request Route: GET - http://localhost:5000/student/profile
router.get('/profile', jwtHelper.verifyJwtToken, studentController.studentProfile);

// HTTP Request Route: GET - http://localhost:5000/student
router.get('/', studentController.getAllStudents);

// HTTP Request Route: GET - http://localhost:5000/student/id
router.get('/:id', studentController.getSingleStudent);

// HTTP Request Route: PATCH - http://localhost:5000/student/id
router.patch('/:id', studentController.updateStudent);

// HTTP Request Route: DELETE - http://localhost:5000/student/id
router.delete('/:id', studentController.deleteStudent);

module.exports = router;