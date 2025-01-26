const express = require('express');
const authRoute = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const { validateSignupData } = require('../utils/validators');

authRoute.post('/sign-up',async (req,res)=>{

    try{

        validateSignupData(req);

        const { firstname, lastname, emailId, password} = req.body;

        const hashPassword = await bcrypt.hash(password,10);

        const user = new User({
            firstname,
            lastname,
            emailId,
            password : hashPassword,
        });
        
        const savedUser = await user.save();


        // Create JWT tocken
        const tocken = await jwt.sign({_id:savedUser._id},"classflow",{expiresIn: "30d"});

        // Add tocken to cookies
        res.cookie("tocken", tocken);
        

        res.json({ message: `${savedUser.firstname} has been registered`, data: savedUser });
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }

});


authRoute.post('/login', async (req,res)=>{

    try{

        const { emailId, password } = req.body;

        const user = await User.findOne({emailId : emailId});

        if(!user){
            throw new Error("Invalid Credentials");
        }

        const isValidPassword = await bcrypt.compare(password,user.password);

        if(!isValidPassword){
            throw new Error("Wrong Password")
        }

        // Create JWT tocken
        const tocken = await jwt.sign({_id:user._id},"classflow",{expiresIn: "30d"});

        // Add tocken to cookies
        res.cookie("tocken", tocken);
        
        res.json({ message: "Login!", data: user });
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }

});


authRoute.post('/logout', async (req,res)=>{
    try{

        res.cookie("tocken", null, {
            expires: new Date(Date.now()),
        });

        res.json({ message: "Logout!"});
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})


module.exports = { authRoute };