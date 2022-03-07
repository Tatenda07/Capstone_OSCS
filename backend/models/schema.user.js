/* 
 * Users Schema
 * Ohter users of Online Student Complaint Management System other than the students.
 * That is the admin, CSC personnel, and SSO personel
 */

// NPM Packages
const { Schema, model } = require("mongoose");
const moment = require('moment-timezone');
const autoIncrement = require("mongoose-auto-increment");
const validator = require('validator');
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
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
        default: 'N/A'
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
        required: true,
        enum: [
            'Admin',
            'SSO Personnel',
            'CSC Personnel'
        ]
    },
    password: {
        type: String,
        minLength: 8,
        required: true,
        trim: true
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
userSchema.pre('save', function (next) {
    var user = this;

    //hash the password if only it has been modified or is new
    if (!user.isModified('password'))
        return next();

    // hash the password
    bcrypt.genSalt(12, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            
            user.password = hash;
            user.saltSecret = salt;
            user.verify = hash;
            next();
        });
    });
});

// Methods
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// Auto-increment plugin that implements interger Object_id that increments automatically. 
userSchema.plugin(autoIncrement.plugin, 'user');

const User = model('user', userSchema);

module.exports = User;