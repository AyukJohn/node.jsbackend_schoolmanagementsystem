const express = require("express");
const { registerUsers, loginUsers, currentUser } = require("../controller/userController");
const verifyToken = require("../middleware/tokenValidation");
const csrf = require('csurf');


const csrfProtection = csrf({ cookie: true });

const router = express.Router();
// app.use(cors());

router.post("/register", registerUsers, csrfProtection)

router.post("/login", loginUsers)

router.get("/current", verifyToken, currentUser)



module.exports = router;