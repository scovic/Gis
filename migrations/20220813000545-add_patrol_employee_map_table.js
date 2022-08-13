"use strict";

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
        CREATE TABLE patrol_employee_map (
            id SERIAL PRIMARY KEY,
            employee_id uuid NOT NULL,
            patrol_id uuid NOT NULL
          )
      `);

        await queryInterface.sequelize.query(
            "ALTER TABLE patrol_employee_map ADD CONSTRAINT employee_fk FOREIGN KEY (employee_id) REFERENCES employee (id)"
        );

        await queryInterface.sequelize.query(
            "ALTER TABLE patrol_employee_map ADD CONSTRAINT patrol_fk FOREIGN KEY (patrol_id) REFERENCES patrol (id)"
        );
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.sequelize.query("ALTER TABLE patrol_employee_map DROP CONSTRAINT employee_fk");
        await queryInterface.sequelize.query("ALTER TABLE patrol_employee_map DROP CONSTRAINT patrol_fk");
        await queryInterface.sequelize.query("DROP TABLE patrol_employee_map");
    }
};
