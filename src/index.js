const express = require("express")
const path = require("path")
const multer = require("multer");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express()
const SignupStudentCollection = require("./mongo")
const UploadpublicationCollection = require("./uploadpublications")
const UploadgrantsCollection = require("./uploadgrants");
const UploadstartupCollection = require("./uploadstartup");
const UploadachievementsCollection=require("./uploadachievements");
const RecentProjectsCollection = require("./RecentProjects")
const RecentstaffpublicationsCollection=require("./recentstaffpublications")
const RecentgrantsCollection = require("./Recentgrants");
const RecentstartupsCollection= require("./recentstartups");
const RecentachievementsCollection=require("./recentachievements")
const StudentProfileCollection = require("./StudentProfile");
const StaffProfileCollection = require("./StaffProfile")
const StaffAccountProfileCollection = require("./StaffAccountProfile")
const StaffpublicationCollection = require("./Staffpublication")


const port = process.env.PORT || 3000
app.use(express.json())

app.use(cookieParser());

app.use(session({
    secret: "SCCE",
    saveUninitialized: true,
    resave: true
}));
// app.use(express.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
const upload = multer({ storage: storage });



app.get('/', (req, res) => {
  res.render('landingpage')
})
app.get('/landingpage', (req, res) => {
  res.render('landingpage')
})

app.get('/Adminsignin', (req, res) => {
  res.render('Adminsignin')
})

app.get('/Staffsignin', (req, res) => {
  res.render('Staffsignin')
})

app.get('/signupUI', (req, res) => {
    res.render('signupUI')
})
app.get('/signinUI', (req, res) => {
    res.render('signinUI')
})

const Handlebars = require('handlebars');

Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

const hbs = require('hbs');

hbs.registerHelper('eq', function (a, b) {
  return a === b;
});
hbs.registerHelper('increment', function (value) {
  return parseInt(value) + 1;
});


app.post('/AdminSigninAction', async (req, res) => {

  try {
      const { username, password } = req.body;    
      if (username ==="admin" && password === "admin") {
          req.session.username = username;   
          const Projects = await RecentProjectsCollection.find(); 
          const ProjectTypeproject = "project"
          const ProjectTyperesearch ="research-project"
          const ProjectTypepatent ="patent"
          const ProjectTypepublication="publication"
          const countproject = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypeproject}); 
          const countresearch = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTyperesearch}); 
          const countpatent = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypepatent}); 
          const countpublication = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypepublication});  
          
          const Uploadd = await StaffpublicationsCollection.find(); 
          
          return res.status(201).render("AdminHomepage", {countproject,countresearch, Uploadd,countpatent,countpublication,Projects});   
        }  else {
          return res.status(400).render('Adminsignin', {
              Message: 'Incorrect username or password!',
              isError: true,
          });
      }

      }  
      catch (e) {
      return res.status(400).render('Adminsignin', {
          Message: 'wrong inputs!'+ e,
          isError: true, 
      }); 
      }
})



app.get('/AdminHomepage', async (req, res) => {

  try {     
          const Projects = await RecentProjectsCollection.find(); 
          const ProjectTypeproject = "project"
          const ProjectTyperesearch ="research-project"
          const ProjectTypepatent ="patent"
          const ProjectTypepublication="publication"
          const countproject = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypeproject}); 
          const countresearch = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTyperesearch}); 
          const countpatent = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypepatent}); 
          const countpublication = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypepublication});  

          const Uploadd = await StaffProjectsCollection.find(); 
          return res.status(201).render("AdminHomepage", {countproject,countresearch, countpatent,countpublication,Uploadd,Projects});   
        
     

      }  
      catch (e) {
      return res.status(400).render('Adminsignin', {
          Message: 'wrong inputs!'+ e,
          isError: true, 
      }); 
      }
})



app.post('/AdminProjectDelete', async (req, res) => {
    const { id } = req.body;
    const cproject = await RecentProjectsCollection.findById(id); 
    const bid=cproject.Uploadpublicationid
    console.log("Uploadpublicationid:", bid);
    await UploadpublicationCollection.deleteOne({ _id: bid }); 
    await RecentProjectsCollection.deleteOne({ _id: id }); 
      const Projects = await RecentProjectsCollection.find(); 
      const ProjectTypeproject = "project"
      const ProjectTyperesearch ="research-project"
      const ProjectTypepatent ="patent"
      const ProjectTypepublication="publication"
      const countproject = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypeproject}); 
      const countresearch = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTyperesearch}); 
      const countpatent = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypepatent}); 
      const countpublication = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypepublication});  
      const Uploadd = await StaffProjectsCollection.find(); 
      return res.status(201).render("AdminHomepage", {countproject,countresearch, countpatent,countpublication,Uploadd,Projects});   
        
 
})


app.post('/AdminPublicatioDelete', async (req, res) => {
  const { id } = req.body;
  
  const cproject = await StaffProjectsCollection.findById(id); 
  const bid=cproject.Uploadpublicationid
  console.log("Uploadpublicationid:", bid);
  await StaffpublicationCollection.deleteOne({ _id: bid });

  await StaffProjectsCollection.deleteOne({ _id: id }); 
    const Projects = await RecentProjectsCollection.find(); 
    const ProjectTypeproject = "project"
    const ProjectTyperesearch ="research-project"
    const ProjectTypepatent ="patent"
    const ProjectTypepublication="publication"
    const countproject = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypeproject}); 
    const countresearch = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTyperesearch}); 
    const countpatent = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypepatent}); 
    const countpublication = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypepublication});  
    
    const Uploadd = await StaffProjectsCollection.find(); 
    return res.status(201).render("AdminHomepage", {countproject,countresearch, countpatent,countpublication,Uploadd,Projects});   
  

})



app.get('/AdminLeaderboard', async (req, res) => {
  if (req.session.username) {
    const username= req.session.username
        const Uploadd = await RecentProjectsCollection.find();
      res.render("AdminLeaderboard", { Uploadd });  
    } else {
      res.render("Adminsignin");
    }
})


app.get('/viewAdminProject/:id', async (req, res) => {
  try {
    const Uploadpublicationid = req.params.id;
    const username= req.session.username  
    const Uploadpub = await UploadpublicationCollection.findById(Uploadpublicationid); 
    const Projects = await RecentProjectsCollection.findOne({Uploadpublicationid});
    // console.log("username:", username);
    // console.log("Uploadpublicationid:", Uploadpublicationid); 
    // console.log("Projects:", Projects);
    // console.log("Uploadpub:", Uploadpub);
    const teamData = Uploadpub.TeamMember.map((member, index) => ({
      name: member,
      hallTicket: Uploadpub.HallTicket[index] || "N/A", 
    }));

      if (Projects.length === 0) {
          res.render('viewAdminProject', {Message: 'No Projects found!',Projects,Uploadpub: { ...Uploadpub._doc, teamData }});
      }
      res.render('viewAdminProject', { Message: 'No Projects found!',Projects,Uploadpub: { ...Uploadpub._doc, teamData }});
       
  } catch (err) {
    return res.status(500).render('Adminsignin', {
      Message: 'Error fetching Projects!',
      isError: true,
  }); 
  }
})



app.get('/requestsstudentproject', async (req, res) => {
  if (req.session.username) {
    const username= req.session.username
    const Status= "Accepted" 
      const Projects = await RecentProjectsCollection.find({Status:Status });
      const ProjectTypeproject = "project"
      const ProjectTyperesearch ="research-project"
      const ProjectTypepatent ="patent"
      const ProjectTypepublication="publication"

      const pubCount = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypeproject,Status:Status}); 
      const countresearch = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTyperesearch,Status:Status}); 
      const countpatent = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypepatent,Status:Status}); 
      const countpublication = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypepublication,Status:Status});  
      
       const pubStatus= "Pending"
      const pubCountpublication = await StaffpublicationCollection.countDocuments({Status:pubStatus });
      const Uploadd = await StaffProjectsCollection.find({ Status:pubStatus }); 
 
      res.render("requestsstudentproject", { pubCount: pubCount,countresearch, countpatent,pubCountpublication,Uploadd,Projects }); // Render home.ejs
    } else {
      res.render("Adminsignin");
    }
})


app.post('/AdminProjectReqAccept', async (req, res) => {
  if (req.session.username) {
    const username= req.session.username
    const Status= "Completed"
    const { id } = req.body;
    const updatedProjects = await RecentProjectsCollection.findByIdAndUpdate( id, {Status},)
    
    const StatusProjects= "Accepted" 
    const Projects = await RecentProjectsCollection.find({Status:StatusProjects });
    const ProjectTypeproject = "project"
    const ProjectTyperesearch ="research-project"
    const ProjectTypepatent ="patent"
    const ProjectTypepublication="publication"
    const pubCount = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypeproject,Status:StatusProjects}); 
    const countresearch = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTyperesearch,Status:StatusProjects}); 
    const countpatent = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypepatent,Status:StatusProjects}); 
    const countpublication = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypepublication,Status:StatusProjects});  
    
     const pubStatus= "Pending"
    const pubCountpublication = await StaffpublicationCollection.countDocuments({Status:pubStatus });
    const Uploadd = await StaffProjectsCollection.find({ Status:pubStatus });  

    res.render("AdminProjectRequests", {Message: "Project Accepted successfully!", pubCount: pubCount,countresearch, countpatent,pubCountpublication,Uploadd,Projects }); // Render home.ejs
  
    } else {
      res.render("Adminsignin");
    }
})

app.post('/AdminProjectReqReject', async (req, res) => {
  if (req.session.username) {
    const username= req.session.username
    const Status= "Rejected"
    const { id } = req.body;
    const updatedProjects = await RecentProjectsCollection.findByIdAndUpdate( id, {Status},)
   
    const StatusProjects= "Accepted" 
    const Projects = await RecentProjectsCollection.find({Status:StatusProjects });
    const ProjectTypeproject = "project"
    const ProjectTyperesearch ="research-project"
    const ProjectTypepatent ="patent"
    const ProjectTypepublication="publication"
    const pubCount = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypeproject,Status:StatusProjects}); 
    const countresearch = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTyperesearch,Status:StatusProjects}); 
    const countpatent = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypepatent,Status:StatusProjects}); 
    const countpublication = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypepublication,Status:StatusProjects});  
    
     const pubStatus= "Pending"
    const pubCountpublication = await StaffpublicationCollection.countDocuments({Status:pubStatus });
    const Uploadd = await StaffProjectsCollection.find({ Status:pubStatus });  

    res.render("AdminProjectRequests", {Message: "Project Rejected successfully!", pubCount: pubCount,countresearch, countpatent,pubCountpublication,Uploadd,Projects }); // Render home.ejs
  
  
  } else {
      res.render("Adminsignin");
    }
})




app.post('/AdminPublicationReqAccept', async (req, res) => {
  if (req.session.username) {
    const username= req.session.username
    const Status= "Completed"
    const { id,docid } = req.body;
    const updatedProjects = await StaffProjectsCollection.findByIdAndUpdate( id, {Status},)
    const updatedPublication = await StaffpublicationCollection.findByIdAndUpdate( docid, {Status},)
    
   
    const StatusProjects= "Accepted" 
    const Projects = await RecentProjectsCollection.find({Status:StatusProjects });
    const ProjectTypeproject = "project"
    const ProjectTyperesearch ="research-project"
    const ProjectTypepatent ="patent"
    const ProjectTypepublication="publication"
    const pubCount = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypeproject,Status:StatusProjects}); 
    const countresearch = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTyperesearch,Status:StatusProjects}); 
    const countpatent = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypepatent,Status:StatusProjects}); 
    const countpublication = await RecentProjectsCollection.countDocuments({ ProjectType: ProjectTypepublication,Status:StatusProjects});  
    
     const pubStatus= "Pending"
    const pubCountpublication = await StaffpublicationCollection.countDocuments({Status:pubStatus });
    const Uploadd = await StaffProjectsCollection.find({ Status:pubStatus });  

    res.render("AdminProjectRequests", {Message: "Project Accepted successfully!", pubCount: pubCount,countresearch, countpatent,pubCountpublication,Uploadd,Projects }); // Render home.ejs
  
    } else {
      res.render("Adminsignin");
    }
})




app.post('/AdminPublicationReject', async (req, res) => {
  if (req.session.username) {
    const username= req.session.username
    const Status= "Rejected"
    const { id,docid } = req.body;

    const updatedProjects = await StaffpublicationCollection.findByIdAndUpdate( id, {Status},)
    const StatusProjects= "Accepted" 
    const Projects = await StaffpublicationCollection.find({Status:StatusProjects });
    const ProjectTypeproject = "project"
    const ProjectTyperesearch ="research-project"
    const ProjectTypepatent ="patent"
    const ProjectTypepublication="publication"
    const pubCount = await StaffpublicationCollection.countDocuments({ ProjectType: ProjectTypeproject,Status:StatusProjects}); 
    const countresearch = await StaffpublicationCollection.countDocuments({ ProjectType: ProjectTyperesearch,Status:StatusProjects}); 
    const countpatent = await StaffpublicationCollection.countDocuments({ ProjectType: ProjectTypepatent,Status:StatusProjects}); 
    const countpublication = await StaffpublicationCollection.countDocuments({ ProjectType: ProjectTypepublication,Status:StatusProjects});  
    
     const pubStatus= "Pending"
    const pubCountpublication = await StaffpublicationCollection.countDocuments({Status:pubStatus });
    const Uploadd = await StaffProjectsCollection.find({ Status:pubStatus });  

    console.log("Uploadpub:", Uploadd);
    res.render("AdminPublicationReject", {Message: "Publication Rejected successfully!", pubCount: pubCount,countresearch, countpatent,pubCountpublication,Uploadd,Projects }); // Render home.ejs
  
  
  } else {
      res.render("Adminsignin");
    }
})




app.get('/AdminManageStudent', async (req, res) => {

  try {     
          const students = await SignupStudentCollection.find(); 
          return res.status(201).render("AdminManageStudent", {students});   
         
      }  
      catch (e) {
      return res.status(400).render('Adminsignin', {
          Message: 'wrong inputs!'+ e,
          isError: true, 
      }); 
      }
})





app.post('/AdminStudentDelete', async (req, res) => {
  if (req.session.username) {
    const usernam= req.session.username 
    const { username } = req.body; 
    
    await SignupStudentCollection.deleteOne({ username: username });
    const students = await SignupStudentCollection.find();  
    res.render("AdminManageStudent", {Message: "Student Deleted successfully!", students }); 
  
  
  } else {
      res.render("Adminsignin");
    }
})







app.get('/AdminManageFaculty', async (req, res) => {

  try {     
          const Staff = await StaffAccountProfileCollection.find(); 
          return res.status(201).render("AdminManageFaculty", {Staff});   
         
      }  
      catch (e) {
      return res.status(400).render('Adminsignin', {
          Message: 'wrong inputs!'+ e,
          isError: true, 
      }); 
      }
})

app.get('/requestsfacultypublications', async (req, res) => {
    if (req.session.username) {
      const username= req.session.username
      const Status= "Accepted" 
        const Projects = await StaffpublicationCollection.find({Status:Status });
        const ProjectTypeproject = "project"
        const ProjectTyperesearch ="research-project"
        const ProjectTypepatent ="patent"
        const ProjectTypepublication="publication"
  
        const pubCount = await StaffpublicationCollection.countDocuments({ ProjectType: ProjectTypeproject,Status:Status}); 
        const countresearch = await StaffpublicationCollection.countDocuments({ ProjectType: ProjectTyperesearch,Status:Status}); 
        const countpatent = await StaffpublicationCollection.countDocuments({ ProjectType: ProjectTypepatent,Status:Status}); 
        const countpublication = await StaffpublicationCollection.countDocuments({ ProjectType: ProjectTypepublication,Status:Status});  
        
         const pubStatus= "Pending"
        const pubCountpublication = await StaffpublicationCollection.countDocuments({Status:pubStatus });
        const Uploadd = await StaffProjectsCollection.find({ Status:pubStatus }); 
   
        res.render("requestsfacultypublications", { pubCount: pubCount,countresearch, countpatent,pubCountpublication,Uploadd,Projects }); // Render home.ejs
      } else {
        res.render("Adminsignin");
      }
  })
  

app.post("/AdminAddStaff", upload.single("file"), async (req, res) => {
  try {
      const { firstname, lastname, username, email, password, collegename } = req.body;
      if (!username || !email || !password) {
        return res.status(400).render("Adminsignin", {
          Message: "Missing required fields!",
          isError: true,
        });
      } 
      const existingUser = await StaffAccountProfileCollection.findOne({ username });
      if (existingUser) {
        return res.status(400).render("Adminsignin", {
          Message: "User details already exist!",
          isError: true,
        });
      }
      const Statusa="activated"
      const newUser = new StaffAccountProfileCollection({
          firstname,
          lastname,
          username,
          email,
          password,
          collegename,
          department: req.body.department,
          doj: req.body.doj,
          employeeid: req.body.employeeid,
          phone: req.body.phone,
          profilePic: req.file ? req.file.path : null,
          Status:Statusa
        });
        await newUser.save();
        await StaffAccountProfileCollection.create([newUser]);
        const Staff = await StaffAccountProfileCollection.find();  
  return res.status(201).render("AdminManageFaculty", {
    Message: "Added Faculty Successfully!",Staff,
    isError: false, 
  });
} catch (err) {
  console.error(err); 
  return res.status(500).render("Adminsignin", {
    Message: "Something went wrong! " + err.message,
    isError: true,
  });
}
}) 




app.post('/AdminStaffDelete', async (req, res) => {
  if (req.session.username) {
    const usernam= req.session.username 
    const { username } = req.body; 
    
    await StaffAccountProfileCollection.deleteOne({ username: username });
   
    const Staff = await StaffAccountProfileCollection.find();  
    res.render("AdminManageFaculty", {Message: "Student Deleted successfully!", Staff }); 
  
  
  } else {
      res.render("Adminsignin");
    }
})




app.get('/StaffHomepage', async (req, res) => {
  if (req.session.username) {
      const username= req.session.username 
      const Staff = await StaffAccountProfileCollection.findOne({ username }); 
      const pubCount = await RecentProjectsCollection.countDocuments({ collegename: Staff.collegename,
        Dept: Staff.department });
      const Projects = await RecentProjectsCollection.find({ collegename: Staff.collegename,
        Dept: Staff.department }); 
      return res.status(201).render("StaffHomepage", {Staff, pubCount,Projects});

    } else {
      res.render("Staffsignin");
    }
})

 
app.get('/staffDashboard', async (req, res) => {
  if (req.session.username) {
      const username= req.session.username
      const Staff = await StaffAccountProfileCollection.findOne({ username }); 
      const pubCount = await StaffpublicationCollection.countDocuments({ collegename: Staff.collegename,
        Dept: Staff.department });
      const Projects = await StaffpublicationCollection.find({ collegename: Staff.collegename,
        Dept: Staff.department });
      const StaffProfile = await StaffProfileCollection.findOne({username });  
      res.render("staffDashboard", { pubCount: pubCount,Staff,Projects,StaffProfile }); // Render home.ejs
    } else {
      res.render("Staffsignin");
    }
})

 
app.get('/StaffProjectRequests', async (req, res) => {
  if (req.session.username) {
    const username= req.session.username
    const Status= "Pending"
      const Staff = await StaffAccountProfileCollection.findOne({ username }); 
      const pubCount = await RecentProjectsCollection.countDocuments({ collegename: Staff.collegename,
        Dept: Staff.department , Status:Status });
      const Projects = await RecentProjectsCollection.find({ collegename: Staff.collegename,
        Dept: Staff.department, Status:Status });
      res.render("StaffProjectRequests", { pubCount: pubCount,Staff,Projects }); // Render home.ejs
    } else {
      res.render("Staffsignin");
    }
})

app.post('/StaffProjectReqAccept', async (req, res) => {
  if (req.session.username) {
    const username= req.session.username
    const Status= "Accepted"
    const { id } = req.body;
    const updatedProjects = await RecentProjectsCollection.findByIdAndUpdate( id, {Status},)

      const Staff = await StaffAccountProfileCollection.findOne({ username });
      
    const Statuspen= "Pending" 
      const pubCount = await RecentProjectsCollection.countDocuments({ collegename: Staff.collegename,
        Dept: Staff.department , Status:Statuspen });
      const Projects = await RecentProjectsCollection.find({ collegename: Staff.collegename,
        Dept: Staff.department, Status:Statuspen });
      res.render("StaffProjectRequests", {Message: "Project Accepted successfully!", pubCount: pubCount,Staff,Projects }); // Render home.ejs
    } else {
      res.render("Staffsignin");
    }
})

app.post('/StaffProjectReqReject', async (req, res) => {
  if (req.session.username) {
    const username= req.session.username
    const Status= "Rejected"
    const { id } = req.body;
    const updatedProjects = await RecentProjectsCollection.findByIdAndUpdate( id, {Status},)

    const Staff = await StaffAccountProfileCollection.findOne({ username });
      
    const Statuspen= "Pending" 
      const pubCount = await RecentProjectsCollection.countDocuments({ collegename: Staff.collegename,
        Dept: Staff.department , Status:Statuspen });
      const Projects = await RecentProjectsCollection.find({ collegename: Staff.collegename,
        Dept: Staff.department, Status:Statuspen });
      res.render("StaffProjectRequests", {Message: "Project Rejected successfully!", pubCount: pubCount,Staff,Projects }); // Render home.ejs
    } else {
      res.render("Staffsignin");
    }
})



app.get('/StaffLeaderboard', async (req, res) => {
  if (req.session.username) {
    const username= req.session.username
    const Status= "Pending"
      const Staff = await StaffAccountProfileCollection.findOne({ username }); 
      const pubCount = await StaffpublicationCollection.countDocuments({ collegename: Staff.collegename,
        Dept: Staff.department , Status:Status });
        const Uploadd = await StaffpublicationCollection.find();
      res.render("StaffLeaderboard", { pubCount: pubCount,Staff,Uploadd }); // Render home.ejs
    } else {
      res.render("Staffsignin");
    }
})




app.get('/StaffRecentPublications', async (req, res) => {
  if (req.session.username) {
    const username= req.session.username
      const Staff = await StaffAccountProfileCollection.findOne({ username });
      const pubCount = await StaffpublicationCollection.countDocuments({ Username: username });
      const Uploadd = await StaffpublicationCollection.find({Username: username }); 
      
    console.log("Staff:", Staff);
    console.log("pubCount:", pubCount);
    console.log("Uploadpub:", Uploadd);
      res.render("StaffRecentPublications", { pubCount: pubCount,Staff,Uploadd });
    } else {
      res.render("Staffsignin");
    }
})


app.post('/StaffProjectDelete', async (req, res) => {
  if (req.session.username) {
    const username= req.session.username
    
    const { Projectid, docid } = req.body;
      const Staff = await StaffAccountProfileCollection.findOne({ username });
      const pubCount = await StaffpublicationCollection.countDocuments({ Username: username });
      const Uploadd = await StaffpublicationCollection.find({Username: username }); 
      
    console.log("Staff:", Staff);
    console.log("pubCount:", pubCount);
    console.log("Uploadpub:", Uploadd);
    const { ObjectId } = require('mongodb');

    // await StaffProjectsCollection.deleteOne({ username });
    await StaffProjectsCollection.deleteOne({ _id: new ObjectId(Projectid) });
    await StaffpublicationCollection.deleteOne({ _id: new ObjectId(docid) });




      res.render("StaffRecentPublications", {Message: "Project Deleted successfully!", pubCount: pubCount,Staff,Uploadd });
    } else {
      res.render("Staffsignin");
    }
})


app.get('/StaffPublications', async (req, res) => {
  if (req.session.username) { 
      const username= req.session.username
      const Staff = await StaffAccountProfileCollection.findOne({ username });
      const pubCount = await StaffpublicationCollection.countDocuments({ Username: username });
      res.render("StaffPublications", { username: req.session.username,profilePic: Staff.profilePic, pubCount: pubCount  }); // Render home.ejs
    } else {
      res.render("signinUI");
    }
})



app.post(  "/StaffPublications",  upload.fields([
  { name: "thumbnailFile", maxCount: 1 },
  { name: "imageFiles", maxCount: 10 },
  { name: "researchPapers", maxCount: 10 },
  { name: "patentDocs", maxCount: 10 },
  { name: "projectFiles", maxCount: 10 },
  { name: "certificates", maxCount: 10 },  ]),  async (req, res) => {
  try {
    if (req.session.username) { 
      const username= req.session.username
      console.log("username",username);
      const Staff = await StaffAccountProfileCollection.findOne({ username }); 
  
    const { 
      Projectname, ProjectType, Department, GitHub, Live, Description, StartupIdea 
    } = req.body; 

    const moment = require("moment");
    const Uploaddate = moment().format("YYYY-MM-DD");
    console.log(Uploaddate);
    const Username=username
    console.log("Username",Username);
    
    const uploadData = new StaffpublicationCollection({ 
      Username,
      Projectname,
      ProjectType,
      Department,
      GitHub,
      Live,
      Description,
      StartupIdea,
      // thumbnailFile,
      // imageFiles,
      // researchPapers,
      // patentDocs,
      // projectFiles,
      // certificates,
      thumbnailFile: req.files.thumbnailFile
        ? `uploads/${req.files.thumbnailFile[0].filename}`
        : null,
      imageFiles: req.files.imageFiles
        ? req.files.imageFiles.map((file) => `uploads/${file.filename}`)
        : [],
      researchPapers: req.files.researchPapers
        ? req.files.researchPapers.map((file) => `uploads/${file.filename}`)
        : [],
      patentDocs: req.files.patentDocs
        ? req.files.patentDocs.map((file) => `uploads/${file.filename}`)
        : [],
      projectFiles: req.files.projectFiles
        ? req.files.projectFiles.map((file) => `uploads/${file.filename}`)
        : [],
      certificates: req.files.certificates
        ? req.files.certificates.map((file) => `uploads/${file.filename}`)
        : [],
      Uploaddate,
    });

    // await uploadData.save();
    await StaffpublicationCollection.create([uploadData]);
    const documentid = await StaffpublicationCollection.findOne({
      Username: Username,
      Projectname: Projectname,
      ProjectType: ProjectType,
    });
    const UserId = Staff.employeeid
    const Dept = Staff.department
    const profilePic = Staff.profilePic
    const ProjectTitle=Projectname
    const Status="Pending"
    const collegename=Staff.collegename
    const Uploadpubss=documentid._id
    const UploadPublicationId = Uploadpubss.toString();
    
    console.log("pubCount:", collegename);
    console.log("Uploadpublicationid:", UploadPublicationId);
    const RecentProject = new StaffpublicationCollection({ 
      Username,
      UserId,
      Uploaddate,
      ProjectTitle,
      collegename,
      Dept,
      Status,
      ProjectType,
      profilePic,
      UploadPublicationId,
    });

    // await uploadData.save();
    await StaffpublicationCollection.create([RecentProject]);



    
    res.render("StaffPublications", { Message: "Project uploaded successfully!",username: req.session.username,profilePic: Staff.profilePic  });  
  } else {
    res.render("signinUI");
  }
  } catch (err) {
    console.error("Error saving project:", err);
    res.status(500).send("Error saving project.");
  }
}
);




app.post("/submitStaffprofile", async (req, res) => {
  try {
    
    const username= req.session.username
    console.log("username",username);
    const {
      githubLink,
      linkedinLink,
      facebookLink,
      backgroundImage,
      profileImage,
      department,
      employeeid,
      award,
      win,
      description,
    } = req.body;

    await StaffProfileCollection.deleteOne({ username });

    const profile = new StaffProfileCollection({
      username,
      githubLink,
      linkedinLink,
      facebookLink,
      backgroundImage,
      profileImage,
      department,
      employeeid,
      awards: award || [],
      wins: win || [],
      description,
    });

    await profile.save();
    await StaffProfileCollection.create([profile]);

    const Staff = await StaffAccountProfileCollection.findOne({ username }); 
    const pubCount = await RecentProjectsCollection.countDocuments({ collegename: Staff.collegename,
      Dept: Staff.department });
    const Projects = await StaffpublicationCollection.find({ collegename: Staff.collegename,
      Dept: Staff.department });
    const StaffProfile = await StaffProfileCollection.findOne({username }); 


    return res.status(201).render("staffDashboard", { pubCount: pubCount,Staff,Projects,StaffProfile });


  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving profile");
  }
});





app.get('/homepage', async (req, res) => {
    if (req.session.username) {
        const username= req.session.username
        const student = await SignupStudentCollection.findOne({ username });
        const pubCount = await UploadpublicationCollection.countDocuments();
        console.log("pubCount",pubCount);
        const Uploadd = await RecentProjectsCollection.find();
 
        res.render("homepage", {pubCount: pubCount, Uploadd, student }); // Render home.ejs
      } else {
        res.render("signinUI");
      }
})
 
app.get('/dashboard', async (req, res) => {
    if (req.session.username) {
        const username= req.session.username
        const student = await SignupStudentCollection.findOne({ username }); 
        const pubCount = await UploadpublicationCollection.countDocuments({ Username: username });
        const Uploadd = await RecentProjectsCollection.find({Username: username });
        // console.log("pubCount",pubCount);
        // console.log("pubCount",Uploadd);
        
        const UploaddProfile = await StudentProfileCollection.findOne({username });  
        res.render("dashboard", { pubCount: pubCount,student,Uploadd,UploaddProfile }); // Render home.ejs
      } else {
        res.render("signinUI");
      }
})
app.get('/recentstaffpublications', async (req, res) => {
  if (req.session.username) { 
      const username= req.session.username
      const Staff = await StaffAccountProfileCollection.findOne({ username });
      const pubCount = await StaffpublicationCollection.countDocuments({ Username: username });
      const Uploadd = await RecentstaffpublicationsCollection.find({Username: username });


      res.render("recentstaffpublications", {pubCount: pubCount, Staff, Uploadd }); // Render home.ejs
    } else {
      res.render("signinUI");
    }
})

app.get('/recentpublications', async (req, res) => {
  if (req.session.username) { 
      const username= req.session.username
      const student = await SignupStudentCollection.findOne({ username });
      const pubCount = await UploadpublicationCollection.countDocuments({ Username: username });
      const Uploadd = await RecentProjectsCollection.find({Username: username });


      res.render("recentpublications", {pubCount: pubCount, student, Uploadd }); // Render home.ejs
    } else {
      res.render("signinUI");
    }
})
app.get('/recentstartups', async (req, res) => {
  if (req.session.username) { 
      const username= req.session.username
      const student = await SignupStudentCollection.findOne({ username });
      const pubCount = await UploadstartupCollection.countDocuments({ Username: username });
      const Uploadd = await RecentstartupsCollection.find({Username: username });


      res.render("recentstartups", {pubCount: pubCount, student, Uploadd }); // Render home.ejs
    } else {
      res.render("signinUI");
    }
})
// ntspage
app.get('/recentgrants', async (req, res) => {
  if (req.session.username) {
    const username = req.session.username;
    const student = await SignupStudentCollection.findOne({ username });
    const pubCount = await UploadgrantsCollection.countDocuments({
      Username: username,
    });
    const Uploadd = await RecentgrantsCollection.find({ Username: username });

    res.render("recentgrants", { pubCount: pubCount, student, Uploadd }); // Render home.ejs  
  } else {
    res.render("signinUI");
  }
})
app.get('/recentachievements', async (req, res) => {
  if (req.session.username) {
    const username = req.session.username;
    const student = await SignupStudentCollection.findOne({ username });
    const pubCount = await UploadachievementsCollection.countDocuments({
      Username: username,
    });
    const Uploadd = await RecentachievementsCollection.find({ Username: username });

    res.render("recentachievements", { pubCount: pubCount, student, Uploadd }); // Render home.ejs  
  } else {
    res.render("signinUI");
  }
})

app.get('/viewgrants/:id', async (req, res) => {
  try {
    const Uploadgrantsid = req.params.id;
    const username= req.session.username
    const student = await SignupStudentCollection.findOne({ username }); 
    const Uploadpub = await UploadgrantsCollection.findById(Uploadgrantsid);
    // const Projects = await RecentProjectsCollection.findById(id);
    const Projects = await RecentgrantsCollection.findOne({Uploadgrantsid});
    console.log("username:", username);
    console.log("Uploadgrantsid:", Uploadgrantsid);
    console.log("student:", student);
    console.log("Projects:", Projects);
    console.log("Uploadpub:", Uploadpub);
    const teamData = Uploadpub.TeamMember.map((member, index) => ({
      name: member,
      hallTicket: Uploadpub.HallTicket[index] || "N/A", 
    }));

      if (Projects.length === 0) {
          res.render('viewgrants', {Message: 'No Grants found!',student,Projects,Uploadpub: { ...Uploadpub._doc, teamData }});
      }
      res.render('viewgrants', { Message: 'No Grants found!', student,Projects,Uploadpub: { ...Uploadpub._doc, teamData }});
       
  } catch (err) {
    return res.status(500).render('viewgrants', {
      Message: 'Error fetching Grants!',
      isError: true,
  }); 
  }
})
app.get('/viewstartups/:id', async (req, res) => {
  try {
    const Uploadstartupid = req.params.id;
    const username= req.session.username
    const student = await SignupStudentCollection.findOne({ username }); 
    const Uploadpub = await UploadstartupCollection.findById(Uploadstartupid);
    // const Projects = await RecentProjectsCollection.findById(id);
    const Projects = await RecentstartupsCollection.findOne({Uploadstartupid});
    console.log("username:", username);
    console.log("Uploadstartupid:", Uploadstartupid);
    console.log("student:", student);
    console.log("Projects:", Projects);
    console.log("Uploadpub:", Uploadpub);
    const teamData = Uploadpub.TeamMember.map((member, index) => ({
      name: member,
      hallTicket: Uploadpub.HallTicket[index] || "N/A", 
    }));

      if (Projects.length === 0) {
          res.render('viewstartups', {Message: 'No Startups found!',student,Projects,Uploadpub: { ...Uploadpub._doc, teamData }});
      }
      res.render('viewstartups', { Message: 'No Startups found!', student,Projects,Uploadpub: { ...Uploadpub._doc, teamData }});
       
  } catch (err) {
    return res.status(500).render('viewstartups', {
      Message: 'Error fetching Startups!',
      isError: true,
  }); 
  }
})
app.get("/view-project/:id", async (req, res) => {
  try {
    const project = await UploadpublicationCollection.findById(req.params.id);

    // Decrypt fields
    const decryptedProject = {
      Username: project.Username,
      Projectname: decrypt(project.Projectname),
      ProjectType: decrypt(project.ProjectType),
      Department: decrypt(project.Department),
      TechStack: project.TechStack.map((stack) => decrypt(stack)),
      TeamName: decrypt(project.TeamName),
      TeamMember: project.TeamMember.map((member) => decrypt(member)),
      HallTicket: project.HallTicket.map((ticket) => decrypt(ticket)),
      Awards: project.Awards.map((awd) => decrypt(awd)),
      Wins: project.Wins.map((win) => decrypt(win)),
      GitHub: decrypt(project.GitHub),
      Live: decrypt(project.Live),
      Description: decrypt(project.Description),
      StartupIdea: decrypt(project.StartupIdea),
      thumbnailFile: project.thumbnailFile ? decrypt(project.thumbnailFile) : null,
      imageFiles: project.imageFiles.map((file) => decrypt(file)),
      researchPapers: project.researchPapers.map((file) => decrypt(file)),
      patentDocs: project.patentDocs.map((file) => decrypt(file)),
      projectFiles: project.projectFiles.map((file) => decrypt(file)),
      certificates: project.certificates.map((file) => decrypt(file)),
      Uploaddate: project.Uploaddate,
    };
    res.render("projectDetails", { project: decryptedProject });
  } catch (err) {
    console.error("Error retrieving project:", err);
    res.status(500).send("Error retrieving project.");
  }
});

app.get('/viewachievements/:id', async (req, res) => {
  try {
    const Uploadachievementsid = req.params.id;
    const username= req.session.username
    const student = await SignupStudentCollection.findOne({ username }); 
    const Uploadpub = await UploadachievementsCollection.findById(Uploadachievementsid);
    // const Projects = await RecentProjectsCollection.findById(id);
    const Projects = await RecentachievementsCollection.findOne({Uploadachievementsid});
    console.log("username:", username);
    console.log("Uploadachievementsid:", Uploadachievementsid);
    console.log("student:", student);
    console.log("Projects:", Projects);
    console.log("Uploadpub:", Uploadpub);
    const teamData = Uploadpub.TeamMember.map((member, index) => ({
      name: member,
      hallTicket: Uploadpub.HallTicket[index] || "N/A", 
    }));

      if (Projects.length === 0) {
          res.render('viewprojects', {Message: 'No Projects found!',student,Projects,Uploadpub: { ...Uploadpub._doc, teamData }});
      }
      res.render('viewprojects', { Message: 'No Projects found!', student,Projects,Uploadpub: { ...Uploadpub._doc, teamData }});
       
  } catch (err) {
    return res.status(500).render('viewprojects', {
      Message: 'Error fetching Projects!',
      isError: true,
  }); 
  }
})
//uploadgrant
app.get("/Uploadgrants", async (req, res) => {
  if (req.session.username) {
    const username = req.session.username;
    const student = await SignupStudentCollection.findOne({ username });
    const pubCount = await UploadgrantsCollection.countDocuments({
      Username: username,
    });
    res.render("Uploadgrants", {
      username: req.session.username,
      profilePic: student.profilePic,
      pubCount: pubCount,
    }); // Render home.ejs
  } else {
    res.render("signinUI");
  }
})

app.post(
  "/Uploadgrants",
  upload.fields([
    { name: "thumbnailFile", maxCount: 1 },
    { name: "imageFiles", maxCount: 2 },
    { name: "researchPapers", maxCount: 1 },
    { name: "patentDocs", maxCount: 1 },
    { name: "projectFiles", maxCount: 1 },
    { name: "certificates", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (req.session.username) {
        const username = req.session.username;
        console.log("username", username);
        const student = await SignupStudentCollection.findOne({ username });

        // console.log("body uploaded:", req.body);
        // console.log("Files uploaded:", req.files);
        const {
          Projectname,
          ProjectType,
          Department,
          Grants,
          TechStack,
          TeamName,
          TeamMember,
          HallTicket,
          award,
          Win,
          GitHub,
          Live,
          Description,
          StartupIdea,
          WhyYouNeedGrants,
        } = req.body;

        const thumbnailFile = req.files["thumbnailFile"]? req.files["thumbnailFile"][0].filename: null;
        const imageFiles = req.files["imageFiles"]? req.files["imageFiles"].map((file) => file.filename): [];
        const researchPapers = req.files["researchPapers"]? req.files["researchPapers"].map((file) => file.filename): [];
        const patentDocs = req.files["patentDocs"]? req.files["patentDocs"].map((file) => file.filename): [];
        const projectFiles = req.files["projectFiles"]? req.files["projectFiles"].map((file) => file.filename): [];
        const certificates = req.files["certificates"]? req.files["certificates"].map((file) => file.filename): [];

        const moment = require("moment");
        const Uploaddate = moment().format("YYYY-MM-DD");
        console.log(Uploaddate);
        const Username = username;
        console.log("Username", Username);

        const uploadData = new UploadgrantsCollection({
          Username,
          Projectname,
          ProjectType,
          Department,
          Grants,
          TechStack: TechStack.split(","),
          TeamName,
          TeamMember: TeamMember.split(","),
          HallTicket: HallTicket.split(","),
          Awards: award.split(","),
          Wins: Win.split(","),
          GitHub,
          Live,
          Description,
          StartupIdea,
          WhyYouNeedGrants,
          thumbnailFile,
          imageFiles,
          researchPapers,
          patentDocs,
          projectFiles,
          certificates,
          Uploaddate,
        });

        // await uploadData.save();
        await UploadgrantsCollection.create([uploadData]);
        const documentid = await UploadgrantsCollection.findOne({
          Username: Username,
          Projectname: Projectname,
          ProjectType: ProjectType,
          Grants: Grants,
        });
        const UserId = student.hallticket;
        const Dept = student.department;
        const profilePic = student.profilePic;
        const ProjectTitle = Projectname;
        const Status = "Pending";
        const Points = "10";
        Uploadgrantsid = documentid._id;
        const Recentgrants = new  RecentgrantsCollection({
          Username,
          UserId,
          Uploaddate,
          ProjectTitle,
          Grants,
          TeamName,
          Dept,
          Status,
          ProjectType,

          profilePic,
          Points,
          Uploadgrantsid,
        });

        // await uploadData.save();
        await RecentgrantsCollection.create([Recentgrants]);

        res.render("Uploadgrants", {
          Message: "Project uploaded successfully!",
          username: req.session.username,
          profilePic: student.profilePic,
        }); // Render home.ejs
      } else {
        res.render("signinUI");
      }
    } catch (err) {
      console.error("Error saving project:", err);
      res.status(500).send("Error saving project.");
    } 
  }
);

app.get("/Uploadachievements", async (req, res) => {
  if (req.session.username) {
    const username = req.session.username;
    const student = await SignupStudentCollection.findOne({ username });
    const pubCount = await UploadachievementsCollection.countDocuments({
      Username: username,
    });
    res.render("Uploadachievements", {
      username: req.session.username,
      profilePic: student.profilePic,
      pubCount: pubCount,
    }); // Render Uploadachievements.ejs
  } else {
    res.render("signinUI");
  }
});

app.post(
  "/Uploadachievements",
  upload.fields([
    { name: "thumbnailFile", maxCount: 1 },
    { name: "imageFiles", maxCount: 2 },
    { name: "researchPapers", maxCount: 1 },
    { name: "patentDocs", maxCount: 1 },
    { name: "projectFiles", maxCount: 1 },
    { name: "certificates", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (req.session.username) {
        const username = req.session.username;
        console.log("username", username);
        const student = await SignupStudentCollection.findOne({ username });

        const {
          Innovationname,
          InnovationType,
          Department,
          Awards,
          AwardBy,
          HallTicket,
          Win,
          GitHub,
          Live,
          Description,
        } = req.body;

        const thumbnailFile = req.files["thumbnailFile"]
          ? req.files["thumbnailFile"][0].filename
          : null;
        const imageFiles = req.files["imageFiles"]
          ? req.files["imageFiles"].map((file) => file.filename)
          : [];
        const researchPapers = req.files["researchPapers"]
          ? req.files["researchPapers"].map((file) => file.filename)
          : [];
        const patentDocs = req.files["patentDocs"]
          ? req.files["patentDocs"].map((file) => file.filename)
          : [];
        const projectFiles = req.files["projectFiles"]
          ? req.files["projectFiles"].map((file) => file.filename)
          : [];
        const certificates = req.files["certificates"]
          ? req.files["certificates"].map((file) => file.filename)
          : [];

        const moment = require("moment");
        const Uploaddate = moment().format("YYYY-MM-DD");
        console.log(Uploaddate);
        const Username = username;

        const uploadData = new UploadachievementsCollection({
          Username,
          Innovationname,
          InnovationType,
          Department,
          HallTicket: HallTicket.split(","),
          Awards: Awards.split(","),
          AwardBy: AwardBy.split(","),
          Wins: Win.split(","),
          GitHub,
          Live,
          Description,
          thumbnailFile,
          imageFiles,
          researchPapers,
          patentDocs,
          projectFiles,
          certificates,
          Uploaddate,
        });

        await uploadData.save();

        const documentid = await UploadachievementsCollection.findOne({
          Username,
          Innovationname,
          InnovationType,
        });

        const UserId = student.hallticket;
        const Dept = student.department;
        const profilePic = student.profilePic;

        const Status = "Pending";
        const Uploadachievementsid = documentid._id;

        const Recentachievements = new RecentachievementsCollection({
          Username,
          UserId,
          Uploaddate,
          Innovationname,
          Dept,
          Awards,
          AwardBy,
          Status,
          InnovationType,
          profilePic,
          Uploadachievementsid,
        });

        await Recentachievements.save();

        res.render("Uploadachievements", {
          Message: "Achievement uploaded successfully!",
          username: req.session.username,
          profilePic: student.profilePic,
        });
      } else {
        res.render("signinUI");
      }
    } catch (err) {
      console.error("Error saving Achievement:", err);
      res.status(500).send("Error saving Achievement.");
    }
  }
);

//uploadgrant
app.get("/Uploadstartup", async (req, res) => {
  if (req.session.username) {
    const username = req.session.username;
    const student = await SignupStudentCollection.findOne({ username });
    const pubCount = await UploadstartupCollection.countDocuments({
      Username: username,
    });
    res.render("Uploadstartup", {
      username: req.session.username,
      profilePic: student.profilePic,
      pubCount: pubCount,
    }); // Render home.ejs
  } else {
    res.render("signinUI");
  }
})

app.post(
  "/Uploadstartup",
  upload.fields([
    { name: "thumbnailFile", maxCount: 1 },
    { name: "imageFiles", maxCount: 2 },
    { name: "researchPapers", maxCount: 1 },
    { name: "patentDocs", maxCount: 1 },
    { name: "projectFiles", maxCount: 1 },
    { name: "certificates", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (req.session.username) {
        const username = req.session.username;
        console.log("username", username);
        const student = await SignupStudentCollection.findOne({ username });

        // console.log("body uploaded:", req.body);
        // console.log("Files uploaded:", req.files);
        const {
          Projectname,
          Department,
          StartupIdea,
          Startupname,
          SI,
          TechStack,
          TeamName,
          TeamMember,
          HallTicket,
          award,
          Win,
          GitHub,
          Live,
          Description,
          
        } = req.body;

        const thumbnailFile = req.files["thumbnailFile"]? req.files["thumbnailFile"][0].filename: null;
        const imageFiles = req.files["imageFiles"]? req.files["imageFiles"].map((file) => file.filename): [];
        const researchPapers = req.files["researchPapers"]? req.files["researchPapers"].map((file) => file.filename): [];
        const patentDocs = req.files["patentDocs"]? req.files["patentDocs"].map((file) => file.filename): [];
        const projectFiles = req.files["projectFiles"]? req.files["projectFiles"].map((file) => file.filename): [];
        const certificates = req.files["certificates"]? req.files["certificates"].map((file) => file.filename): [];

        const moment = require("moment");
        const Uploaddate = moment().format("YYYY-MM-DD");
        console.log(Uploaddate);
        const Username = username;
        console.log("Username", Username);

        const uploadData = new UploadstartupCollection({
          Username,
          Projectname,
          Department,
          TechStack: TechStack.split(","),
          Startupname,
          StartupIdea,
          SI,
          TeamName,
          TeamMember: TeamMember.split(","),
          HallTicket: HallTicket.split(","),
          Awards: award.split(","),
          Wins: Win.split(","),
          GitHub,
          Live,
          Description,
          thumbnailFile,
          imageFiles,
          researchPapers,
          patentDocs,
          projectFiles,
          certificates,
          Uploaddate,
        });

        // await uploadData.save();
        await UploadstartupCollection.create([uploadData]);
        const documentid = await UploadstartupCollection.findOne({
          Username: Username,
          Projectname: Projectname,
          Startupname: Startupname,
          SI: SI,
        });
        const UserId = student.hallticket;
        const Dept = student.department;
        const profilePic = student.profilePic;
        const ProjectTitle = Projectname;
        const Status = "Pending";
        const Points = "10";
        Uploadstartupid = documentid._id;
        const Recentstartups = new  RecentstartupsCollection({
          Username,
          UserId,
          Uploaddate,
          Startupname,
          ProjectTitle,
          TeamName,
          Dept,
          Status,
          profilePic,
          Points,
          Uploadstartupid,
        });

        // await uploadData.save();
        await RecentstartupsCollection.create([Recentstartups]);

        res.render("Uploadstartup", {
          Message: "Startup Application uploaded successfully!",
          username: req.session.username,
          profilePic: student.profilePic,
        }); // Render home.ejs
      } else {
        res.render("signinUI");
      }
    } catch (err) {
      console.error("Error saving Startup:", err);
      res.status(500).send("Error saving startup.");
    } 
  }
);


app.get('/leaderboard', async (req, res) => {
  if (req.session.username) {
    const username= req.session.username
    const student = await SignupStudentCollection.findOne({ username });
    const pubCount = await UploadpublicationCollection.countDocuments({ Username: username });
    const Uploadd = await RecentProjectsCollection.find();


    res.render("leaderboard", {pubCount: pubCount, student, Uploadd });

    } else {
      res.render("signinUI");
    }
})
app.get("/Uploadpublications", async (req, res) => {
  if (req.session.username) {
    const username = req.session.username;
    const student = await SignupStudentCollection.findOne({ username });
    const pubCount = await UploadpublicationCollection.countDocuments({
      Username: username,
    });
    res.render("Uploadpublications", {
      username: req.session.username,
      profilePic: student.profilePic,
      pubCount: pubCount,
    }); // Render home.ejs
  } else {
    res.render("signinUI");
  }
});
app.post(  "/Uploadpublications",  upload.fields([
  { name: "thumbnailFile", maxCount: 1 },
  { name: "imageFiles", maxCount: 10 },
  { name: "researchPapers", maxCount: 10 },
  { name: "patentDocs", maxCount: 10 },
  { name: "projectFiles", maxCount: 10 },
  { name: "certificates", maxCount: 10 },  ]),  async (req, res) => {
  try {
    if (req.session.username) { 
      const username= req.session.username
      console.log("username",username);
      const student = await SignupStudentCollection.findOne({ username }); 
    
    // console.log("body uploaded:", req.body);
    // console.log("Files uploaded:", req.files); 
    const { 
      Projectname, ProjectType, Department, TechStack, TeamName, TeamMember, 
      HallTicket, award, Win, GitHub, Live, Description, StartupIdea 
    } = req.body;
    // const thumbnailFile: req.file ? req.file.path : null,

    // const thumbnailFile = req.files["thumbnailFile"] ? "uploads/" +  req.files["thumbnailFile"][0].filename : null;
    // const imageFiles = req.files["imageFiles"] ? req.files["imageFiles"].map(file => "uploads/" +file.filename) : [];
    // const researchPapers = req.files["researchPapers"] ? req.files["researchPapers"].map(file =>"uploads/" + file.filename) : [];
    // const patentDocs = req.files["patentDocs"] ? req.files["patentDocs"].map(file => "uploads/" +file.filename) : [];
    // const projectFiles = req.files["projectFiles"] ? req.files["projectFiles"].map(file => "uploads/" +file.filename) : [];
    // const certificates = req.files["certificates"] ? req.files["certificates"].map(file => "uploads/" +file.filename) : [];
    




    const moment = require("moment");
    const Uploaddate = moment().format("YYYY-MM-DD");
    console.log(Uploaddate);
    const Username=username
    console.log("Username",Username);
    const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const secretKey = "your-secret-key"; // Replace with a secure key
const iv = crypto.randomBytes(16); // Initialization vector

// Encrypt function
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted,
  };
}

// Decrypt function (optional, for later use)
function decrypt(encrypted) {
  const data = JSON.parse(encrypted);
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    Buffer.from(data.iv, "hex")
  );
  let decrypted = decipher.update(data.encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

const uploadData = new UploadpublicationCollection({
  Username,
  Projectname: encrypt(Projectname), // Encrypt Projectname
  ProjectType: encrypt(ProjectType), // Encrypt ProjectType
  Department: encrypt(Department),  // Encrypt Department
  TechStack: TechStack.split(",").map((stack) => encrypt(stack)), // Encrypt TechStack
  TeamName: encrypt(TeamName),      // Encrypt TeamName
  TeamMember: TeamMember.split(",").map((member) => encrypt(member)), // Encrypt TeamMember
  HallTicket: HallTicket.split(",").map((ticket) => encrypt(ticket)), // Encrypt HallTicket
  Awards: award.split(",").map((awd) => encrypt(awd)), // Encrypt Awards
  Wins: Win.split(",").map((win) => encrypt(win)),     // Encrypt Wins
  GitHub: encrypt(GitHub),        // Encrypt GitHub link
  Live: encrypt(Live),            // Encrypt Live link
  Description: encrypt(Description), // Encrypt Description
  StartupIdea: encrypt(StartupIdea), // Encrypt StartupIdea
  thumbnailFile: req.files.thumbnailFile
    ? encrypt(`uploads/${req.files.thumbnailFile[0].filename}`)
    : null, // Encrypt thumbnail file path
  imageFiles: req.files.imageFiles
    ? req.files.imageFiles.map((file) => encrypt(`uploads/${file.filename} `))
    : [], // Encrypt image file paths
  researchPapers: req.files.researchPapers
    ? req.files.researchPapers.map((file) => encrypt(`uploads/${file.filename}`))
    : [], // Encrypt research paper paths
  patentDocs: req.files.patentDocs
    ? req.files.patentDocs.map((file) => encrypt(`uploads/${file.filename}`))
    : [], // Encrypt patent docs paths
  projectFiles: req.files.projectFiles
    ? req.files.projectFiles.map((file) => encrypt(`uploads/${file.filename}`))
: [],
certificates: req.files.certificates
? req.files.certificates.map((file) => encrypt(`uploads/${file.filename}`))
: [],
Uploaddate,
});

    // await uploadData.save();
    await UploadpublicationCollection.create([uploadData]);
    const documentid = await UploadpublicationCollection.findOne({
      Username: Username,
      Projectname: Projectname,
      ProjectType: ProjectType,
    });
    const UserId = student.hallticket
    const Dept = student.department
    const profilePic = student.profilePic
    const ProjectTitle=Projectname
    const Status="Pending"
    const Rating="0"
    const Points="10"
    collegename=student.collegename
    Uploadpublicationid=documentid._id
    const RecentProject = new RecentProjectsCollection({ 
      Username,
      UserId,
      Uploaddate,
      ProjectTitle,
      TeamName,
      collegename,
      Dept,
      Status,
      ProjectType,
      Rating,
      profilePic,
      Points,
      Uploadpublicationid,
    });

    // await uploadData.save();
    await RecentProjectsCollection.create([RecentProject]);



    
    res.render("Uploadpublications", { Message: "Project uploaded successfully!",username: req.session.username,profilePic: student.profilePic  }); // Render home.ejs
  } else {
    res.render("signinUI");
  }
  } catch (err) {
    console.error("Error saving project:", err);
    res.status(500).send("Error saving project.");
  }
}
);

app.get('/collegeanalytics', (req, res) => {
    if (req.session.username) {
        res.render("collegeanalytics", { username: req.session.username }); 
      } else {
        res.render("signinUI");
      }
})
 
app.get('/collegeawards', (req, res) => {
    if (req.session.username) {
        res.render("collegeawards", { username: req.session.username }); 
      } else {
        res.render("signinUI");
      }
})
 
app.get('/collegestartupincubated', (req, res) => {
    if (req.session.username) {
        res.render("collegestartupincubated", { username: req.session.username }); 
      } else {
        res.render("signinUI");
      }
})

 

app.get('/college/:collegename', async (req, res) => {
    try {
        const collegename  = req.params.collegename;     
        const students = await SignupStudentCollection.find({ collegename });

        if (students.length === 0) {
            return res.status(404).json({
                message: 'No students found for this college',
                isError: true
            });
        }

        return res.status(200).json({
            message: 'Students fetched successfully!',
            students,
            isError: false
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error fetching students: ' + err,
            isError: true
        });
    }
})



app.post("/register", upload.single("file"), async (req, res) => {
    try {
        const { firstname, lastname, username, email, password, collegename } = req.body;
        if (!username || !email || !password) {
          return res.status(400).render("signupUI", {
            Message: "Missing required fields!",
            isError: true,
          });
        } 
        const existingUser = await SignupStudentCollection.findOne({ username });
        if (existingUser) {
          return res.status(400).render("signupUI", {
            Message: "User details already exist!",
            isError: true,
          });
        }
        const newUser = new SignupStudentCollection({
            firstname,
            lastname,
            username,
            email,
            password,
            collegename,
            department: req.body.department,
            yearofstudy: req.body.yearofstudy,
            hallticket: req.body.hallticket,
            phone: req.body.phone,
            profilePic: req.file ? req.file.path : null,
          });
          await newUser.save();
          await SignupStudentCollection.create([newUser]);

    return res.status(201).render("signupUI", {
      Message: "User registered successfully!",
      isError: false,
    });
  } catch (err) {
    console.error(err); 
    return res.status(500).render("signupUI", {
      Message: "Something went wrong! " + err.message,
      isError: true,
    });
  }
}) 


app.post('/signinUII', async (req, res) => {

  try {
      const { username, password } = req.body;
      const check = await SignupStudentCollection.findOne({ username });
      const student = await SignupStudentCollection.findOne({ username }); 
      // const pubCount = await RecentProjectsCollection.countDocuments({ Username: username });
      const pubCount = await RecentProjectsCollection.countDocuments();
      const Uploadd = await RecentProjectsCollection.find(); 
  

      const checkemail = await SignupStudentCollection.findOne({ email: username });
      if (check && check.password === password) {
          req.session.username = username;
          return res.status(201).render("homepage",  {pubCount: pubCount, Uploadd,student});
        } else if (checkemail && checkemail.password === password) {
          // req.session.username = username;
          req.session.username = checkemail.username;
          const student= checkemail
          return res.status(201).render("homepage", {pubCount: pubCount, Uploadd,student});
      } else {
          return res.status(400).render('signinUI', {
              Message: 'Incorrect username or password!',
              isError: true,
          });
      }

      }  
      catch (e) {
      return res.status(400).render('signinUI', {
          Message: 'wrong inputs!'+ e,
          isError: true, 
      }); 
      }
})



app.post('/staffSigninAction', async (req, res) => {

  try {
      const { username, password } = req.body;
      // console.log("body uploaded:", req.body);
      const check = await StaffAccountProfileCollection.findOne({ username });
      const Staff = await StaffAccountProfileCollection.findOne({ username }); 
      const checkemail = await StaffAccountProfileCollection.findOne({ email: username });
      if (check && check.password === password) {
          req.session.username = username;
          // console.log(" username body uploaded:", req.body);
          const pubCount = await RecentProjectsCollection.countDocuments({ collegename: Staff.collegename,
            Dept: Staff.department });
          const Projects = await RecentProjectsCollection.find({ collegename: Staff.collegename,
            Dept: Staff.department });  
          return res.status(201).render("StaffHomepage",  {Staff, pubCount,Projects});
        } else if (checkemail && checkemail.password === password) {
          req.session.username = checkemail; 
          req.session.username = checkemail.username;
          const Staff = checkemail;
          
          const pubCount = await RecentProjectsCollection.countDocuments({ collegename: Staff.collegename,
            Dept: Staff.department });
          const Projects = await RecentProjectsCollection.find({ collegename: Staff.collegename,
            Dept: Staff.department }); 
          return res.status(201).render("StaffHomepage", {Staff, pubCount,Projects});
      } else {
          return res.status(400).render('Staffsignin', {
              Message: 'Incorrect username or password!',
              isError: true,
          });
      }

      }  
      catch (e) {
      return res.status(400).render('Staffsignin', {
          Message: 'wrong inputs!'+ e,
          isError: true, 
      }); 
      }
})


app.get("/SLogout", async (req, res) => {
  req.session.destroy();
  res.render('Staffsignin')
});


app.get("/Logout", async (req, res) => {
    req.session.destroy();
    res.render('signinUI')
});

app.post("/submitprofile", async (req, res) => {
  try {
    
    const username= req.session.username
    console.log("username",username);
    const {
      githubLink,
      linkedinLink,
      facebookLink,
      backgroundImage,
      profileImage,
      department,
      hallTicket,
      award,
      win,
      description,
    } = req.body;

    await StudentProfileCollection.deleteOne({ username });

    const profile = new StudentProfileCollection({
      username,
      githubLink,
      linkedinLink,
      facebookLink,
      backgroundImage,
      profileImage,
      department,
      hallTicket,
      awards: award || [],
      wins: win || [],
      description,
    });

    await profile.save();
    await StudentProfileCollection.create([profile]);
    const student = await SignupStudentCollection.findOne({ username }); 
    const pubCount = await UploadpublicationCollection.countDocuments({ Username: username });
    const Uploadd = await RecentProjectsCollection.find({Username: username }); 
    const UploaddProfile = await StudentProfileCollection.findOne({ username }); 
    return res.status(201).render("dashboard", { pubCount: pubCount,student,Uploadd,UploaddProfile });


  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving profile");
  }
});




app.use("/uploads", express.static("uploads"));
app.listen(port, () => {
    console.log('port connected');
}) 