type ErrorType = 'Not-Authenticate' | 'Invalid Resource'

class CustomError extends Error {
    public status: number
    public type : ErrorType

    constructor(
        type: ErrorType, 
        message: string,
        status: number,
    ) {
        super(message)
        this.type = type
        this.status = status
    }
}

export class AuthError extends CustomError {
    constructor(
        status: number, 
        message: string,
    ) {
        super('Not-Authenticate',  message, status)
    }
}

export class ResourceError extends CustomError {
    constructor(
        status: number,
        message: string,        
    ) {
        super('Invalid Resource', message, status)   
    }
}