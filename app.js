//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const array = [];
const nodemailer = require("nodemailer");
const { castArray } = require("lodash");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
var publicDir = require("path").join(__dirname, "/public");
app.use(express.static(publicDir));

mongoose.connect("mongodb+srv://Mohit:o1AKomYNHa42WIUW@cluster0.tdhnstc.mongodb.net/hackDB", { useNewUrlParser: true });

const userSchema = {
  name: String,
  email: String,
  instituteName: String,
  qualification: String,
  linkedin: String,
  howYouKnow: String,
  additionalFile: String,
  flexRadioDefault: String,
  webDevelopment: String,
  dataScience: String,
  computerVision: String,
  campusAmbassador: String,
  blockchain: String,
  productManagement: String,
  appDevelopment: String,
};

const User = mongoose.model("User", userSchema);

app.get("/", function (req, res) {
  res.render("home");
});

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mailernode12@gmail.com",
    pass: "bqjujntafadwsyka",
  },
});

var selectedField = [];

app.post("/", function (req, res) {
  var user = new User({
    name: req.body.username,
    email: req.body.email,
    instituteName: req.body.institute,
    qualification: req.body.qualification,
    linkedin: req.body.linkedin,
    howYouKnow: req.body.howYouKnow,
    additionalFile: req.body.file,

    webDevelopment: req.body.webDevelopment,
    dataScience: req.body.dataScience,
    computerVision: req.body.computerVision,
    campusAmbassador: req.body.campusAmbassador,
    blockchain: req.body.blockchain,
    productManagement: req.body.productManagement,
    appDevelopment: req.body.appDevelopment,
  });
  if (req.body.webDevelopment === "on") {
    selectedField.push("Web Development");
  } else if (req.body.dataScience === "on") {
    selectedField.push("Data Science");
  } else if (req.body.computerVision === "on") {
    selectedField.push("Computer Vision");
  } else if (req.body.campusAmbassador === "on") {
    selectedField.push("Campus Ambassador");
  } else if (req.body.blockchain === "on") {
    selectedField.push("Blockchain");
  } else if (req.body.productManagement === "on") {
    selectedField.push("Product Management / Entrepreuner In Residence");
  } else if (req.body.appDevelopment === "on") {
    selectedField.push("App Development");
  }

  array.push(user);
  const mailDetails = {
    from: "mailernode12@gmail.com",
    to: JSON.stringify(req.body.email),
    subject: "Thanks for filling your form!!",
    text:
      "Name :" +
      JSON.stringify(req.body.username) +
      "\n" +
      "Email :" +
      JSON.stringify(req.body.email) +
      "\n" +
      "instituteName :" +
      JSON.stringify(req.body.institute) +
      "\n" +
      "qualification :" +
      JSON.stringify(req.body.qualification) +
      "\n" +
      "linkedin :" +
      JSON.stringify(req.body.linkedin) +
      "\n" +
      "howYouKnow :" +
      JSON.stringify(req.body.howYouKnow) +
      "\n" +
      "additionalFile :" +
      JSON.stringify(req.body.file) +
      "\n" +
      "selectedField :" +
      JSON.stringify(selectedField[0]),
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent successfully");
    }
  });
  selectedField.splice(0, selectedField.length);
  user.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("new user data stored ");
    }
    res.redirect("/");
  });
});



 
app.listen(process.env.PORT || 3000, function() {
  console.log("Server started succesfully");
});     
