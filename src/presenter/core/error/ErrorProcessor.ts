export type ErrorResponseData = {
    message: string;
    errorCode: string;
    status: number
}

export default class ErrorProcessor {
    constructor (
        private _defaultError: ErrorResponseData
    ) {}

    process (error?: Error): ErrorResponseData {
        return this._defaultError;
    }
}
