//NPM Packages
const express = require("express");
const router = express.Router();

// import resolutions controller
const resolutionController = require('../controllers/resolution');

// HTTP Request Route: POST - http://localhost:5000/resolution
router.post('/', resolutionController.addResolution);

// HTTP Request Route: GET - http://localhost:5000/resolution
router.get('/', resolutionController.getAllResolutions);

// HTTP Request Route: GET - http://localhost:5000/resolution/id
router.get('/:id', resolutionController.getSingleResolution);

// HTTP Request Route: PATCH - http://localhost:5000/resolution/id
router.patch('/:id', resolutionController.updateResolution);

// HTTP Request Route: DELETE - http://localhost:5000/resolution/id
router.delete('/:id', resolutionController.deleteResolution);

module.exports = router;