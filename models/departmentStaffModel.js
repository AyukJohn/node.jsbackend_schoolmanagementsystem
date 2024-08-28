const mongoose = require('mongoose');

const departmentStaffSchema = mongoose.Schema({
    department:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Department', required: true 
    },

    staff:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Staff',
        required: true 
    },
    
});

module.exports = mongoose.model("DepartmentStaff", departmentStaffSchema);
