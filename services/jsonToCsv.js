const {json2csv} = require("json-2-csv")
const fs = require("fs/promises")
const path = require("path")

const jsonToCsv = async(filePath,fileName,data)=>{
    try{
        const csvData = await json2csv(data,{emptyFieldValue:false})
        const _path = path.join(filePath,fileName)
        await fs.writeFile(_path,csvData)
    }catch(err){
        throw err
    }
    
}

module.exports = jsonToCsv