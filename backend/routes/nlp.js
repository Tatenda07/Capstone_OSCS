//NPM Packages
const express = require("express");
const router = express.Router();

// import natural language processing (nlp) controller
const nlpController = require('../controllers/nlp');

// HTTP Request Route: POST - http://localhost:5000/api/nlp/s-analyzer
router.post('/s-analyzer', nlpController.sentimentAnalyzer);

module.exports = router;