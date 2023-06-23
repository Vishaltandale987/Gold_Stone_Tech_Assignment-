const express = require("express");

const cors = require("cors");
const { connection } = require("./config/db");

require("dotenv").config();


const { DataModel } = require("./model/Data.Model");

let app = express();
app.use(express.json());
app.use(cors());



//welcome

app.get("/", (req, res) => {
  res.send("Welcome to second Microservices.");
});

// get


app.get("/all", async (req, res) => {
  try {
    const notes = await DataModel.find();
    res.send(notes.reverse());
  } catch (error) {
    console.log(error)
  }

});


// Delete

app.delete("/delete/:id", async (req, res) => {


  const documentId = req.params.id 
  try {
    DataModel.findByIdAndDelete(documentId, (err, deletedDocument) => {
      if (err) {
        res.send(err);
    
      } else if (!deletedDocument) {
  
        res.send('Document not found.');
      } else {
      
        res.send('User has been deleted')
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




// Edit 
app.put("/update/:id", async (req, res) => {
  let post_id = req.params.id
  let obj = req.body

  console.log(post_id, obj)
    try {
      const user = await DataModel.findByIdAndUpdate(post_id, {
        $set: obj,
      });
      res.status(200).json("User has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
});


// Add
app.post("/register", async (req, res) => {
  const newPost = new DataModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json("User has been Successfully register.")
  } catch (err) {
    res.status(500).json(err);
  }
});



app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the db");
  } catch (error) {
    console.log(error);
  }
  console.log(`server running on ${process.env.port} `);
});
