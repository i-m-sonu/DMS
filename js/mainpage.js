const express = require("express");
const mongodb = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDatababase = require("./app");
const { default: mongoose } = require("mongoose");

connectToDatababase();
const server = express();
server.use(cors());
server.use(bodyParser.json());

const LoginSchema = new mongoose.Schema({
    username : String,
    contact: String,
    location : String,
});
const Feedback = new mongoose.Schema({
    name:String,
    email:String,
    feedback:String,
})

server.post("/login", async (req, res) => {
    try{
        const login = new Login({
            username : req.body.username,
            contact : req.body.contact,
            location: req.body.location,
        });
        await login.save();
        res.status(201).json({message:"Login Created Success"});
    }
    catch(error){
        res.status(500).json({message:"error creating login"});
    }
});
server.listen(8080,()=>{
    console.log("Server Started");
})