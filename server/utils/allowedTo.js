const ApiError = require("./apiError")

module.exports=(...role)=>(req,res,next)=>{
        if(!role.includes(req.user.role)){
            return next(new ApiError('you are not allowed to do that'))
        }
        next()
    }