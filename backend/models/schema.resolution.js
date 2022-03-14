/* 
 * Resolutions Schema
 * Resolutins addressing students complaints.
 * 
 */

// NPM Packages
const { Schema, model } = require("mongoose");
const moment = require('moment-timezone');
const autoIncrement = require("mongoose-auto-increment");

const resolutionSchema = new Schema({
    complaint_id: {
        type: Number,
        requred: true
    },
    user_id: {
        type: Number,
        required: true
    },
    resolution_header: {
        type: String,
        required: true
    },
    resolution_body: {
        type: String,
        required: true
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
resolutionSchema.plugin(autoIncrement.plugin, 'resolution');

const Resolution = model('resolution', resolutionSchema);

module.exports = Resolution;