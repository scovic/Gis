"use strict";

module.exports = {
    async up (queryInterface, Sequelize) {
        const patrolPatrolStopMap = [{
            patrol_id: "a98c2bbf-5a64-46ce-9098-2cafeb92546c",
            patrol_stop_id: "0ad4df13-243a-4747-84f2-417e1da9947c"
        },
        {
            patrol_id: "a98c2bbf-5a64-46ce-9098-2cafeb92546c",
            patrol_stop_id: "f806ab7a-4f0d-4472-87e9-1e0842e0fa12"
        },
        {
            patrol_id: "a98c2bbf-5a64-46ce-9098-2cafeb92546c",
            patrol_stop_id: "d8c53f2b-1944-4c9c-b4bf-807bf7b858ff"
        },
        {
            patrol_id: "a98c2bbf-5a64-46ce-9098-2cafeb92546c",
            patrol_stop_id: "7bf5dedf-ea72-44a1-a104-0eef2951dcef"
        }];

        return queryInterface.bulkInsert("patrol_patrol_stop_map", patrolPatrolStopMap);
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete("patrol_patrol_stop_map", null, {});
    }
};
