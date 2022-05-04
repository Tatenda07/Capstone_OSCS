/* 
 * Students Schema
 * Defines the student information required during account registration and updating account information
 */

// NPM Packages
const { Schema, model } = require("mongoose");
const moment = require('moment-timezone');
const autoIncrement = require("mongoose-auto-increment");
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { createConnection } = require("mongoose");
const url = `mongodb+srv://Joelson:Joe7MongoDB@initial-cluster.vie6y.mongodb.net/Capstone-OSCMS?retryWrites=true&w=majority`;

// database URI connection required by autoIncrement
const connection = createConnection(url);

// initialize mongoose-auto-increment
autoIncrement.initialize(connection);

const studentSchema = new Schema({
    student_id: {
        type: Number,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    middle_initial: {
        type: String,
        maxlength: 5,
        default: undefined
    },
    college: {
        type: String,
        required: true,
        enum: [
            'Business',
            'Science and Technology',
            'Arts and Humanities',
            'Nursing',
            'Dentistry',
            'Education',
            'Theology',
            'Medicine',
            'Health'
        ]
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        trim: true,
        // Email Validator
        validate: {
            validator: validator.isEmail,
            message: 'Email is not a valid email',
            isAsync: false
        }
    },
    phone_number: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        // Phone number validator
        validate: {
            validator: validator.isMobilePhone,
            message: 'Phone number is not valid',
            isAsync: false
        }
    },
    role: {
        type: String,
        enum: [
            'Student'
        ],
        default: 'Student'
    },
    password: {
        type: String,
        minLength: 8,
        required: true,
        trim: true
    },
    account_status: {
        type: Number,
        min: 0,
        max: 2,
        /*
         *  0 = Deactivated
         *  1 = Active
         *  2 = Suspended
         */
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer value",
        },
        default: 1
    },
    saltSecret: String
},
{
    // Additional Configuration for the createdAt and updateAt fields.
    timestamps: { 
        currentTime: () => {
            return moment().utc("Asia/Singapore").format();
        }
    }

});

// Encrypt password before saving it to the database
studentSchema.pre('save', function (next) {
    var student = this;

    //hash the password if only it has been modified or is new
    if (!student.isModified('password'))
        return next();

    // hash the password
    bcrypt.genSalt(12, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(student.password, salt, (err, hash) => {
            if (err) return next(err);
            
            student.password = hash;
            student.saltSecret = salt;
            student.verify = hash;
            next();
        });
    });
});

// Methods
studentSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

studentSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id, role: this.role, student_id: this.student_id },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXP
        }
    );
}

// Auto-increment plugin that implements interger Object_id that increments automatically. 
studentSchema.plugin(autoIncrement.plugin, 'student');

const Student = model('student', studentSchema);

module.exports = Student;