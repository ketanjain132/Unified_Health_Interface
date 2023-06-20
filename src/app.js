const { response } = require("express");

const express=require("express");
const { default: mongoose } = require("mongoose");
const hbs=require("hbs")

var router = express.Router();
const app=express();

const routes=require('../views/main')
const blog=require("./models/blog") 
app.use('',routes)


module.exports = router;

app.use('/static',express.static("public"))
app.use('',routes)
app.set('view engine','hbs')
app.set("views","views")

hbs.registerPartials("views/partials")

// mongoose.connect("mongodb+srv://abc:abc@cluster0.gwdwnzm.mongodb.net/UHI",()=>{
//     console.log("db connected2")
//     blog.create({
//         Blog: "String",
//     Title: "String",
//     Image: "String"
//     })
// })

app.listen(process.env.PORT | 5556, () => {
    console.log("server started");
});



