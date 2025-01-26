const express = require('express');
const profileRoute = express.Router();
const { userAuth } = require('../middleware/userAuth'); 



profileRoute.get('/profile', userAuth, async (req,res)=>{
    try{

        const user = req.user;

        res.send(user);
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

module.exports = { profileRoute };