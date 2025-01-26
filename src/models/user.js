const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type : String,
            required : true,
            minLength : 3,
            maxLength : 20,
        },
        lastname: {
            type : String,
            maxLength : 20,
        },
        emailId: {
            type : String,
            required : true,
            lowercase : true,
            unique : true,
            trim : true,
            validator(value) {
                if(!validator.isEmail(value)){
                    throw new Error("Invalid email address "+ value);
                }
            },
        }, 
        password: {
            type : String,
            required : true,
        },
        age: {
            type : Number,
        },
        gender: {
            type : String,
            enum : {
                values: ["male","female","other"],
                message: `{VALUE} is not a valid gender type`,
            },
        },
    },
    {
        timestamps : true,
    }
);

module.exports = mongoose.model('User', userSchema);