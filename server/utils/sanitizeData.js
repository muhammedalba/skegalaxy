exports.sanitizeUser= function(user){
    
    return {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        image: user.image,
        role: user.role,
    }
}
