'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Hazard = new Schema({
    title: {
        type: String,
        required: 'Hazard title is required'
    },
    // environment: {
    //     type: String,
    //     required: 'Environment is required'
    // },
    // exposure: {
    //     type: String,
    //     required: 'Expposure is required'
    // },
    // trigger: {
    //     type: String,
    //     required: 'Trigger is required'
    // },
    // consequence: {
    //     type: String,
    //     required: 'Consequence is required'
    // },
    // likelihood: {
    //     type: [{
    //     type: String,
    //     enum: ['Very likely', 'Somewhat likely', 'Not likely']
    //     }],
    //     required: 'Likelihood is required'
    // },
    // risk_level: {
    //     type: [{
    //     type: String,
    //     enum: ['Almost no risk', 'Manageable risk', 'Extreme risk']
    //     }],
    //     required: 'Risk level is required'
    // },
    controls: {
        type: [String]
    }
});

module.exports = mongoose.model('Hazard', Hazard);

var Step = new Schema({
    step_number: {
        type: Number,
        required: 'Step number is required'
    },
    description: {
        type: String,
        required: 'Step description is required'
    },
    hazards: {
        type: [Hazard]
    }
});

module.exports = mongoose.model('Step', Step);

var JSA = new Schema({
    activity: {
        type: String,
        required: 'Activity name is required'
    },
    // num_views: {
    //     type: Number,
    //     required: 'Number of views is required',
    //     default: 0
    // },
    steps: {
        type: [Step],
        required: 'Set of steps is required'
    }
});

module.exports = mongoose.model('JSA', JSA);
