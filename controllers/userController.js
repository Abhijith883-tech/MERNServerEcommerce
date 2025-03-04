const users = require('../models/userModel');
const jwt=require('jsonwebtoken')
// Register
exports.registerController = async (req, res) => {
    console.log('Inside register controller');
    console.log(req.body);

    const { username, address, location, phonenumber, emailaddress, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await users.findOne({ emailaddress });
        if (existingUser) {
            return res.status(406).json('Already existing user...plz login');
        }

        // Create new user
        const newUser = new users({
            username,
            address,
            location,
            phonenumber,
            emailaddress,
            password,
            profilePic: ''
        });

        await newUser.save();
        res.status(200).json(newUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//login

// exports.loginController=async(req,res)=>{
//     console.log('Inside login controller');
//     const{emailaddress,password}=req.body
//     console.log(emailaddress,password);
//     try {
//         const existingUser=await users.findOne({emailaddress,password})
//         if (existingUser) {
//             //token generation
//             const token=jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
//             res.status(200).json({
//                 user:existingUser,token
//             })
//         } else {
//             res.status(404).json('incorrect email/password')
//         }
//     } catch (error) {
//         res.status(401).json(error)
//     }
    
// }
exports.loginController = async (req, res) => {
    console.log('Inside login controller');
    const { emailaddress, password } = req.body;
    console.log(emailaddress, password);

    try {
        const existingUser = await users.findOne({ emailaddress });

        if (existingUser && existingUser.password === password) {
            // Token generation
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD);
            res.status(200).json({
                user: existingUser,
                token
            });
        } else {
            res.status(404).json('Incorrect email/password');
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

