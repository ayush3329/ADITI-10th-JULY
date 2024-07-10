const express = require('express');
const cors = require('cors');
const dbConnect = require('./dbconnect/dbconnect');
const router=require('./routes/r1');
require('dotenv').config();


const app = express(); 
app.use(cors({
    origin: "*",
}))
app.use(express.json());
app.post("/ran", (req, res)=>{
    res.json({success: true});
})
dbConnect();
app.use(router);
app.listen(process.env.PORT, () => {
    console.log(`Hello, I'm at port ${process.env.PORT}`);
});
