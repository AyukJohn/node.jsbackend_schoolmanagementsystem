const mongoose = require('mongoose');


const departmentSchema = mongoose.Schema({

    name:{
        type: String, 
        required: [true, "Please add the Name of the Department"]
    }

},

    {
        timestamps:true,
    }

);

module.exports = mongoose.model("Department", departmentSchema);