const express = require("express");
const {  createCourseAllocation, getCourseAllocations, } = require("../controller/courseAllocationController");
const verifyToken = require("../middleware/tokenValidation");
const validateToken = require('../middleware/tokenValidation');



const router = express.Router();
router.use(validateToken)



router.get("/getCourseAllocations", getCourseAllocations)

router.post("/createCourseAllocation", createCourseAllocation)




// router.get("/current", verifyToken, currentUser)



module.exports = router;