const express = require("express");
const {getStaffMembers, getStaff, createStaff, searchStaff, updateStaffStatus, sendEmailToStaff } = require("../controller/staffController");
const multer = require("multer");

const validateToken = require('../middleware/tokenValidation');


const router = express.Router();
const upload = multer({ dest: 'temp/' });

router.use(validateToken)


router.get("/staff", getStaff)
router.get("/getStaffMembers",getStaffMembers)
router.post("/createStaff", upload.single('image'), createStaff)
router.post("/searchStaff", searchStaff),
router.put("/updateStaffStatus/:id", updateStaffStatus),
router.post("/sendEmailToStaff", sendEmailToStaff)


module.exports = router;
