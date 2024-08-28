
const asyncHandler = require("express-async-handler");
const Staff = require("../models/staffModel");
const DepartmentStaff = require('../models/departmentStaffModel');
const cloudinary = require("../config/cloudinary");

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


const sendEmailToStaff = asyncHandler(async (req, res) => {
    const { staffID, subject, message } = req.body;

    if (!staffID || !subject || !message) {
        res.status(400);
        throw new Error("Please provide staffID, subject, and message");
    }

    const staff = await Staff.findOne({ staffID });

    if (!staff) {
        res.status(404);
        throw new Error("Staff member not found");
    }

    const mailOptions = {
        from: 'Faculty Of Computing Admin', // Replace with your email
        to: staff.email,
        subject: subject,
        text: `Dear ${staff.fullName},\n\n${message}\n\nBest regards,\nUniuyo`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ error: "Failed to send email" });
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).json({ message: "Email sent successfully" });
        }
    });
    
});



const getStaffMembers = asyncHandler(async (req, res) => {
    const staffMembers = await Staff.find().lean(); // Fetch all staff members
    
    // For each staff member, fetch their department
    const staffWithDepartments = await Promise.all(staffMembers.map(async staff => {
        const departmentStaff = await DepartmentStaff.findOne({ staff: staff._id }).populate('department');
        return {
            ...staff,
            department: departmentStaff ? departmentStaff.department : null
        };
    }));

    res.status(200).json(staffWithDepartments);
});


const getStaff = asyncHandler(async (req, res) => {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
        res.status(404);
        throw new Error("Record not found");
    }
    res.json(staff)
});






const createStaff = asyncHandler(async(req, res) => {

    const{fullName, staffID, designation, qualification, 
        date_of_birth, gender, marital_status, phoneNo,
        email,employment_date, employment_type, salary_grade,
        bank_account_number, bank_name, bank_account_name, emergency_contact
    } = req.body;


        // Array of required fields
    const requiredFields = [
        'fullName', 'staffID', 'designation', 'qualification',
        'date_of_birth', 'gender', 'marital_status', 'phoneNo', 'email',
        'employment_date', 'employment_type', 'salary_grade',
        'bank_account_number', 'bank_name', 'bank_account_name', 'emergency_contact'
    ];

    // Check if any of the required fields are missing
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        res.status(400);
        throw new Error(`All fields are required. Missing fields: ${missingFields.join(', ')}`);
    }   



    //this checks if there is another registered email or username before
    const staffAvailable = await Staff.findOne({ staffID, fullName });

    console.log(staffAvailable);

    if(staffAvailable){
        res.status(400);
        throw new Error("Staff Detail already registered");
    }

        try{

            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'image',
                folder: 'staff',
            });

            console.log(result);
            

    
            if (!result || !result.public_id || !result.secure_url) {
                res.status(500);
            }else{


                const data = await Staff.create({
                    fullName, 
                    staffID, 
                    designation, 
                    qualification, 
                    date_of_birth, 
                    gender, 
                    marital_status, 
                    phoneNo, email,
                    employment_date, 
                    employment_type, 
                    salary_grade,
                    bank_account_number,
                    bank_name,
                    bank_account_name,
                    emergency_contact,
                    image:result.secure_url,
                    public_id:result.public_id,
                });
                
            
                res.status(201).json({
                    'message':'data uploaded',
                    data
                })


            }

        } catch(error){
            return res.status(400).send(error)
        }



})





const searchStaff = asyncHandler(async (req, res) => {
    const query = req.body.query; // Get the search query from the request query string
  
    if (!query) {
      res.status(400);
      throw new Error('Search query is required');
    }


  
       try {
        const results = await Criminal.aggregate([
            {
                $match: {
                    $or: [
                        { firstName: { $regex: query, $options: 'i' } },
                        { lastName: { $regex: query, $options: 'i' } },
                        // Add more fields to search as needed
                    ],
                },
            },
            {
                $lookup: {
                    from: 'cases',  // The name of the "cases" collection
                    localField: '_id', // Field from the "criminals" collection
                    foreignField: 'criminal_id', // Field from the "cases" collection
                    as: 'cases',
                },
            },
        ]);

        if (results.length === 0) {
            res.json({ message: 'Data not found' });
        } else {
            res.json(results);
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }



});




const upDateContact = (async (req, res) => {

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }


    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.json(updatedContact)
});



const deleteStaff = (async (req, res) => {

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.deleteOne();

    res.json(contact)
});





// Update staff status (isHOD, isDean, isOnLeave, isDirector)
const updateStaffStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { isHOD, isDean, isOnLeave, isDirector } = req.body;

    const staff = await Staff.findById(id);
    if(!staff){
        res.status(404);
        throw new Error("Staff not found");
    }

        staff.isHOD = isHOD !== undefined ? isHOD : staff.isHOD;
        staff.isDean = isDean !== undefined ? isDean : staff.isDean;
        staff.isOnLeave = isOnLeave !== undefined ? isOnLeave : staff.isOnLeave;
        staff.isDirector = isDirector !== undefined ? isDirector : staff.isDirector;

    await staff.save();

    res.status(200).json(staff);
});




module.exports = 
{
    getStaff,
    getStaffMembers,
    createStaff, 
    searchStaff,
    deleteStaff,
    updateStaffStatus,
    sendEmailToStaff,

};
