import TeamList from "../../valueObject/TeamList";

export interface IListItemsGateway {
    getTeams(): Promise<TeamList>
}
