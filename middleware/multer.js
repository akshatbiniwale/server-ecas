const multer = require("multer")
const path = require("node:path")

const storageConfig = multer.diskStorage({
    destination: path.join(__dirname, "..", "uploads"),
    filename: (req, file, res)=>{
        // file name is prepended with current time
        // in milliseconds to handle duplicate file names
        res(null, Date.now() + "-" + file.originalname)
    }
})

// creating multer object for storing
// with configuration
const upload = multer({
    // applying storage and file filter
    storage: storageConfig,
    limits: {
        // limits file size to 5 MB
        fileSize: 1024 * 1024 * 5
    }
});

module.exports = upload;