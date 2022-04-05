/* 
 * Complaints Schema
 * Complaints raised by the students to the admin.
 * 
 */

// NPM Packages
const { Schema, model } = require("mongoose");
const moment = require('moment-timezone');
const autoIncrement = require("mongoose-auto-increment");

const complaintSchema = new Schema({
    student_id: {
        type: Number,
        requred: true
    },
    student_name: {
        type: String,
        required: true
    },
    complaint_header: {
        type: String,
        required: true
    },
    complaint_body: {
        type: String,
        required: true
    },
    complaint_status: {
        type: Number,
        min: 0,
        max: 4,
        /*
         *  0 = In queue
         *  1 = Received by CSC personnel
         *  2 = Complaint has been moderated by CSC personnel
         *  3 = Pending SSO response
         *  4 = Resolved
         */
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer value",
        },
        default: 0
    },
    moderated_by: {
        type: String,
        default: undefined
    },
    resolution_id: {
        type: Number,
        default: undefined
    },
    // is the complaint is part of FAQ 
    FAQ: {
        type: Number,
        min: 0,
        max: 1,
        /*
         *  0 = Complaint is NOT part of frequently asked questions (FAQ) list
         *  1 = Complaint is part of FAQ list
         */
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer value",
        },
        default: 0
    }
},
{
    // Additional Configuration for the createdAt and updateAt fields.
    timestamps: { 
        currentTime: () => {
            return moment().utc("Asia/Singapore").format();
        }
    }

});

// Auto-increment plugin that implements interger Object_id that increments automatically. 
complaintSchema.plugin(autoIncrement.plugin, 'complaint');

const Complaint = model('complaint', complaintSchema);

module.exports = Complaint;