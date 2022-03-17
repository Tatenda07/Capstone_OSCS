// NPM Packages
const moment = require('moment-timezone');
const _ = require('lodash');

// mongoose schema
const Complaint = require('../models/schema.complaint');
const Resolution = require('../models/schema.resolution');

// add new complaint
exports.addComplaint = async (req, res, next) => {
    try {
        let newComplaint = await Complaint.create(req.body);

        res.status(201).send({
            message: 'Complaint created!',
            payload: newComplaint
        })
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
    }
}

// get all complaints 
exports.getAllComplaints = async (req, res, next) => {
    try {
        // find all complaints and sort by id in descending order
        let getAllComplaints = await Complaint.find().sort({ _id: -1 });

        if (getAllComplaints.length === 0) {
            res.status(200).send({
                message: 'There are no complaints from the students at the moment.'
            })
        } else {
            res.status(200).send(
                getAllComplaints
            )
        }        
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
    }
}

// get all complaints from a single student
exports.getStudentComplaints = async (req, res, next) => {
    try {
        let getStudentComplaints = await Complaint.find({ student_id: req.params.student_id }).sort({ _id: -1 });

        if (getStudentComplaints.length === 0) {
            res.status(200).send({
                message: `There are no complaints from student with id: ${req.params.student_id}`
            })
        } else {
            res.status(200).send({
                payload: getStudentComplaints
            })
        }
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
    }
}

// get single complaint
exports.getSingleComplaint = async (req, res, next) => {
    try {
        let getSingleComplaint = await Complaint.findOne({ _id: req.params.id });

        if (getSingleComplaint === null) {
            res.status(404).send({
                message: 'Complaint not found.'
            })
        } else {
            res.status(200).send({
                payload: getSingleComplaint
            })
        }
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
    }
}

// update complaint (update from the owner of the complaint: the student)
exports.updateComplaint = (req, res, next) => {
    //check if Complaint exists in the database
    Complaint.exists({ _id: req.params.id }).then((result) => {
        if (!result) {
            return res.status(404).send('Complaint not found.');
        } else {
            //fetch Complaint document
            Complaint.findById(req.params.id, (err, post) => {
                if (err) return next(err);

                //update Complaint using lodash
                _.assign(post, req.body);
                post.save((err) => {
                    if(err) return next(err);

                    return res.status(200).json({
                        message: "Your complaint has been updated!",
                        payload: post
                    });
                })
            });
        }
    });
}

// delete complaint
exports.deleteComplaint = async (req, res, next) => {
    try {
        let deletedComplaint = await Complaint.findByIdAndDelete({ _id: req.params.id });

        // delete resolution to the complaint if any
        if (deletedComplaint.resolution_id !== undefined) {
           let deleteResolution = await Resolution.findOneAndDelete({ _id: deletedComplaint.resolution_id })
        }

        res.status(200).send({
            message: "Complaint (and Resolution, if any) has been deleted."
        })
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
    }
}