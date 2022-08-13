"use strict";

module.exports = {
    async up (queryInterface, Sequelize) {
        const employees = [{
            first_name: "Jayda",
            last_name: "Allman"
        },
        {
            first_name: "Carly",
            last_name: "William"
        },
        {
            first_name: "Shakir",
            last_name: "Dawson"
        },
        {
            first_name: "Myah",
            last_name: "Hubbard"
        },
        {
            first_name: "Anoushka",
            last_name: "Lowe"
        },
        {
            first_name: "Rikki",
            last_name: "Stout"
        }];

        return queryInterface.bulkInsert("employee", employees);
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete("employee", null, {});
    }
};
