const express = require('express');



const port = 3000;

const app = express();

app.use('/',(req,res)=>{
    console.log('Server started!');
    res.send("Server starts with nodemon.");
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}...`);
});