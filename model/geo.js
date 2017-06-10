var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LocationSchema = new Schema({  
    name: String,
    Discription:String,
    image:String,
    environment:String,
    id:String,
    loc: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2d'      // create the geospatial index
    }
});

module.exports= mongoose.model('Location', LocationSchema);  