
export class NotFoundError extends Error {
    constructor (message?: string) {
        super(`Not Found ${message ? `- ${message}` : ""}`);
        this.name = "NotFoundError";
    }
}

export class BadRequestError extends Error {
    constructor (message?: string) {
        super(`Bad Request ${message ? `- ${message}` : ""}`);
        this.name = "BadRequestError";
    }
}
