"use strict";

module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.sequelize.query(`
          CREATE TABLE employee (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            first_name varchar(60) NOT NULL,
            last_name varchar(180) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL,
            updated_at TIMESTAMP
          )
      `);
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.sequelize.query("DROP TABLE employee");
    }
};
