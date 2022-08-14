"use strict";

module.exports = {
    async up (queryInterface, Sequelize) {
        const patrolPatrolStopMap = [{
            patrol_id: "71ecde51-222c-4f4c-aa37-8db2bb085a77",
            patrol_area_id: "698ea1af-4ba5-4029-ba41-bb39d09c2c73"
        }];

        return queryInterface.bulkInsert("patrol_patrol_area_map", patrolPatrolStopMap);
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete("patrol_patrol_area_map", null, {});
    }
};
