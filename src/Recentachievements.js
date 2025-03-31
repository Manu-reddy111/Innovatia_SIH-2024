const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/SCCE")
.then(()=>{
    console.log('mongoose recentgrants connected');
})
.catch((e)=>{
    console.log('failed');
})


const RecentachievementsSchema=new mongoose.Schema({

  Username: { type: String},
  UserId: { type: String},
  Uploaddate: { type: String },
  Innovationname: { type: String},
  TeamName: { type: String },
  Dept: { type: String },
  Awards:{type:String},
  AwardBy:{type:String},
  Status: { type: String },
  InnovationType: { type: String },
  profilePic: { type: String }, 
  Uploadachievementsid:{type: String},

})
const RecentachievementsCollection=new mongoose.model('Recentachievements',RecentachievementsSchema)
module.exports=RecentachievementsCollection