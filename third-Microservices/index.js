const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
require("dotenv").config();
const { default: axios } = require("axios");
const { DataModel } = require("./model/Data.Model");


const json2csv = require('json2csv').Parser;
const fs = require('fs')

let app = express();
app.use(express.json());
app.use(cors());













//welcome

app.get("/", (req, res) => {
  res.send("Welcome to third Microservices.");

});

// get



app.get("/dataFile", async (req, res) => {

  try {
    let users = [];
    const data = await DataModel.find({});

    data.forEach((e) => {

      const {id,name,email,gender,status} = e;

      users.push({id,name,email,gender,status})

    });

    const csvdata = ["Id","Name","Email","Gender","Status"];
    const Json2csv = new json2csv({csvdata})
    const finalcsv = Json2csv.parse(users)
  
    res.header('Content-Type','text/csv')
    res.header('Content-Disposition','attatchment: filename=DataFile.csv')

    res.status(200).end(finalcsv)



    // fs.writeFileSync('./data.csv',csvFile)
  } catch (error) {
    console.log(error)
  }

});

// //getting data from API and store in Database


// app.get("/fetch",async (req, res) => {
//   try {
//     const response = await axios.get(`https://gorest.co.in/public/v2/users?page=1&per_page=100`);
 
//     const result = await DataModel.insertMany(response.data);
//     res.status(200).json(result)

//   } catch (error) {
//     console.log(error);
//   }
// })





app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the db");
  } catch (error) {
    console.log(error);
  }
  console.log(`server running on ${process.env.port} `);
});
