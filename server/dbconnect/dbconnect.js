const mongoose = require('mongoose');
require('dotenv').config();
const URL = process.env.URL;
const dbConnect= ()=>{
    mongoose.connect(URL,{
    })
    .then(()=>{
        console.log("DB CONNECTED ");
    })
    .catch((err)=>{
        console.log("error occured ");
        console.log(err.message);
    })
}
module.exports = dbConnect;