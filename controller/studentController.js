const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel"); // Adjust path as needed
const cloudinary = require("../config/cloudinary");




const getStudents = asyncHandler(async (req, res) => {
    const students = await Student.find().populate('department');
    res.status(200).json(students);
});



const createStudent = asyncHandler(async(req, res) => {

    const {
        fullName, studentID, email, phoneNo, date_of_birth, gender, address, program, department, enrollment_date
    } = req.body;

    const requiredFields = [
        'fullName', 'studentID', 'email', 'phoneNo', 
        'date_of_birth', 'gender', 'address', 'program', 'department', 'enrollment_date'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        res.status(400);
        throw new Error(`All fields are required. Missing fields: ${missingFields.join(', ')}`);
    }   

    const studentExists = await Student.findOne({ studentID, email });

    if (studentExists) {
        res.status(400);
        throw new Error("Student with this ID or email already exists");
    }

    try {
        let imageUrl = '';
        let public_id = '';

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'image',
                folder: 'students',
            });

            imageUrl = result.secure_url;
            public_id = result.public_id;
        }

        const student = await Student.create({
            fullName,
            studentID,
            email,
            phoneNo,
            date_of_birth,
            gender,
            address,
            program,
            department,
            enrollment_date,
            image: imageUrl, // Save the image URL
            public_id // Save the public_id from Cloudinary
        });

        res.status(201).json({
            message: 'Student created successfully',
            student
        });

    } catch (error) {
        return res.status(400).send(error);
    }
});





const getStudentById = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id).populate('department');

    if (student) {
        res.json(student);
    } else {
        res.status(404);
        throw new Error('Student not found');
    }
});



const updateStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);

    if (student) {
        student.fullName = req.body.fullName || student.fullName;
        student.studentID = req.body.studentID || student.studentID;
        student.email = req.body.email || student.email;
        student.phoneNo = req.body.phoneNo || student.phoneNo;
        student.date_of_birth = req.body.date_of_birth || student.date_of_birth;
        student.gender = req.body.gender || student.gender;
        student.address = req.body.address || student.address;
        student.program = req.body.program || student.program;
        student.department = req.body.department || student.department;

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } else {
        res.status(404);
        throw new Error('Student not found');
    }
});



const deleteStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);

    if (student) {
        await student.remove();
        res.json({ message: 'Student removed' });
    } else {
        res.status(404);
        throw new Error('Student not found');
    }
});







module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
};
