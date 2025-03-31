const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/SCCE")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})


const RecentstaffpublicationsSchema=new mongoose.Schema({

  Username: { type: String},
  UserId: { type: String},
  Uploaddate: { type: String },
  ProjectTitle: { type: String},
  collegename: { type: String },
  Dept: { type: String },
  Status: { type: String },
  ProjectType: { type: String },
  
  profilePic: { type: String }, 
  
  Uploadpublicationid: { type: String },

})
const RecentstaffpublicationsCollection=new mongoose.model('Recentstaffpublications',RecentstaffpublicationsSchema)
module.exports=RecentstaffpublicationsCollection