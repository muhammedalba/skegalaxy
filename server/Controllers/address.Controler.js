const asyncHandler = require("express-async-handler");

const UserModel = require("../models/users.module");











// add address to user address list
// post http://localhost:4000/api/addresses
const addAddress  = asyncHandler(async (req, res) => {
    // $addToSet => add address opject to addresses array if addresses is not exist  
    const user =await UserModel.findByIdAndUpdate(req.user._id,{
        $addToSet:{
            addresses:req.body
        }
    },{new:true})
    res.status(201).json({ status:'success', result:user.addresses.length,data:user.addresses,message:"address added successfully "})
})


// remove address from user addresses list
// delet http://localhost:4000/api/addresses/:address
const deletAddress = asyncHandler(async (req, res) => {
    // $pull => remopve addresses opject from addresses array if addressesId is  exist  
    const user =await UserModel.findByIdAndUpdate(req.user._id,{
        $pull:{
            addresses:{_id:req.params.id}
        }
    },{new:true})
    res.status(201).json({status:'success', result:user.addresses.length,data:user.addresses,message:"addresses deleted successfully"})
})

// get logged user addresses list
// get http://localhost:4000/api/addresses
const getAddresses = asyncHandler(async (req, res, next) => {
    
    const user =await UserModel.findById(req.user._id ).populate("addresses")
    res.status(200).json({status:'success', result:user.addresses.length,data:user.addresses})
})





module.exports = {
    deletAddress,
    addAddress,
    getAddresses
};
