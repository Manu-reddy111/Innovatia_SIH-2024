const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/SCCE")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})


const SignupStudentSchema=new mongoose.Schema({
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
    yearofstudy:{
        type:String,
        required:true
    },
    hallticket:{
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
    }
})

const SignupStudentCollection=new mongoose.model('StudentCollection',SignupStudentSchema)

module.exports=SignupStudentCollection