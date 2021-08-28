import Team from "../../entity/Team";

export interface IDeleteTeamGateway {
    getTeam(teamId: string): Promise<Team>
    deleteTeam(teamId: string): Promise<void>    
}
