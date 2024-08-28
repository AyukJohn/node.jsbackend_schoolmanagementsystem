const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const registerUsers = asyncHandler(async (req, res) => {

    const{name, email, password} = req.body;

        //this checks if you didn't pass all the fields
    if (!name  || !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }


    //this checks if there is another registered email or username before
    const userAvailable = await User.findOne({ email, name });

    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }


    const hashedPassword = await bcrypt.hash(password, 15);

    const user = await User.create({
        name,
        email,
        password:hashedPassword,
    });

    if(user){
        res.status(201).json({
            _id:user.id,
            email:user.email,
        })

    }else{
        res.status(400);
        throw new Error("User data is not valid")
    }

    res.json({message: "You have successfully Registered"})

})



const loginUsers = asyncHandler (async (req, res) => {
    const {name, password} = req.body;

    if(!name || !password)
    {
        res.status(400);
        throw new Error("All fields are required");
    }

    const user = await User.findOne({ name });

    if(user &&( await bcrypt.compare(password, user.password)))
    {
        const accessToken = jwt.sign({
            user:{
                name: user.name,
                email:user.email,
                id:user.id,
            },

        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "8h" }
        );
        res.status(200).json( {accessToken,user} );

    }else{
        res.status(401)
        throw new Error("Password or Name not valid");
    }

});









const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});


module.exports = {
    registerUsers,
    loginUsers,
    currentUser,
}