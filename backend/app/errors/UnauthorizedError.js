function UnauthorizedError(error) {
    Error.call(this, error.message);
    Error.captureStackTrace(this, this.constructor);
    this.name = 'UnauthorizedError';
    this.message = error.message;
    this.status = 401;
    this.inner = error;
}

UnauthorizedError.prototype = Object.create(Error.prototype);
UnauthorizedError.prototype.constructor = UnauthorizedError;

module.exports = UnauthorizedError;
