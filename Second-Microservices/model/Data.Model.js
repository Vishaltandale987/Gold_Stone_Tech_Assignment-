const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
        id: {
            type: Number,

        },
        name: {
            type: String,
          
        },
        email: {
            type: String,
   
        },
        gender: {
            type: String,
      
        },
        status: {
            type: String,
   
        },
    },
    { timestamps: false }
);



const DataModel = mongoose.model("datas", DataSchema)
module.exports = {
    DataModel
}


