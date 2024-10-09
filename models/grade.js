const mongoose = require("mongoose")

const gradeSchema = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"Student ID required"]
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"Course ID required"]
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
        type:Number,
        required:[true,"Grade required"]
    },
    status:{
        type:String,
    },
    createdAt:{
        type:Date,
        default: new Date(Date.now())
    }
})

const Grade = mongoose.model("Grade", gradeSchema)

module.exports = Grade