const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/SCCE")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})


const StudentProfileSchema=new mongoose.Schema({

  username:  String,
  githubLink: String,
  linkedinLink: String,
  facebookLink: String,
  backgroundImage: String,
  profileImage: String,
  department: String,
  hallTicket: String,
  awards: [String],
  wins: [String],
  description: String, 

})
const StudentProfileCollection=new mongoose.model('StudentProfile',StudentProfileSchema)
module.exports=StudentProfileCollection