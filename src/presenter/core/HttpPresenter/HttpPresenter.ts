import { ErrorCodes } from "../error/ErrorCodes";
import ErrorProcessor from "../error/ErrorProcessor";
import { IHttpEmitter, RespondData } from "../HttpEmitter/HttpEmiter";
import { IHttpPresenter } from "./IHttpPresenter";

export default class HttpPresenter implements IHttpPresenter {
    private httpEmitter: IHttpEmitter
    private errorProcessor: ErrorProcessor

    constructor (httpEmitter: IHttpEmitter, errorProcessor?: ErrorProcessor) {
        this.httpEmitter = httpEmitter;
        if (errorProcessor) {
            this.errorProcessor = errorProcessor;
        } else {
            this.errorProcessor = this.defaultErrorProcessor();
        }
        
    }

    respond (data: RespondData): void {
        this.httpEmitter.emit(data);
    }

    protected log (message: Error | string): void {
        console.log(message);
    }
    
    public displayError (error: Error): void {
        this.log(error);
        const { errorCode, status, message } = this.errorProcessor.process(error);
        this.respond({
            json: { errorCode, message },
            status: status
        });
        
    }

    private defaultErrorProcessor (): ErrorProcessor {
        return new ErrorProcessor({
            message: "Internal server error",
            status: 500,
            errorCode: ErrorCodes.SERVER_ERROR
        });
    }

}
