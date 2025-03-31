const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/SCCE")
  .then(() => {
    console.log("mongoose uploadachievements connected");
  })
  .catch((e) => {
    console.log("failed");
  });

const UploadachievementsSchema = new mongoose.Schema({
  Username: { type: String },
  Innovationname: { type: String, required: true },
  InnovationType: { type: String, required: true },
  Department: { type: String, required: true },
  Awards: { type: [String], required: true },
  HallTicket: { type: [String] },
  AwardBy: { type: [String] },
  Wins: { type: [String] },
  GitHub: { type: String, required: true },
  Live: { type: String, required: true },
  Description: { type: String },
  thumbnailFile: { type: String },
  imageFiles: { type: [String] },
  researchPapers: { type: [String] },
  patentDocs: { type: [String] },
  projectFiles: { type: [String] },
  certificates: { type: [String] },
  Uploaddate: { type: String },
});
const UploadachievementsCollection = new mongoose.model("Uploadachievements",UploadachievementsSchema);
module.exports = UploadachievementsCollection;
