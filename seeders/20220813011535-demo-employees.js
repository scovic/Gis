"use strict";

module.exports = {
    async up (queryInterface, Sequelize) {
        const employees = [{
            id: "d0b6d0a0-e3e7-4cfc-a769-8f6cbcefb8e5",
            first_name: "Jayda",
            last_name: "Allman"
        },
        {
            id: "9b521039-39f0-4919-86c6-30334b6fcda9",
            first_name: "Carly",
            last_name: "William"
        },
        {
            id: "be894246-a355-425e-b53e-3e4c1aee7bc8",
            first_name: "Shakir",
            last_name: "Dawson"
        },
        {
            id: "602505aa-4dba-4f6a-bac4-2e9348777d3c",
            first_name: "Myah",
            last_name: "Hubbard"
        },
        {
            id: "158ad352-c89e-4ca9-ac05-cf0687c3039f",
            first_name: "Anoushka",
            last_name: "Lowe"
        },
        {
            id: "110fa55e-0af5-4a59-9759-fc17d9cbad07",
            first_name: "Rikki",
            last_name: "Stout"
        }];

        return queryInterface.bulkInsert("employee", employees);
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete("employee", null, {});
    }
};
