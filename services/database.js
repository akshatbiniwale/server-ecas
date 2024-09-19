const mongoose = require("mongoose")

const connectDB = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("Connected to DB")
    })
    .catch((error)=>{
        console.log(error)
        console.log("Error while connecting to DB")
    })
}

module.exports = connectDB