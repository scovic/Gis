import { ErrorCodes } from "./ErrorCodes";
import { BadRequestError, NotFoundError } from "./Errors";

export type ErrorResponseData = {
    message: string;
    errorCode: string;
    status: number
}

export default class ErrorProcessor {
    constructor (
        private _defaultError: ErrorResponseData
    ) {}

    public process (error: Error): ErrorResponseData {
        switch (error.name) {
        case "NotFoundError": 
            return {
                message:  error.message,
                status: 404,
                errorCode: ErrorCodes.NOT_FOUND
            };
                
        case "BadRequestError": 
            return {
                message: error.message,
                status: 400,
                errorCode: ErrorCodes.BAD_REQUEST
            };
        default:
            return this._defaultError;
        }
    }
}
