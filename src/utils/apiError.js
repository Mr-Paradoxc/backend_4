class ApiError extends Error{
    constructor(statusCode, message = 'Internal Server Error',error=[],statck=''){
        super(message);
        this.statusCode = statusCode;
        this.data =null ; 
        this.message = message;
        this.success = false
        this.errors = errors
    }

}
export default ApiError;