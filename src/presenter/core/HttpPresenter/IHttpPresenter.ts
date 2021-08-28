import { RespondData } from "../HttpEmitter/HttpEmiter";

export interface IHttpPresenter {
    respond (data: RespondData): void;
}
