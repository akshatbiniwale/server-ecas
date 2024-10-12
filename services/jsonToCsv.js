const {json2csv} = require("json-2-csv")
const fs = require("fs/promises")
const path = require("path")

const jsonToCsv = async(filePath,data)=>{
    try{
        const csvData = await json2csv(data,{emptyFieldValue:false})
        await fs.writeFile(filePath,csvData)
    }catch(err){
        throw err
    }
    
}

module.exports = jsonToCsv