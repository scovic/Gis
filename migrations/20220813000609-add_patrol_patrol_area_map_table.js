"use strict";

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
        CREATE TABLE patrol_patrol_area_map (
            id SERIAL PRIMARY KEY,
            patrol_area_id uuid NOT NULL,
            patrol_id uuid NOT NULL
          )
      `);

        await queryInterface.sequelize.query(
            "ALTER TABLE patrol_patrol_area_map ADD CONSTRAINT patrol_area_fk FOREIGN KEY (patrol_area_id) REFERENCES patrol_area (id)"
        );

        await queryInterface.sequelize.query(
            "ALTER TABLE patrol_patrol_area_map ADD CONSTRAINT patrol_fk FOREIGN KEY (patrol_id) REFERENCES patrol (id)"
        );

        await queryInterface.sequelize.query(
            "ALTER TABLE patrol_patrol_area_map ADD CONSTRAINT patrol_patrol_area_uq UNIQUE (patrol_id, patrol_area_id)"
        );
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.sequelize.query("ALTER TABLE patrol_patrol_area_map DROP CONSTRAINT patrol_area_fk");
        await queryInterface.sequelize.query("ALTER TABLE patrol_patrol_area_map DROP CONSTRAINT patrol_fk");
        return queryInterface.sequelize.query("DROP TABLE patrol_patrol_area_map");
    }
};
