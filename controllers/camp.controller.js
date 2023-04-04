const campQueries = require("../database/queries/camp.queries");

exports.getCamps = async (req, res) => {
  try {
    let camps = await campQueries.getCamps(buildQuery(req));
    res.send(camps);
  } catch (e) {
    console.log(e);
  }
};
exports.saveOneNewCamp = async (req, res) => {
  try {
    await campQueries.saveOneNewCamp(req.body);
    res.send("Camp saved");
  } catch (e) {
    console.log(e);
  }
};
exports.clearCamp = async (req, res) => {
  try {
    await campQueries.clearCamp(req.params.id);
    res.send("Camp cleared");
  } catch (e) {
    console.log(e);
  }
};
exports.updateCamp = async (req, res) => {
  try {
    await campQueries.updateCamp(req.body);
    res.send("Camps updated");
  } catch (e) {
    console.log(e);
  }
};

function buildQuery(req) {
  if (!req.query.filters) {
    return {};
  }

  let query = {
    "type.service": req.query.filters.services,
    "type.amp": { $gte: Number(req.query.filters.amps) },
    "type.length": { $gte: Number(req.query.filters.campLength) },
    "bookings.bookingDates": { $ne: req.query.wantedDates }
  };

  if (req.query.filters.services === "0") {
    delete query["type.service"];
  }

  return query;
}
