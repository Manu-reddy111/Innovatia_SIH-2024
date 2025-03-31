const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/SCCE")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})


const StaffAccountProfileSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    collegename:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    doj:{
        type:String,
        required:true
    },
    employeeid:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },    
    profilePic:{
        type:String,
        required:true
    },   
    Status:{
        type:String,
        required:true
    }
})

const StaffAccountProfileCollection=new mongoose.model('StaffAccountProfile',StaffAccountProfileSchema)

module.exports=StaffAccountProfileCollection