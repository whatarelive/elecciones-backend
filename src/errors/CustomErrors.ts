type ErrorType = 'Not-Authenticate' | 'Invalid Resource'

class CustomError extends Error {
    public status: number
    public type : ErrorType

    constructor(
        type: ErrorType, 
        message: string,
        status: number | undefined = 400,
    ) {
        super(message)
        this.status = status
        this.type = type
    }
}

export class AuthError extends CustomError {
    constructor(
        message: string,
        status?: number, 
    ) {
        super('Not-Authenticate',  message, status)
    }
}

export class ResourceError extends CustomError {
    constructor(
        message: string,        
        status?: number,
    ) {
        super('Invalid Resource', message, status)   
    }
}