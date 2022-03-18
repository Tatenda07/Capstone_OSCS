// NPM Packages
const moment = require('moment-timezone');
const _ = require('lodash');

// mongoose schema
const Resolution = require('../models/schema.resolution');
const Complaint = require('../models/schema.complaint');

// add new resolution
exports.addResolution = async (req, res, next) => {
    try {
        let newResolution = await Resolution.create(req.body);

        // link the resolution to the complaint 
        let resolvedComplaint = await Complaint.findByIdAndUpdate(
            {
                _id: newResolution.complaint_id
            },
            {
                $set: {
                    resolution_id: newResolution._id,
                    complaint_status: 4,
                    updatedAt: moment().utc("Asia/Singapore").format()
                }
            },
            {
                new: true
            }
        );

        res.status(201).send({
            message: 'Resolution added!',
            payload: newResolution
        })
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
    }
}

// get all resolutions 
exports.getAllResolutions = async (req, res, next) => {
    try {
        // find all resolutions and sort by id in descending order
        let getAllResolutions = await Resolution.find().sort({ _id: -1 });

        if (getAllResolutions.length === 0) {
            res.status(200).send({
                message: 'There are no resolutions posted yet.'
            })
        } else {
            res.status(200).send(
                getAllResolutions
            )
        }        
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
    }
}

// get single resolution
exports.getSingleResolution = async (req, res, next) => {
    try {
        let getSingleResolution = await Resolution.findOne({ _id: req.params.id });

        if (getSingleResolution === null) {
            res.status(404).send({
                message: 'Resolution not found.'
            })
        } else {
            res.status(200).send(
                getSingleResolution
            )
        }
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
    }
}

// update resolution
exports.updateResolution = (req, res, next) => {
    //check if resolution exists in the database
    Resolution.exists({ _id: req.params.id }).then((result) => {
        if (!result) {
            return res.status(404).send('Resolution not found.');
        } else {
            //fetch Resolution document
            Resolution.findById(req.params.id, (err, post) => {
                if (err) return next(err);

                //update Resolution using lodash
                _.assign(post, req.body);
                post.save((err) => {
                    if(err) return next(err);

                    return res.status(200).json({
                        message: "Resolution updated!",
                        payload: post
                    });
                })
            });
        }
    });
}

// delete resolution
exports.deleteResolution = async (req, res, next) => {
    try {
        let deletedResolution = await Resolution.findByIdAndDelete({ _id: req.params.id });

        // remove resolution link to the complaint 
        let unresolvedComplaint = await Complaint.findByIdAndUpdate(
            {
                _id: deletedResolution.complaint_id
            },
            {
                $set: {
                    resolution_id: undefined,
                    complaint_status: 3,
                    updatedAt: moment().utc("Asia/Singapore").format()
                }
            },
            {
                new: true
            }
        );

        res.status(200).send({
            message: "Resolution deleted."
        })
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
    }
}