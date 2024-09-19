class ErrorHandler extends Error{
    constructor(code=null,message=null){
        super(message)
        this.message = message
        this.code = code
    }

    printStack(){
        console.log(this.stack)
    }

}

module.exports = ErrorHandler