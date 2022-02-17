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
            max: 3,
            /*
             *  0 = In queue
             *  1 = Received by CSC personnel
             *  2 = Pending SSO response
             *  3 = Resolved
             */
            validate: {
                validator: Number.isInteger,
                message: "{VALUE} is not an integer value",
            },
            default: 0
        },
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