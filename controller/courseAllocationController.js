const asyncHandler = require("express-async-handler");
const CourseAllocation = require("../models/courseAllocationModel");
const Staff = require("../models/staffModel");
const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'john1234ayuk@gmail.com', // Replace with your email
        pass: 'smzdcdulxaqpwqej',  // Replace with your email password or an app-specific password
    },
});


const createCourseAllocation = asyncHandler(async (req, res) => {
    const { courseCode, course, lecturer, creditHours } = req.body;

    if (!courseCode || !course || !lecturer || !creditHours) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const lecturerExists = await Staff.findById(lecturer);
    if (!lecturerExists) {
        res.status(404);
        throw new Error("Lecturer not found");
    }

    const courseAllocation = new CourseAllocation({
        courseCode,
        course,
        lecturer: lecturerExists._id,
        creditHours
    });

    const savedCourseAllocation = await courseAllocation.save();



    const mailOptions = {
        from: 'Faculty Of Computing Admin', // Replace with your email
        to: lecturerExists.email, // The lecturer's email
        subject: 'Course Allocation Notification',
        text: `Dear ${lecturerExists.fullName},\n\nYou have been assigned the course "${course}" (Course Code: ${courseCode}) with ${creditHours} credit hours.\n\nBest regards,\nFaculty of Computing, Uniuyo`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });

    res.status(201).json(savedCourseAllocation);
});





const getCourseAllocations = asyncHandler(async (req, res) => {
    const courseAllocations = await CourseAllocation.find().populate('lecturer', 'fullName staffID');
    res.status(200).json(courseAllocations);
});



module.exports = {
    createCourseAllocation,
    getCourseAllocations,
};
