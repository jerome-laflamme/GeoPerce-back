const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
    type: { 
        type:String
    },
    title:{
        type:String
    },
    desc:{
        type:String
    },
    image:{
        type:String
    },
    link:{
        type:String
    },
    point:[
        {
        type:Number,
        },
        {
            type:Number
        }  
    ],
    icon:{
        type:String
    }
});
  
const Marker = mongoose.model('marker', markerSchema);
  
module.exports = Marker;
