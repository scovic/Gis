"use strict";

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
        CREATE TABLE patrol_patrol_stop_map (
            id SERIAL PRIMARY KEY,
            patrol_stop_id uuid NOT NULL,
            patrol_id uuid NOT NULL
          )
      `);

        await queryInterface.sequelize.query(
            "ALTER TABLE patrol_patrol_stop_map ADD CONSTRAINT patrol_stop_fk FOREIGN KEY (patrol_stop_id) REFERENCES patrol_stop (id)"
        );

        await queryInterface.sequelize.query(
            "ALTER TABLE patrol_patrol_stop_map ADD CONSTRAINT patrol_fk FOREIGN KEY (patrol_id) REFERENCES patrol (id)"
        );
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.sequelize.query("ALTER TABLE patrol_patrol_stop_map DROP CONSTRAINT patrol_stop_fk");
        await queryInterface.sequelize.query("ALTER TABLE patrol_patrol_stop_map DROP CONSTRAINT patrol_fk");
        return queryInterface.sequelize.query("DROP TABLE patrol_patrol_stop_map");
    }
};
