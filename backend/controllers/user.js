// NPM Packages
const passport = require('passport');
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
        if (err.code === 11000) {
            // duplicate email address or phone number on account sign up
            res.status(422).send(['The entered email or phone number is already registered with an existing account. Please sign up with a different phone number and email address.']);
        } else {
            // other account validation errors
            err.statusCode === undefined ? err.statusCode = 500 : '';
            return next(err);
        }
        
    }
}

// authenticate user on login
exports.authentication = async (req, res) => {
    // call for passport authentication
    await passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        //registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        //unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

// get user profile
exports.userProfile = async (req, res) => {
    User.findOne({ _id: req._id }, (user) => {
        if (!user)
            return res.status(404).json({ status: false, message: 'User record not found.' });
        else
        return res.status(200).json({ status: true, userProfile : _.pick(user,['first_name', 'last_name', 'middle_initial', 'email', 'phone_number','role']) }); //lodash function '_.pick'
    });
}

// get all users 
exports.getAllUsers = async (req, res, next) => {
    try {
        // find all users and sort by id in descending order
        let getAllUsers = await User.find().sort({ _id: -1 });

        res.status(200).send(
            getAllUsers
        )
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