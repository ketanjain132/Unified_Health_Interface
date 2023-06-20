const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    
patientid:String,
doctorid:String,
patientname:String,
doctorname:String,
date:String,
note:String,
report:String
});
  
const appReqSchema=new mongoose.Schema({
  patientid: { type: String },
  patientname: { type: String },
  doctorid: { type: String },
  name: { type: String },
  note: { type: String },
  date: { type: String },
  time: { type: String},
})
const upcoming_appointments=new mongoose.Schema({
  patientid: { type: String },
  patientname: { type: String },
  doctorid: { type: String },
  date: { type: String }
})


const blogSchema = mongoose.Schema({
    Blog: String,
    Title: String,
    Image: String
});
const logincollections = mongoose.Schema({
    uid: String,
    password: String,
    type: String
});

const userSchema = mongoose.Schema({  
  contactno:Number,
  firstname:String,
  lastname:String,
  uid:String,
  city:String,
  state:String,
  image:String,
  address:String,
  gender:String,
  email:String
});
const drSchema = new mongoose.Schema({
  username:{type: String},
  password:{type: String},
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  image: {
    data: Buffer,
    contentType: String
  },
  uid:{type: String},
  location: { type: String, required: true },
  clinicName: { type: String, required: true },
  consultationFee: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female'] },
  contact:{type: String, required: true}

});

module.exports = {
  blogs: mongoose.model("blogs", blogSchema),
  user_profiles: mongoose.model("user_profiles", userSchema),
  doctor_profiles: mongoose.model("doctor_profiles", drSchema),
  appRequests: mongoose.model("appointment_requests", appReqSchema),
  logincollections: mongoose.model("logincollections", logincollections),
  upcoming_appointments: mongoose.model("upcoming_appointments", upcoming_appointments),
  appointments: mongoose.model("appointments", appointmentSchema)
}

// module.exports = mongoose.model("appointments", appointmentSchema);
