// NPM Packages
const passport = require('passport');
const _ = require('lodash');

// mongoose schema
const Student = require('../models/schema.student')

// add new student
exports.addStudent = async (req, res, next) => {
    try {
        let newStudent = await Student.create(req.body);

        res.status(201).send({
            message: 'New student created successfully!',
            payload: newStudent
        })
    } catch (err) {
        if (err.code === 11000) {
            // duplicate email address or phone number on account sign up
            res.status(422).send(['Student id, email or phone number is already registered with an existing account. Please sign up with a different phone number, email address and student id.']);
        } else {
            // other account validation errors
            err.statusCode === undefined ? err.statusCode = 500 : '';
            return next(err);
        }
        
    }
}

// authenticate student on login
exports.authentication = async (req, res) => {
    // call for passport authentication
    await passport.authenticate('student-local', (err, student, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        //registered user
        else if (student) return res.status(200).json({ "token": student.generateJwt() });
        //unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

// get student profile
exports.studentProfile = async (req, res) => {
    Student.findOne({ _id: req._id }, (err, student) => {
        if (!student)
            return res.status(404).json({ status: false, message: `No student record found with id ${req._id}` });
        else
            return res.status(200).json({ status: true, studentProfile : _.pick(student,['first_name', 'last_name', 'middle_initial', 'email', 'phone_number','role', 'college','student_id']) }); //lodash function '_.pick'
    });
}

// get all students 
exports.getAllStudents = async (req, res, next) => {
    try {
        // find all students and sort by id in descending order
        let getAllStudents = await Student.find().sort({ _id: -1 });

        res.status(200).send(
            getAllStudents
        )
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
    }
}

// get single student
exports.getSingleStudent = async (req, res, next) => {
    try {
        let getSingleStudent = await Student.findOne({ _id: req.params.id });

        if (getSingleStudent === null) {
            res.status(404).send({
                message: `No student found with record id: ${req.params.id}`
            })
        } else {
            res.status(200).send({
                 payload: getSingleStudent
            })
        }
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
    }
}

// update student
exports.updateStudent = (req, res, next) => {
    //check if student exists in the database
    Student.exists({ _id: req.params.id }).then((result) => {
        if (!result) {
            return res.status(404).send(`No student found with record id: ${req.params.id}`);
        } else {
            //fetch Student document
            Student.findById(req.params.id, (err, post) => {
                if (err) return next(err);

                //update user using lodash
                _.assign(post, req.body);
                post.save((err) => {
                    if(err) return next(err);

                    return res.status(200).json({
                        message: "Student details updated successfully!",
                        payload: post
                    });
                })
            });
        }
    });
}

// delete student 
exports.deleteStudent = async (req, res, next) => {
    try {
        let deletedStudent = await Student.findByIdAndDelete({ _id: req.params.id });

        res.status(200).send({
            message: "Student deleted.",
            payload: deletedStudent
        })
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
    }
}