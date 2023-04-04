const data = require("../../data/index");
const campQueries = require("../queries/camp.queries");

exports.seedCamps = async () => {
  // GENERRATE DATA
  let camps = [];
  const service = [
    "Sans-services",
    "Eau-seulement",
    "Eau-electricite",
    "Eau-electricite-egouts",
  ];
  const amps = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65];
  const lengths = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];

  for (let i = 0; i < 30; i++) {
    const camp = {
      id: i,
      type: {
        service: service[Math.floor(Math.random() * service.length)],
        amp: amps[Math.floor(Math.random() * amps.length)],
        length: [
          lengths[Math.floor(Math.random() * lengths.length)],
          lengths[Math.floor(Math.random() * lengths.length)],
        ],
      },
      price: Math.floor(15+ Math.random() * 2),
      position: [48.5215 + Math.random() * 0.0025 , -64.218 + Math.random() * 0.0025],
      bookings: [],
    };
    console.log(camp);
    camps.push(camp);
  }
  // SAVE DATA
  try {
    await campQueries.clearCamps();
    await campQueries.saveCamps(camps);
    console.log("Camps saved");
  } catch (e) {
    console.log(e);
  }
};
