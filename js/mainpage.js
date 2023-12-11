const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDatababase = require("./app");

connectToDatababase();
const server = express();
server.use(cors());
server.use(bodyParser.json());

const LoginSchema = new mongoose.Schema({
  username: String,
  contact: String,
  location: String,
});
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  feedback: String,
});

// Use mongoose.model to create a model based on the schema
const Login = mongoose.model("Login", LoginSchema);
const Feedback = mongoose.model("Feedback", feedbackSchema);


server.post("/login", async (req, res) => {
  try {
    const login = new Login({
      username: req.body.username,
      contact: req.body.contact,
      location: req.body.location,
    });

    await login.save();
    res.status(201).json({ message: "Login Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating login" });
  }
});


server.post('/feedback', async (req, res) => {
  try {
    const { name, email, feedback } = req.body;
    const newFeedback = new Feedback({
      name,
      email,
      feedback,
    });

    // Save the feedback to MongoDB
    await newFeedback.save();

    console.log('Data saved to MongoDB:', newFeedback);
    res.status(201).json({ message: 'Feedback received successfully!' });
  } catch (error) {
    console.error('Error saving data to MongoDB:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

server.listen(8080, () => {
  console.log("Server Started");
});
