import { ITeamDataSource } from "../../datasource/team/ITeamDataSource";
import Team from "../../domain/entity/Team";
import { IDeleteTeamGateway } from "../../domain/gateway/team/IDeleteTeamGateway";

export default class DeleteTeamRepository implements IDeleteTeamGateway {
    constructor (private teamDataSource: ITeamDataSource) {}

    getTeam (teamId: string): Promise<Team> {
        throw new Error("Method not implemented.");
    }

    deleteTeam (teamId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
