type ErrorType = 'Not-Authenticate' | 'Invalid Resource'

// Clase para manejar errores con propiedades especiales. 
class CustomError extends Error {
    public status: number // statusCode de la response.
    public type : ErrorType // Tipo de error lanzado.

    constructor( type: ErrorType, message: string, status: number ) {
        super(message)
        this.type = type
        this.status = status
    }
}

// Clase para manejar errores provenientes de la autentificación. 
export class AuthError extends CustomError {
    constructor( status: number, message: string ) {
        super('Not-Authenticate',  message, status)
    }
}

// Clase para manejar errores provenientes de la indexación y manejo de recursos. 
export class ResourceError extends CustomError {
    constructor( status: number, message: string ) {
        super('Invalid Resource', message, status)   
    }
}