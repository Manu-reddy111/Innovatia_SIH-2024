const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/SCCE")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})


const RecentProjectsSchema=new mongoose.Schema({

  Username: { type: String},
  UserId: { type: String},
  Uploaddate: { type: String },
  ProjectTitle: { type: String},
  TeamName: { type: String },
  collegename: { type: String },
  Dept: { type: String },
  Status: { type: String },
  ProjectType: { type: String },
  Rating: { type: String },
  profilePic: { type: String }, 
  Points: { type: String },
  Uploadpublicationid: { type: String },

})
const RecentProjectsCollection=new mongoose.model('RecentProjects',RecentProjectsSchema)
module.exports=RecentProjectsCollection