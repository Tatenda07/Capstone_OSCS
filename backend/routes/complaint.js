//NPM Packages
const express = require("express");
const router = express.Router();

// import complaints controller
const complaintController = require('../controllers/complaint');

// HTTP Request Route: POST - http://localhost:5000/complaint
router.post('/', complaintController.addComplaint);

// HTTP Request Route: GET - http://localhost:5000/complaint
router.get('/', complaintController.getAllComplaints);

// HTTP Request Route: GET - http://localhost:5000/complaint/resolved
router.get('/resolved', complaintController.getResolvedComplaints);

// HTTP Request Route: GET - http://localhost:5000/complaint/pending
router.get('/pending', complaintController.getPendingSSOResponse);

// HTTP Request Route: GET - http://localhost:5000/complaint/moderated
router.get('/moderated', complaintController.getModeratedComplaints);

// HTTP Request Route: GET - http://localhost:5000/complaint/inQueue
router.get('/inQueue', complaintController.getInQueueComplaints);

// HTTP Request Route: GET - http://localhost:5000/complaint/id
router.get('/:id', complaintController.getSingleComplaint);

// HTTP Request Route: GET - http://localhost:5000/complaint/studentComplaints/student_id
router.get('/studentComplaints/:student_id', complaintController.getStudentComplaints);

// HTTP Request Route: PATCH - http://localhost:5000/complaint/id
router.patch('/:id', complaintController.updateComplaint);

// HTTP Request Route: DELETE - http://localhost:5000/complaint/id
router.delete('/:id', complaintController.deleteComplaint);

module.exports = router;