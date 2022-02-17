// NPM Packages
const _ = require('lodash');

// mongoose schema
const User = require('../models/schema.user');

// add new user
exports.addUser = async (req, res, next) => {
    try {
        let newUser = await User.create(req.body);

        res.status(201).send({
            message: 'New user created successfully!',
            payload: newUser
        })
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
    }
}

// get all users 
exports.getAllUsers = async (req, res, next) => {
    try {
        // find all users and sort by id in descending order
        let getAllUsers = await User.find().sort({ _id: -1 });

        res.status(200).send({
            payload: getAllUsers
        })
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
    }
}

// get single user
exports.getSingleUser = async (req, res, next) => {
    try {
        let getSingleUser = await User.findOne({ _id: req.params.id });

        if (getSingleUser === null) {
            res.status(404).send({
                message: `No user found with id: ${req.params.id}`
            })
        } else {
            res.status(200).send({
                payload: getSingleUser
            })
        }
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
    }
}

// update user
exports.updateUser = (req, res, next) => {
    //check if user exists in the database
    User.exists({ _id: req.params.id }).then((result) => {
        if (!result) {
            return res.status(404).send(`No user found with id: ${req.params.id}`);
        } else {
            //fetch User document
            User.findById(req.params.id, (err, post) => {
                if (err) return next(err);

                //update user using lodash
                _.assign(post, req.body);
                post.save((err) => {
                    if(err) return next(err);

                    return res.status(200).json({
                        message: "User details updated successfully!",
                        payload: post
                    });
                })
            });
        }
    });
}

// delete user
exports.deleteUser = async (req, res, next) => {
    try {
        let deletedUser = await User.findByIdAndDelete({ _id: req.params.id });

        res.status(200).send({
            message: "User deleted.",
            payload: deletedUser
        })
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
    }
}