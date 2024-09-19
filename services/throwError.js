const throwError = (error,req,res,next)=>{
    const message = error.message || "Internal server error"
    const code = error.code || 500
    res.status(code).json({
        success:false,
        message
    })
}

module.exports = throwError