import { Response } from "express";

export type RespondData = {
    set?: any
    status: number
    json?: any
    data?: any
}

export interface IHttpEmitter {
    emit (data: RespondData): void
}

export default class HttpEmitter implements IHttpEmitter {
    constructor (private res: Response) {}
    
    emit (data: RespondData): void {
        if (data.set) {
            this.res.set(data.set);
        }
        if (data.status) {
            this.res.status(data.status);
        }
        if (data.data) {
            this.res.send(data.data);
        } else {
            this.res.json(data.json);
        }
    } 
}
