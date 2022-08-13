"use strict";

module.exports = {
    async up (queryInterface, Sequelize) {
        const patrolAreas = [{
            name: "Park Svetog Save",
            area: {
                type: "Polygon",
                coordinates: [[
                    [21.917023420975664, 43.32036630043354],
                    [21.918280580521245, 43.32178297399004],
                    [21.920983066127228, 43.32052209836705],
                    [21.91977527746628, 43.319082048809825],
                    [21.917023420975664, 43.32036630043354]
                ]]
            }
        },
        {
            name: "Cair",
            area: {
                type: "Polygon",
                coordinates: [[
                    [21.903762624834094, 43.31704324718725],
                    [21.90703478114569, 43.31721229206891],
                    [21.909592281526912, 43.3162900178327],
                    [21.90986863110929, 43.3150405245536],
                    [21.90900997347834, 43.31440858713567],
                    [21.90714461379731, 43.31444449284686],
                    [21.907065656773774, 43.31333140593505],
                    [21.904894338626544, 43.31261327452732],
                    [21.903443503319078, 43.31289334678574],
                    [21.901913710988072, 43.31491844624636],
                    [21.903762624834094, 43.31704324718725]
                ]]
            }
        }];
        
        const preparedData = patrolAreas.map(({ name, area }) => ({
            name: name,
            area: Sequelize.fn("ST_GeomFromGeoJSON", JSON.stringify(area)),
        }));

        return queryInterface.bulkInsert("patrol_area", preparedData);
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete("patrol_area", null, {});
    }
};
