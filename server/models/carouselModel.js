// carouselModel

const mongoose = require('mongoose');

const carouselSchema = new mongoose.Schema({
  carouselImage: 
    {type: String,
    required: true,},
    carouselImageMd: 
    {type: String,
    required: true,},
    name: {
        type: String,
        required: [true, " carousel name is required"],
        unique: [true, "carousel must be unique"],
        minlength: [3, "Too short carousel name"],
        maxlength: [32, "Too long carousel name"],
      },
},{ timestamps: true });



const  carouselModul = mongoose.model("carousel",carouselSchema);

module.exports = carouselModul;
