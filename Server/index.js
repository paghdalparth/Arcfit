const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});


// connecting database
mongoose
  .connect(
    "mongodb+srv://gym:gym@cluster0.703ef8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch(() => {
    console.log("Error in Database Connectivity");
  });

var user = require("./Schema.js");

app.get("/", async (req, res, next) => {
  res.json(
    "Hey There. You are on a server of the my portfolio website."
  );
});

app.post("/", async (req, res, next) => {
  const data = new user({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });

  try {
    const result = await data.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "rajadipatidar227@gmail.com",
        pass: "vnpn jgjl ynpe qyaa",
      },
    });

    const mailOptions = {
      from: "rajadipatidar227@gmail.com",
      to: "vasubhut157@gmail.com",
      subject: "Portfolio",
      text: `Email From {"${req.body.email}"}. Name is {"${req.body.name}"}. Message for query {"${req.body.reason}"}}`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent");
      }
    });

    res.send({ user: true, data: result });
  } catch (e) {
    console.log(e);
    res.send({ user: false });
  }
});

app.listen(5075, () => {
  console.log(`Server is running on 5075`);
});