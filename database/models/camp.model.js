const mongoose = require('mongoose');

const campSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    type:{
        service: {
            type: String,
            required:true,
        },
        amp: {
            type: Number,
            required:true,
        },
        length: {
            type: Array,
            required:true,
        },
        sun:{
            type:String,
        }
    },
    bookings: { 
        type:Array
    },
    price: {
        type: Number,
        required:true,
    },
    position: { 
        type:Array
    },
});
  
const Camp = mongoose.model('camp', campSchema);
  
module.exports = Camp;
