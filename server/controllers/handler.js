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
        const {registeredEmail , password} = req.body;
        console.log(registeredEmail, " ", password)
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
                expiresIn: ms((Date.now()%1000)+30*24*60*60)
                // expiresIn: ms(Date.now()+60*1000)
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
        console.log("err ", err);
        res.status(200).json(err);
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
        const {id, name, age, gender, description, department} = rew.body;
        const time = Date.now();
        if(!name || !age || !gender || !description || !department || !time) return res.status(401).json({success: false, msg: "Incomplete Details"})
        const saveAppointment = await appointment.create({
            user: id, paitent_name: name, age: age, gender: gender,
            description: description, department: department,
            time: time
        })

        if(saveAppointment) return res.status(200).json({sucess: true, msg: "Appointment Successfull", apointment_id: saveAppointment._id});
        return res.status(401).json({success: false, msg: "Unable to make appointment"});

    }
    catch(err){
        console.log(err);
       return res.status(200).json({success: false, msg: err.message})
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
        if(findUser) return res.status(200).json({success: true});
        return res.status(201).json({success: false});
    } catch{
        res.status(500).json({success: false, msg: "Internal Server error"})
    }
}

const test = async(req, res)=>{
    console.log(req.body);
    // const date = new Date();
    // const appoint = await appointment.create({
    //     age: 17,
    //     doctor: "Ayush Chamola",
    //     gender: "Male",
    //     time: date,
    //     department: 'Obstetrics',
    //     description: "I am having HIV, AIDS, Loose Motion",
    //     user: "66633493316ec28b0992e592",
    //     paitent_name: "Gautam Pundir Gupta Singh Rawat"
    // })
    res.status(200).json({appoint: req.body.id});
}

const gettest = async(req, res)=>{
        try{
            const {token} = req.body;
            // console.log(token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(Date.now()/1000);
            if(decoded.exp < Date.now()/1000) return res.status(401).json({success: false, msg: "Token Expired"});
            const { email, id, role } = decoded;
            console.log(decoded);
            res.status(200).json({success: false})
        } catch(error){
            console.log(error);
            res.status(500).json({success: error.message})
        }
    // let appoint = await appointment.findOne({_id: "668e60beb512a3d6612b01ed"}).populate("user");
    // return res.status(200).json(appoint)
}

const jwtDecode = async(req, res, next)=>{
    try{
        const{ token } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id} = decoded;
        req.body.id = id;
        console.log("Successfull");
        next();
    } catch(e){
        res.status(500).json({success: false, msg: e.message})
    }
}





module.exports = { signup ,  makeAppointment , login, checkLoginStatus, test,gettest, jwtDecode};