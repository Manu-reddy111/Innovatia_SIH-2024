const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/SCCE")
.then(()=>{
    console.log('mongoose recentstartups connected');
})
.catch((e)=>{
    console.log('failed');
})


const RecentstartupsSchema=new mongoose.Schema({

  Username: { type: String},
  UserId: { type: String},
  Uploaddate: { type: String },
  StartUpname:{type: String},
  ProjectTitle: { type: String},
  TeamName: { type: String },
  Dept: { type: String },
  Status: { type: String },
  Rating: { type: String },
  profilePic: { type: String }, 
  Points: { type: String },
  Uploadstartupid: { type: String },

})
const RecentstartupsCollection=new mongoose.model('Recentstartups',RecentstartupsSchema)
module.exports=RecentstartupsCollection