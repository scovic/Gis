import { ITeamDataSource } from "../../datasource/team/ITeamDataSource";
import Team from "../../domain/entity/Team";
import { IListTeamsGateway } from "../../domain/gateway/team/IListTeamsGateway";
import EntityList from "../../domain/valueObject/EntityList";

export default class ListTeamsRepository implements IListTeamsGateway {
    constructor (private teamDataSource: ITeamDataSource) {}
    
    getTeams (): Promise<EntityList<Team>> {
        throw new Error("Method not implemented.");
    }
    
}
