import { ErrorCodes } from "./ErrorCodes";

export type ErrorResponseData = {
    message: string;
    errorCode: string;
    status: number
}

export default class ErrorProcessor {
    constructor (
        private _defaultError: ErrorResponseData
    ) {}

    public process (error?: Error): ErrorResponseData {
        let errorObject = this._defaultError;
    
        if (error && error.message.toLowerCase().includes("not found")) {
            errorObject = {
                message: "Not found",
                status: 404,
                errorCode: ErrorCodes.NOT_FOUND
            };
        } else if (error && error.message.toLowerCase().includes("bad parameter")) {
            errorObject = {
                message: `Bad Request - ${error.message}`,
                status: 400,
                errorCode: ErrorCodes.BAD_PARAMETERS
            };
        }

        return errorObject;
    }
}
