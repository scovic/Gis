"use strict";

module.exports = {
    async up (queryInterface, Sequelize) {
        const ONE_HOUR_MS = 3600000;
        const ONE_DAY_MS = ONE_HOUR_MS * 24;
        const todayDate = new Date();
        const patrols = [{
            id: "a98c2bbf-5a64-46ce-9098-2cafeb92546c",
            start: new Date(todayDate.getTime() + ONE_DAY_MS),
            end: new Date(todayDate.getTime() + ONE_DAY_MS + ONE_HOUR_MS)
        },
        {
            id: "71ecde51-222c-4f4c-aa37-8db2bb085a77",
            start: new Date(todayDate.getTime() + ONE_DAY_MS + ONE_HOUR_MS / 2),
            end: new Date(todayDate.getTime() + ONE_DAY_MS + ONE_HOUR_MS / 2 + ONE_HOUR_MS)
        }];

        return queryInterface.bulkInsert("patrol", patrols);
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete("patrol", null, {});
    }
};
