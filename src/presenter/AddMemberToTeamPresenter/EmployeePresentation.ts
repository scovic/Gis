import Employee from "../../domain/entity/Employee";

export type EmployeePresentationData = {
    id: string,
    firstName: string,
    lastName: string
}

export default class EmployeePresentation {
    public static present (employee: Employee): EmployeePresentationData {
        const { id, firstName, lastName } = employee;
        return {
            id: id.getId(),
            firstName: firstName.getValue(),
            lastName: lastName.getValue()
        };
    }
}
