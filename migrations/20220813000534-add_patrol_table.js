"use strict";

module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.sequelize.query(`
          CREATE TABLE patrol (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            status varchar(20) DEFAULT 'PENDING',
            start TIMESTAMP NOT NULL,
            "end" TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL,
            updated_at TIMESTAMP
          )
      `);
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.sequelize.query("DROP TABLE patrol");
    }
};
