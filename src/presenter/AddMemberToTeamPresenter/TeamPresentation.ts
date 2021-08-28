import Team from "../../domain/entity/Team";
import EmployeePresentation, { EmployeePresentationData } from "./EmployeePresentation";

export type TeamPresentationData = {
    id: string,
    members: EmployeePresentationData[]
}

export default class TeamPresentation {
    public static present (team: Team): TeamPresentationData {
        const { id, members } = team;
        return {
            id: id.getId(),
            members: members.getValue().map(member => (
                EmployeePresentation.present(member)
            ))
        };
    }
}
