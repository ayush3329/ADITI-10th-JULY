const user =require('../schema/user');
const  doctor=require('../schema/doctor');
const appointment =require('../schema/appointment');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');
const ms =  require("ms");

require('dotenv').config();



const nothing= async (req, res ) =>{
    return res.status(200).json({
        success:true , 
        message:"im called",
    })
}




const login=async (req, res) =>{
    try{
        const {registeredEmail , password} = req.body.formData;
        if(!registeredEmail || !password){
            return res.status(500).json({
                success:false,
                message:"enter complete details",
            })
        }
        const email = registeredEmail;
        console.log(email);
        const existingUser = await user.findOne({email});
        console.log(existingUser);
        if(!existingUser){
            return res.status(500).json({
                success:false,
                message:" USER DOESN'T EXIST , PLEASE CREATE ACCOUNT , THEN LOGIN",
            })
        }
        const payload = {
            email, 
            id:existingUser.id , 
            role:existingUser.role  
        }
        
        if(await bcrypt.compare(password, existingUser.password)){
            // password matched 
            const options = {
                //ms function convert int value to string
                //Date.now() function will return current time in unix formate
                //then we extend the date by 30 days (we convert 30 days into microseconds)
                expiresIn: ms(Date.now()+30*24*60*60*1000)
            }
            let token = jwt.sign(payload , process.env.JWT_SECRET , options);
            return res.status(200).json({
                success: true,
                message: "Successfully logged in",
                role: existingUser.role,
                jwttoken: token
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Incorrect Password",
                
            })
        }
    }
    catch(err){

    }
}





const signup =async (req, res) =>{
    try{
        
        const {username , email , password , confirmPassword , mobile ,role}=req.body.formData;
        if(!username || !email || !password || !confirmPassword || !mobile || !role  ){
            return res.status(401).json({
                success:false,
                message:"enter complete details ",
            })
        }
        if(password!=confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Same Password Must be entered",
            })
        }
        const isexisting =await user.findOne({email});
        console.log(isexisting);
        if(isexisting){
            return res.status(500).json({
                success:false,
                message:"user email already exist , please direct to login page",
            })
        }
        const hashedPassword = await bcrypt.hash(confirmPassword , 12 );
        const doSign = await user.create({
            username,
            password:hashedPassword,
            email:email , 
            mobile:mobile,
            role:role,
        })
        return res.status(200) .json({
            success:true,
            message:"USER REGISTERED SUCCESFULLY  , Now Login to proceed further",
        })
    }
    catch(err){
        console.log("error occured while signing up , developr's concern!! " , err);
        return res.status(403) .json({
            success:false,
            message:"error while signing up , try after sometime",
        })
    }
}





const makeAppointment=async (req, res) =>{
    try{
        const {user,doctor, time }=req.body;
        if(!user || !doctor || !time){
            return res.status(401).json({
                success:false,
                message:"enter complete details ",
            })
        }

        const Made_appointment = await appointment.create({user:user ,doctor:doctor , time:time});
        return res.status(200).json({
            success:true , 
            message:"Appointment created successfully",
        })

    }
    catch(err){
        console.log("error occured while making appointment " , err);
        return res.status(500) .json({
            success:false,
            message:"mentioned error is in making appointment in catch block , try after sometime",
        })
    }
}



const checkLoginStatus = async(req, res)=>{
    try{
        console.log(req.body);
        const {token} = req.body;
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email, id, role } = decoded;
        console.log(decoded);
        const findUser = await user.findOne({email:email,_id:id,role:role});
        if(findUser)return res.status(200).json({success: true});
        return res.status(201).json({success: false});
    } catch{
        
    }
}





module.exports = { signup ,  makeAppointment , login, checkLoginStatus};