const express=require('express')
const { route } = require('express/lib/application')
const mongoose=require("mongoose")
const handlebars = require('express-handlebars');
const routes=express.Router()

const {blogs} = require('../src/models/blog')
const {user_profiles} = require('../src/models/blog')
const {appointments} = require('../src/models/blog')
const {doctor_profiles} = require('../src/models/blog')
const {appRequests} = require('../src/models/blog')
const {upcoming_appointments} = require('../src/models/blog')
const {logincollections} = require('../src/models/blog')
var blog1=0
routes.use(express.urlencoded({extended:false}))
const fs = require('fs');

routes.get("/index/:uid", async (req,res) => {
    await console.log("trying to connect")
    await mongoose.connect('mongodb+srv://abc:abc@cluster0.gwdwnzm.mongodb.net/UHI');
    await console.log("db connected")
    user1 = await user_profiles.findOne({uid:req.params['uid']});
    // user1 = await user_profiles.findOne({firstname:'-098i7uy6t'});
    console.log(user1)
    blog1=await blogs.find();
//   console.log(blog1)
    res.render("index",{
         blog1:blog1,
         user1:user1
    })
})

// function hbsHelpers(hbs) {
//     return hbs.create({
//       helpers: { // This was missing
//         inc: function(text, options) {
//           console.log('reading it');
//           return new handlebars.SafeString("'blog/"+text+"'");

//         }
  
//         // More helpers...
//       }
  
//     });
//   }


routes.get('/blog/:title',async (req,res) => {
    await mongoose.connect('mongodb+srv://abc:abc@cluster0.gwdwnzm.mongodb.net/UHI');
    await console.log("db connected")
    console.log(req.params['title'])
    blog1=await mongoose.model('blogs').findOne({Title:req.params['title']});
   await console.log(blog1)
    res.render("blog",{
        blog1:blog1
    })        
})
routes.get('/appointments/:uid/:uid2',async (req,res) => {
    await mongoose.connect('mongodb+srv://abc:abc@cluster0.gwdwnzm.mongodb.net/UHI');
    await console.log("db connected")
    appointment_details = await appointments.find({doctorid:req.params['uid'],patientid :req.params['uid2']});
    console.log(req.params['uid'])
    doctor=await doctor_profiles.findOne({uid:req.params['uid']});
    user1=await user_profiles.findOne({uid:req.params['uid2']});
    await console.log(doctor)
    res.render("doctor-page",{
        appointment_details:appointment_details,
        doctor:doctor,
        user1:user1
    })        
})
routes.get('/accept/:uid/:uid2/:date',async (req,res) => {
    await mongoose.connect('mongodb+srv://abc:abc@cluster0.gwdwnzm.mongodb.net/UHI');
    await console.log("db connected")
    appointment_details = await appRequests.findOne({doctorid:req.params['uid2'],patientid :req.params['uid'],date:req.params['date']});
    await appRequests.findOneAndRemove({doctorid:req.params['uid2'],patientid :req.params['uid'],date:req.params['date']});
    upcoming_appointments.insertMany(appointment_details);

    await mongoose.connect('mongodb+srv://abc:abc@cluster0.gwdwnzm.mongodb.net/UHI');
    appointment_requests = await appRequests.find({doctorid :req.params['uid2']});
    doctor1 = await doctor_profiles.findOne({uid:req.params['uid2']});
    await console.log(appointment_requests)
    await res.render("appointment-requests",{
        appointment_requests:appointment_requests,
        doctor1:doctor1
        // doctor:doctor
    })       
})
routes.get('/reject/:uid/:uid2/:date',async (req,res) => {
    await mongoose.connect('mongodb+srv://abc:abc@cluster0.gwdwnzm.mongodb.net/UHI');
    await console.log("db connected")
    await appRequests.findOneAndRemove({doctorid:req.params['uid2'],patientid :req.params['uid'],date:req.params['date']});

    appointment_requests = await appRequests.find({doctorid :req.params['uid2']});
    doctor1 = await doctor_profiles.findOne({uid:req.params['uid2']});
    await console.log(appointment_requests)
    await res.render("appointment-requests",{
        appointment_requests:appointment_requests,
        doctor1:doctor1
        // doctor:doctor
    })       
})
routes.get('/patient/:uid',async (req,res) => {
    await mongoose.connect('mongodb+srv://abc:abc@cluster0.gwdwnzm.mongodb.net/UHI');
    await console.log("db connected")
    appointment_details = await appointments.find({patientid :req.params['uid']});
    console.log(req.params['uid'])
    user=await user_profiles.findOne({uid:req.params['uid']});
    await console.log(user)
    await console.log(appointment_details)
    res.render("patient-page",{
        appointment_details:appointment_details,
        user:user
    })        
})
routes.get('/appointments-history/:uid',async (req,res) => {
    try{
    await mongoose.connect('mongodb+srv://abc:abc@cluster0.gwdwnzm.mongodb.net/UHI');
    appointment = await appointments.find({patientid :req.params['uid']}).distinct("doctorid");
    appointment_details = await appointments.find({patientid :req.params['uid']});
    user1 = await user_profiles.findOne({uid:req.params['uid']});
    await console.log(user1)
    // Doctor_profiles.create({uid:"demo", firstname:"demo", lastname:"lastname",image:"demo"})
    doctor = await doctor_profiles.find({uid :appointment});
    await console.log(doctor)
    await res.render("appointments-history",{
        user1:user1,
        appointment_details:appointment_details,
        doctor:doctor
    })  }
    catch(err){
        console.log(err.message);
    }   
})
routes.get('/find-a-doctor/:uid',async (req,res) => {
    try{
    await mongoose.connect('mongodb+srv://abc:abc@cluster0.gwdwnzm.mongodb.net/UHI');
    user1 = await user_profiles.findOne({uid:req.params['uid']});
    await console.log(user1)
    // Doctor_profiles.create({uid:"demo", firstname:"demo", lastname:"lastname",image:"demo"})
    doctor = await doctor_profiles.find();
    // await console.log(doctor)
    await res.render("find-a-doctor",{
        user1:user1,
        doctor:doctor
    })  }
    catch(err){
        console.log(err.message);
    }   
})
routes.get('/appointment-requests/:uid',async (req,res) => {
    try{
    await mongoose.connect('mongodb+srv://abc:abc@cluster0.gwdwnzm.mongodb.net/UHI');
    appointment_requests = await appRequests.find({doctorid :req.params['uid']});
    doctor1 = await doctor_profiles.findOne({uid:req.params['uid']});
    await console.log(appointment_requests)
    await res.render("appointment-requests",{
        appointment_requests:appointment_requests,
        doctor1:doctor1
        // doctor:doctor
    })  }
    catch(err){
        console.log(err.message);
    }   
})
routes.get('/upcoming-appointments/:uid',async (req,res) => {
    try{
    await mongoose.connect('mongodb+srv://abc:abc@cluster0.gwdwnzm.mongodb.net/UHI');
    appointment_details = await upcoming_appointments.find({doctorid :req.params['uid']});
    doctor1 = await doctor_profiles.findOne({uid:req.params['uid']});
    await console.log(appointment_details)
    await res.render("upcoming-appointments",{
        appointment_details:appointment_details,
        doctor1:doctor1
    })  }
    catch(err){
        console.log(err.message);
    }   
})
routes.get('/find-a-doctor',async (req,res) => {

    try {
      await mongoose.connect('mongodb+srv://abc:abc@cluster0.gwdwnzm.mongodb.net/UHI');
    
      var search='';
      var gender = '';
      var searchid=req.body;
      if(req.query.search){
        searchid=req.query.search;
      }
  
      console.log(1)
      console.log(searchid)
      
      // if (req.query.gender) {
      //   gender = req.query.gender;
      // }
      gender = req.body;
      console.log(gender)
      
      // if (req.query.consultationFee) {
      //   filters.consultationFee = parseInt(req.query.consultationFee);
      // }
      // var search='Dr. John Doe';
      const doctorProfiles = await doctor_profiles.find({
        $and: [
          {
            $or: [
              { name: { $regex: '.*' + searchid + '.*', $options: 'i' } },
              { city: { $regex: '.*' + searchid + '.*', $options: 'i' } },
              { specialization: { $regex: '.*' + searchid + '.*', $options: 'i' } }
            ]
          },
          
        ]
      })
  
      // console.log(doctorProfiles)
    
      res.render("find-a-doctor",{doctorProfiles:doctorProfiles})
    } catch (error) {
      console.log(err.message)
    }
  
  });

  routes.post('/login', async (req, res) => {
    try {
      await mongoose.connect('mongodb+srv://abc:abc@cluster0.gwdwnzm.mongodb.net/UHI');
      const { name, password} = req.body;
      const user = await logincollections.findOne({ uid: name });
      if (user) {
        if (user.password === password) {
          if(user.type==="user"){
            user1 = await user_profiles.findOne({uid:name});
            blog1=await blogs.find();
            await res.render("index",{
                 blog1:blog1,
                 user1:user1
            })
          }
          else{
            doctor1 = await doctor_profiles.findOne({uid:name});
            appointment_requests = await appRequests.find({doctorid :name});
            await res.render("appointment-requests",{
                appointment_requests:appointment_requests,
                doctor1:doctor1
            })  
          }
        } else {
          res.send("Incorrect password");
        }
    } else {
        res.send("User not found");
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send("An error occurred during login");
    }
  });
routes.get('/past-appointments/:uid',async (req,res) => {
    try{
    await mongoose.connect('mongodb+srv://abc:abc@cluster0.gwdwnzm.mongodb.net/UHI');
    appointment = await appointments.find({doctorid :req.params['uid']}).distinct("patientid");
    doctor1 = await doctor_profiles.findOne({uid:req.params['uid']});
    appointment_details = await appointments.find({doctorid :req.params['uid']});
    // Doctor_profiles.create({uid:"demo", firstname:"demo", lastname:"lastname",image:"demo"})
    user = await user_profiles.find({uid :appointment});
    await console.log(user)
    await res.render("past-appointments",{
        appointment_details:appointment_details,
        doctor1:doctor1,
        user:user
    })  }
    catch(err){
        console.log(err.message);
    }   
})
routes.get('/landingpage',async (req,res) => {
    try{
    await res.render("landingpage")  }
    catch(err){
        console.log(err.message);
    }   
})
routes.get('/login',async (req,res) => {
    try{
    await res.render("login")  }
    catch(err){
        console.log(err.message);
    }   
})
routes.get('/signup',async (req,res) => {
    try{
    await res.render("signup")  }
    catch(err){
        console.log(err.message);
    }   
})
module.exports=routes