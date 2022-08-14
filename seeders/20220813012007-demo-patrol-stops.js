"use strict";

module.exports = {
    async up (queryInterface, Sequelize) {
        const patrolStops = [{
            id: "0ad4df13-243a-4747-84f2-417e1da9947c",
            name: "GN Komerc",
            location: {
                type: "Point",
                coordinates: [22.065978582146776, 42.702633625717944]
            }
        },
        {
            id: "f806ab7a-4f0d-4472-87e9-1e0842e0fa12",
            name: "Red Caffe",
            location: {
                type: "Point",
                coordinates: [22.060854410410343, 42.70767592605634],
            }
        },
        {
            id: "d8c53f2b-1944-4c9c-b4bf-807bf7b858ff",
            name: "Bazen",
            location: {
                type: "Point",
                coordinates: [22.063390553519138, 42.70376724144916],
            }
        },
        {
            id: "7bf5dedf-ea72-44a1-a104-0eef2951dcef",
            name: "Ljutezenac",
            location: {
                type: "Point",
                coordinates: [22.06341797128248, 42.70552013559968],
            }
        },
        {
            id: "eb2aa6b3-a71b-4d75-b058-32ba661e0d8f",
            name: "Pleasure Cair",
            location: {
                type: "Point",
                coordinates: [21.906847159874967, 43.31742487506766],   
            }
        },
        {
            id: "cf40905d-e129-47f6-a2dc-0815588bc0d1",
            name: "Cairski",
            location: {
                type: "Point",
                coordinates: [21.902274809386423, 43.315462956071116],
            }
        },
        {
            id: "c9dbbc78-ebd2-4af2-a8e1-9df504d0d525",
            name: "Ypsilon",
            location: {
                type: "Point",
                coordinates: [21.904054216283992, 43.316967464987755],
            }
        },
        {
            id: "080930bf-7da2-416e-9e03-7ffdfbb11222",
            name: "Cafe Restoran Euforija",
            location: {
                type: "Point",
                coordinates: [21.90584586954103, 43.31730292224058],
            }
        },
        {
            id: "a361497b-1c11-4228-99ec-be964a188410",
            name: "Cairska Kafana",
            location: {
                type: "Point",
                coordinates: [21.90507043235755, 43.317219521445296],
            }
        },
        {
            id: "e331be3c-a1d4-4f4b-b563-f8c468fa0471",
            name: "Square Caffe",
            location: {
                type: "Point",
                coordinates: [21.9176704046823, 43.32041381559855],
            }
        },
        {
            id: "8b5ea3ce-ef77-4de1-858b-e000737efb8c",
            name: "Garden Caffe",
            location: {
                type: "Point",
                coordinates: [21.917839012987752, 43.32058085173563],
            }
        },
        {
            id: "3c0bee1c-9c0b-4c11-a5f4-1d88447faee3",
            name: "Gepeto Picerija",
            location: {
                type: "Point",
                coordinates: [21.91788923673831, 43.32023372924883],
            }
        },
        {
            id: "57c19f0c-5d96-4745-a281-d534b9f69928",
            name: "Lucas Caffe",
            location: {
                type: "Point",
                coordinates: [21.919611193900312, 43.319732616596966],
            }
        },
        {
            id: "ac528f68-630b-4a7f-bb94-bb100424dcfc",
            name: "Retrobar",
            location: {
                type: "Point",
                coordinates: [21.920314326408132, 43.32015282071502],
                
            }
        }];

        const preparedData = patrolStops.map(({ location, ...rest }) => ({
            ...rest,
            location: Sequelize.fn("ST_GeomFromGeoJSON", JSON.stringify(location)),
        }));

        return queryInterface.bulkInsert("patrol_stop", preparedData);
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete("patrol_stop", null, {});
    }
};
