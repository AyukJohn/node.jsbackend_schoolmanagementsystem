const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    studentID: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    gender: {
        type:String,
        required:[true, "please add Gender"]
    },
    address: {
        type: String,
        required: true,
    },
    program: {
        type: String,
        required: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    enrollment_date: {
        type: Date,
        default: Date.now,
    },
    image: {
        type:String,
    },
    isGraduatingStudent: {
        type: Boolean,
        default: false,
    },


}, {
    timestamps: true,
});

module.exports = mongoose.model("Student", studentSchema);
