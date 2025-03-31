const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/SCCE")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})


const StaffpublicationSchema=new mongoose.Schema({

  Username: { type: String},
  Projectname: { type: String, required: true },
  ProjectType: { type: String, required: true },
  Department: { type: String, required: true },
  GitHub : { type: String, required: true },
  Live : { type: String, required: true },
  Description: { type: String },
  thumbnailFile: { type: String }, 
  imageFiles: { type: [String] }, 
  researchPapers: { type: [String] }, 
  patentDocs: { type: [String] }, 
  projectFiles: { type: [String] }, 
  certificates: { type: [String] }, 
  Uploaddate: { type: String },

})
const StaffpublicationCollection=new mongoose.model('Staffpublication',StaffpublicationSchema)
module.exports=StaffpublicationCollection