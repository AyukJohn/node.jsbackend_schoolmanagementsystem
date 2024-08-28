const express = require("express");
const {createStudent, getStudents, getStudentById, updateStudent,deleteStudent,} = require("../controller/studentController");
const multer = require("multer");

const validateToken = require('../middleware/tokenValidation');


const router = express.Router();
const upload = multer({ dest: 'temp/' });

router.use(validateToken)


router.get("/getStudents", getStudents)
router.get("/getStudentById",getStudentById)
router.post("/createStudent", upload.single('image'), createStudent)
router.put("/updateStudent/:id", updateStudent)
router.delete("/deleteStudent", deleteStudent)


module.exports = router;
