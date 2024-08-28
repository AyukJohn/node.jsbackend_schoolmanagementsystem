const mongoose = require("mongoose");



const staffSchema = mongoose.Schema({

    fullName:{
        type: String,
        required:[true, "please add the Full Name"],
    },

    staffID: {
        type:String,
        required:[true, "please add staffID"]
    },

    designation: {
        type:String,
        required:[true, "please add Designation"]
    },

    qualification: {
        type:String,
        required:[true, "please add Qualification"]
    },

    date_of_birth: {
        type:String,
        required:[true, "please add Date of Birth"]
    },

    gender: {
        type:String,
        required:[true, "please add Gender"]
    },

    marital_status: {
        type:String,
        required:[true, "please add Marital Status"]
    },

    phoneNo: {
        type:String,
        required:[true, "please add Phone Number"]
    },

    email: {
        type:String,
        required:[true, "please add Email"]
    },

    image: {
        type:String,
    },


    employment_date: {
        type:String,
        required:[true, "please add Employment Date"]
    },

    employment_type: {
        type:String,
        required:[true, "please add Employment Type"]
    },

    salary_grade: {
        type:String,
        required:[true, "please add Salary/Grade"]
    },

    bank_account_number: {
        type:String,
        required:[true, "please add Bank Account Number"]
    },

    bank_name: {
        type:String,
        required:[true, "please add Bank Name"]
    },


    bank_account_name: {
        type:String,
        required:[true, "please add Bank Account Name"]
    },

    emergency_contact: {
        type:String,
        required:[true, "please add Emergency Contact"]
    },

    isHOD: {
        type: Boolean,
        default: false,
    },
    isDean: {
        type: Boolean,
        default: false,
    },
    isOnLeave: {
        type: Boolean,
        default: false,
    },
    isDirector: {
        type: Boolean,
        default: false,
    },


},

    {
        timestamps:true,
    }

);

module.exports = mongoose.model("Staff", staffSchema);