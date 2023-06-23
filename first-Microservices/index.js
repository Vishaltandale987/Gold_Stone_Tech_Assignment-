const express = require("express");

const cors = require("cors");
const { connection } = require("./config/db");

require("dotenv").config();

const { default: axios } = require("axios");
const { DataModel } = require("./model/Data.Model");

let app = express();
app.use(express.json());
app.use(cors());













//welcome

app.get("/", (req, res) => {
  res.send("Welcome to frist Microservices.");

});

// get


app.get("/all", async (req, res) => {
  try {
    const notes = await DataModel.find();
    res.send(notes);
  } catch (error) {
    console.log(error)
  }

});

//getting data from API and store in Database


app.get("/fetch",async (req, res) => {
  try {
    const response = await axios.get(`https://gorest.co.in/public/v2/users?page=1&per_page=100`);
 
    const result = await DataModel.insertMany(response.data);
    res.status(200).json(result)

  } catch (error) {
    console.log(error);
  }
})





app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the db");
  } catch (error) {
    console.log(error);
  }
  console.log(`server running on ${process.env.port} `);
});
