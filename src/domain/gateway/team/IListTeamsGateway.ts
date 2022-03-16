import Team from "../../entity/Team";
import EntityList from "../../valueObject/EntityList";

export interface IListTeamsGateway {
    getTeams(): Promise<EntityList<Team>>   
}
