const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/SCCE")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})


const StaffProfileSchema=new mongoose.Schema({

  username:  String,
  githubLink: String,
  linkedinLink: String,
  facebookLink: String,
  backgroundImage: String,
  profileImage: String,
  department: String,
  employeeid: String,
  awards: [String],
  wins: [String],
  description: String, 

})
const StaffProfileCollection=new mongoose.model('StaffProfile',StaffProfileSchema)
module.exports=StaffProfileCollection