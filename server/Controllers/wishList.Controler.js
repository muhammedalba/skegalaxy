const asyncHandler = require("express-async-handler");

const UserModel = require("../models/users.module");











// add product to wishlist
// post http://localhost:4000/api/wishlist
const addProductTOWishlist  = asyncHandler(async (req, res, next) => {
    // $addToSet => add product to wishlist array if product is not exist  
    const user =await UserModel.findByIdAndUpdate(req.user._id,{
        $addToSet:{
            wishlist:req.body.productId
        }
    },{new:true})
    res.status(201).json({status:"success",data:user.wishlist,message:"product added successfully to wishlist"})
})


// remove product from wishlist
// delet http://localhost:4000/api/wishlist/:productId
const deletProductFromWishlist  = asyncHandler(async (req, res, next) => {
    // $pull => remopve product to wishlist array if product is  exist  
    const user =await UserModel.findByIdAndUpdate(req.user._id,{
        $pull:{
            wishlist:req.params.productId
        }
    },{new:true})
    res.status(201).json({status:"success",data:user.wishlist,message:"product deleted successfully from wishlist"})
})


// get products from wishlist
// get http://localhost:4000/api/wishlist
const getLoggedUserWishlist  = asyncHandler(async (req, res, next) => {
    
    const user =await UserModel.findById(req.user._id ).populate("wishlist")
    res.status(200).json({status:"success", result:user.wishlist.length,data:user.wishlist})
})





module.exports = {
    deletProductFromWishlist,
    addProductTOWishlist,
    getLoggedUserWishlist
};
