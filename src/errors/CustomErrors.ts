export default class AuthError extends Error {

    public statusCode: number

    constructor(status: number, message: string) {
        super(message)
        this.statusCode = status || 200
    }
}