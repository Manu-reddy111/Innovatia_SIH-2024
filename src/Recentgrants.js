const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/SCCE")
.then(()=>{
    console.log('mongoose recentgrants connected');
})
.catch((e)=>{
    console.log('failed');
})


const RecentgrantsSchema=new mongoose.Schema({

  Username: { type: String},
  UserId: { type: String},
  Uploaddate: { type: String },
  ProjectTitle: { type: String},
  Grants:{type:String},
  TeamName: { type: String },
  Dept: { type: String },
  Status: { type: String },
  ProjectType: { type: String },
  Rating: { type: String },
  profilePic: { type: String }, 
  Points: { type: String },
  Uploadgrantsid:{type: String},

})
const RecentgrantsCollection=new mongoose.model('Recentgrants',RecentgrantsSchema)
module.exports=RecentgrantsCollection