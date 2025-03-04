// const { default: mongoose } = require("mongoose");
// username:"",address:"",location:"",phonenumber:"",emailaddress:"",password:""

const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    phonenumber:{
        type:Number,
        require:true
    },
    emailaddress:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    profilePic:{
        type:String,
        require:true
    }
})

const users=mongoose.model("users",userSchema)
module.exports=users