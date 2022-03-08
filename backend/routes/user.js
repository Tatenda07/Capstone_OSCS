//NPM Packages
const express = require("express");
const router = express.Router();

// JWT Helper
const jwtHelper = require('../configuration/jwtHelper');

// import users controller
const userController = require('../controllers/user');

// HTTP Request Route: POST - http://localhost:5000/user
router.post('/', userController.addUser);

// HTTP Request Route: POST - http://localhost:5000/user/authenticate
router.post('/authenticate', userController.authentication);

// HTTP Request Route: GET - http://localhost:5000/user/profile
router.get('/profile', jwtHelper.verifyJwtToken, userController.userProfile);

// HTTP Request Route: GET - http://localhost:5000/user
router.get('/', userController.getAllUsers);

// HTTP Request Route: GET - http://localhost:5000/user/id
router.get('/:id', userController.getSingleUser);

// HTTP Request Route: PATCH - http://localhost:5000/user/id
router.patch('/:id', userController.updateUser);

// HTTP Request Route: DELETE - http://localhost:5000/user/id
router.delete('/:id', userController.deleteUser);

module.exports = router;