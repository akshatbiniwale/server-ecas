const mongoose = require("mongoose")

const gradeSchema = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"Student ID required"],
        ref:"Student"
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"Course ID required"],
        ref:"Course"
    },
    saValue:{
        type:Number,
        required:[true,"SA value required"]
    },
    score:{
        type:Number,
        required:[true,"Score required"]
    },
    grade:{
        type:String,
        required:[true,"Grade required"]
    },
    status:{
        type:String,
        default:"Pass"
    },
    createdAt:{
        type:Date,
        default: new Date(Date.now())
    }
})

const Grade = mongoose.model("Grade", gradeSchema)

module.exports = Grade