const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    try{
        const { tocken } = req.cookies;

        if(!tocken){
            return res.status(401).send("Please Login");
        }
            
        const decodedTocken = await jwt.verify(tocken, "classflow");
        const { _id } = decodedTocken;
        
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }

        req.user = user;

        next();
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
};


module.exports = { userAuth, };