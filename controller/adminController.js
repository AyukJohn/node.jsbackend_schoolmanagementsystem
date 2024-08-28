const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminmodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const registerAdmin = asyncHandler(async (req, res) => {

    const{userName, email, password} = req.body;

        //this checks if you didn't pass all the fields
    if (!userName  || !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }


    //this checks if there is another registered email or username before
    const userAvailable = await Admin.findOne({ email, userName });

    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }


    const hashedPassword = await bcrypt.hash(password, 15);

    const admin = await Admin.create({
        userName,
        email,
        password:hashedPassword,
    });

    if(admin){
        res.status(201).json({
            _id:admin.id,
            email:admin.email,
        })

    }else{
        res.status(400);
        throw new Error("User data is not valid")
    }

    res.json({message: "You have successfully Registered"})

})



const loginAdmin = asyncHandler (async (req, res) => {
    const {userName, password} = req.body;

    if(!userName || !password)
    {
        res.status(400);
        throw new Error("All fields are required");
    }

    const admin = await Admin.findOne({ userName });

    if(admin &&( await bcrypt.compare(password, admin.password)))
    {
        const accessToken = jwt.sign({
            admin:{
                id:admin.id,
                Username: admin .userName,
                email: admin.email,
            },

        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "8h" }
        );
        res.status(200).json( {accessToken,admin} );

    }else{
        res.status(401)
        throw new Error("Password or Name not valid");
    }

});



const currentAdmin = asyncHandler(async (req, res) => {
    res.json(req.user);
});


module.exports = {
    registerAdmin,
    loginAdmin,
    currentAdmin,
}