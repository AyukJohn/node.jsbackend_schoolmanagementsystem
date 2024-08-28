const express = require("express");
const { registerAdmin, loginAdmin, currentAdmin } = require("../controller/adminController");
const verifyToken = require("../middleware/tokenValidation");
const csrf = require('csurf');


const csrfProtection = csrf({ cookie: true });

const router = express.Router();
// app.use(cors());

router.post("/registerAdmin", registerAdmin, csrfProtection)

router.post("/loginAdmin", loginAdmin)

router.get("/current", verifyToken, currentAdmin)



module.exports = router;