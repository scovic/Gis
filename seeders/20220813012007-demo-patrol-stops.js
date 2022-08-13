"use strict";

module.exports = {
    async up (queryInterface, Sequelize) {
        const patrolStops = [{
            name: "GN Komerc",
            location: {
                type: "Point",
                coordinates: [22.065978582146776, 42.702633625717944]
            }
        },
        {
            name: "Red Caffe",
            location: {
                type: "Point",
                coordinates: [22.060854410410343, 42.70767592605634],
            }
        },
        {
            name: "Bazen",
            location: {
                type: "Point",
                coordinates: [22.063390553519138, 42.70376724144916],
            }
        },
        {
            name: "Ljutezenac",
            location: {
                type: "Point",
                coordinates: [22.06341797128248, 42.70552013559968],
            }
        },
        {
            name: "Pleasure Cair",
            location: {
                type: "Point",
                coordinates: [21.906847159874967, 43.31742487506766],   
            }
        },
        {
            name: "Cairski",
            location: {
                type: "Point",
                coordinates: [21.902274809386423, 43.315462956071116],
                
            }
        },
        {
            name: "Ypsilon",
            location: {
                type: "Point",
                coordinates: [21.904054216283992, 43.316967464987755],
                
            }
        },
        {
            name: "Cafe Restoran Euforija",
            location: {
                type: "Point",
                coordinates: [21.90584586954103, 43.31730292224058],
                
            }
        },
        {
            name: "Cairska Kafana",
            location: {
                type: "Point",
                coordinates: [21.90507043235755, 43.317219521445296],
                
            }
        },
        {
            name: "Square Caffe",
            location: {
                type: "Point",
                coordinates: [21.9176704046823, 43.32041381559855],
                
            }
        },
        {
            name: "Garden Caffe",
            location: {
                type: "Point",
                coordinates: [21.917839012987752, 43.32058085173563],
                
            }
        },
        {
            name: "Gepeto Picerija",
            location: {
                type: "Point",
                coordinates: [21.91788923673831, 43.32023372924883],
                
            }
        },
        {
            name: "Lucas Caffe",
            location: {
                type: "Point",
                coordinates: [21.919611193900312, 43.319732616596966],
                
            }
        },
        {
            name: "Retrobar",
            location: {
                type: "Point",
                coordinates: [21.920314326408132, 43.32015282071502],
                
            }
        }];

        const preparedData = patrolStops.map(({ name, location }) => ({
            name: name,
            location: Sequelize.fn("ST_GeomFromGeoJSON", JSON.stringify(location)),
        }));

        return queryInterface.bulkInsert("patrol_stop", preparedData);
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete("patrol_stop", null, {});
    }
};
