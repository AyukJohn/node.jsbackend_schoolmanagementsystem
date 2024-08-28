const express = require("express");
const { createDepartment,getDepartments,assignStaffToDepartment,getAllDepartmentStaff } = require("../controller/departmentController");
const multer = require("multer");

const validateToken = require('../middleware/tokenValidation');




const router = express.Router();
const upload = multer({ dest: 'temp/' });

router.use(validateToken)



router.get("/getDepartments", getDepartments)
router.post("/createDepartment", createDepartment)
router.post("/assignStaffToDepartment",assignStaffToDepartment)
router.get("/getAllDepartmentStaff", getAllDepartmentStaff)




module.exports = router;