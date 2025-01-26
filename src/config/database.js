const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect(
        "mongodb+srv://shishpal0666:shishpal%40classflow@classflow.p0wha.mongodb.net/ClassFlowDB"
    );
};

module.exports = { connectDB };