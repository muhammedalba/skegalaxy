const mongoose = require("mongoose");

const catrSchema = new mongoose.Schema({
cartItems:[{
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
       
        default: 1,
    },
    color:{type :String},
    price: {type:Number}
}],
user:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
},
 totalCartPrice:{
    type: Number,
    
    default: 0,
 },
 totalPriceAfterDiscount:{
    type: Number,
    
    default: 0,
 }



}, { timestamps: true });

catrSchema.pre(/^find/, function(){
    this.populate({
        path: 'cartItems.product',
        select: 'title imageCover priceAfterDiscount price quantity',
      });
  
  })
  
const cartModel=mongoose.model("Cart", catrSchema);
module.exports =cartModel;
