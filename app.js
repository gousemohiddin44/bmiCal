const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://gousebmi:bmigouse@bmi.iuv0h.mongodb.net/Bmi?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});


const app = express();

app.use(express.urlencoded({extended:true}));

const userSchema = new mongoose.Schema({
    weight:{
        type:Number,
        required:true
    },
    height:{
        type:Number,
        required:true
    }
});

const user = mongoose.model("user",userSchema);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post("/", (req,res)=>{
    const weight = req.body.weight;
    const height = req.body.height;

    const newUser = new user({
        weight : weight,
        height : height
    });

    newUser.save();
    
    const bmi = (weight/(height*height)); 
    const Bmi = bmi.toFixed(2);
    res.send(`<h1 style="margin:5% 7%">Your BMI is ${Bmi}</h1>`);
});



app.listen(process.env.PORT || 3000,()=>{
    console.log("Server runnning on port 3000...");
});