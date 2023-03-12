export default class ForbiddenError extends Error {
    constructor(msg: string) {
        super(msg)
        Object.setPrototypeOf(this, ForbiddenError.prototype)
    }
}