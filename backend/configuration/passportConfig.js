const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/schema.user');
const Student = require('../models/schema.student');

// user authentication
passport.use('user-local',
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            User.findOne({ email: username },
                (err, user) => {
                    if (err)
                        return done(err);
                    //unkown user
                    else if (!user)
                        return done(null, false, { message: 'Email is not registered' });
                    //wrong password
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password'});
                    //user authentication succeeded
                    else
                        return done(null, user);
                });
        }
    )
);

// student auhentication
passport.use('student-local',
    new localStrategy({ usernameField: 'student_id'},
        (username, password, done) => {
            Student.findOne({ student_id: username},
                (err, student) => {
                    if (err)
                        return done(err);
                    // unknown student
                    else if (!student)
                        return done(null, false, { message: 'Student ID is not registered' });
                    // wrong password
                    else if (!student.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password'});
                    //student authentication succeeded
                    else
                        return done(null, student);
                })
        }

    )
);