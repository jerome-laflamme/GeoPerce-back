const Camp = require("../models/camp.model");

exports.saveCamp = (camp) => {
    let newCamp = new Camp({
        type:camp.type,
        bookings:camp.bookings,
        currentPrice:camp.currentPrice
    })
    return newCamp.save()
}
exports.saveOneNewCamp = (camp) => {
    let newCamp = new Camp({
        id: camp.id,
        type:{
            service:camp.type.service,
            amp:camp.type.amp,
            length:camp.type.length,
            sun:camp.type.sun,
        },
        price:camp.price,
        position:camp.position,
    })
    return newCamp.save()
}
exports.clearCamps = () => {
  return Camp.deleteMany({});
};

exports.clearCamp = (campID) => {
    return Camp.deleteOne({id:campID});
}
exports.updateCamp = (camp) => {
    return Camp.findOneAndUpdate({_id:camp._id}, camp);
}

exports.saveCamps = (camps) => {
  return Camp.insertMany(camps);
};

exports.getCamps = (query) => {
    return Camp.find(query)
}

exports.saveReservation = (campId, booking) => {
  return Camp.updateOne(
    { id: campId },
    { $push: { bookings: booking } }
  );
};
