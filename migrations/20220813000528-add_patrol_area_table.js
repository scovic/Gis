"use strict";

module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.sequelize.query(`
          CREATE TABLE patrol_area (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            name varchar(240) NOT NULL UNIQUE,
            area geography(POLYGON, 4326) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL,
            updated_at TIMESTAMP
          )
      `);
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.sequelize.query("DROP TABLE patrol_area");
    }
};
