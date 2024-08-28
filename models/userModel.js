const mongoose = require("mongoose");



const userSchema = mongoose.Schema({

    name:{
        type: String,
        required:[true, "please add the username"],
    },

    email: {
        type:String,
        required:[true, "please add email address"]
    },


    password: {
        type:String,
        required:[true, "please add password"]
    },


},

    {
        timestamps:true,
    }

);

module.exports = mongoose.model("User", userSchema);