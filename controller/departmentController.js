const asyncHandler = require('express-async-handler');
const Department = require('../models/departmentModel');
const DepartmentStaff = require('../models/departmentStaffModel');
const Staff = require('../models/staffModel')




const createDepartment = asyncHandler(async (req, res) => {
    const { name } = req.body;

    // Check if the department already exists
    const departmentExists = await Department.findOne({ name });
    if (departmentExists) {
        res.status(400);
        throw new Error('Department already exists');
    }

    // Create new department
    const department = new Department({ name });
    await department.save();

    res.status(201).json(department);

});



const getDepartments = asyncHandler(async (req, res) => {

    const departments = await Department.find();
    res.status(200).json(departments);

});



const assignStaffToDepartment = asyncHandler(async (req, res) => {

    const { departmentId, staffId } = req.body;

    // Check if the department exists
    const department = await Department.findById(departmentId);
    if (!department) {
        res.status(404);
        throw new Error('Department not found');
    }


      // Check if staff exists
      const staff = await Staff.findById(staffId);
      if (!staff) {
          res.status(404);
          throw new Error('Staff not found');
      }

    const existingAssignment = await DepartmentStaff.findOne({ department: departmentId, staff: staffId });
    if (existingAssignment) {
        res.status(400);
        throw new Error('Staff is already assigned to this department');
    }

    const newAssignment = await DepartmentStaff.create({
        department: departmentId,
        staff: staffId,
    });

    res.status(201).json(newAssignment);

});



const getAllDepartmentStaff = asyncHandler(async (req, res) => {
    const departmentStaff = await DepartmentStaff.find()
        .populate('department')
        .populate('staff');

    res.status(200).json(departmentStaff);
});




module.exports = {
    createDepartment,
    getDepartments,
    assignStaffToDepartment,
    getAllDepartmentStaff
};
