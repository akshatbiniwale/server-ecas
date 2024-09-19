const fs = require("fs")
const parser = require("csv-parser")
const ErrorHandler = require("./ErrorHandler")

const readCSV = (FILEPATH = null) => {
    return new Promise((resolve, reject) => {
        const data = []
        fs.createReadStream(FILEPATH)
            .pipe(parser())
            .on("data", (row)=>data.push(row))
            .on("end", () => resolve(data))
            .on("error", (err) => reject(err))
    })
    //add functionality to delete uploaded file
}


module.exports = readCSV