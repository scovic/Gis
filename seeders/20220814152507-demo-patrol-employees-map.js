"use strict";

module.exports = {
    async up (queryInterface, Sequelize) {
        const patrolEmployeeMap = [{
            patrol_id: "a98c2bbf-5a64-46ce-9098-2cafeb92546c",
            employee_id: "d0b6d0a0-e3e7-4cfc-a769-8f6cbcefb8e5"
        },
        {
            patrol_id: "a98c2bbf-5a64-46ce-9098-2cafeb92546c",
            employee_id: "9b521039-39f0-4919-86c6-30334b6fcda9"
        },
        {
            patrol_id: "71ecde51-222c-4f4c-aa37-8db2bb085a77",
            employee_id: "be894246-a355-425e-b53e-3e4c1aee7bc8"
        },
        {
            patrol_id: "71ecde51-222c-4f4c-aa37-8db2bb085a77",
            employee_id: "602505aa-4dba-4f6a-bac4-2e9348777d3c"
        },
        {
            patrol_id: "71ecde51-222c-4f4c-aa37-8db2bb085a77",
            employee_id: "158ad352-c89e-4ca9-ac05-cf0687c3039f"
        }];

        return queryInterface.bulkInsert("patrol_employee_map", patrolEmployeeMap);
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete("patrol_employee_map", null, {});
    }
};
