const mongoose = require("mongoose");

// Define the CourseAllocation schema
const courseAllocationSchema = mongoose.Schema(
    {

        course: {
            type: String,
            required: [true, "Please add the course"],
        },

        courseCode: {
            type: String,
            required: [true, "Please add the course"],
        },

        lecturer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Staff", // Reference to the Staff model for the lecturer
            required: [true, "Please add the lecturer"],
        },
        
        creditHours: {
            type: String,
            required: [true, "Please add the credit hours"],
        },

    },
    {
        timestamps: true,
    }
);

// Export the CourseAllocation model
module.exports = mongoose.model("CourseAllocation", courseAllocationSchema);
