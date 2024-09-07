const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { promisify } = require('util');
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/users.module");

const { uploadImage } = require("../middleWare/uploadImgeMiddlewRE.JS");
const { sendEmail } = require("../sendEmail");
const ApiErorr = require("../utils/apiError");
const { createToken, createRefreshToken } = require("../utils/createToken");
const { sanitizeUser } = require("../utils/sanitizeData");

// upload  images
exports.signupUploadUserImge = uploadImage([
  { name: "image", maxCount: 1 },
]);



// post http://localhost:4000/api/users/auth/signup

//need to body{
//   firstname:
//   lastname
//   email:
//   password
//   passwordConfirm
// }

// public

exports.signup = asyncHandler(async (req, res) => {

  // Get the image link from url 
  const baseUrlSegments = req.baseUrl.split("/").slice(2, -1);
  const baseUrlPath = baseUrlSegments.join("/");
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${baseUrlPath}`;
  // creat user
  const user = await UserModel.create(req.body);

  // generate token

  const token = createToken(user);
  const refreshToken  = createRefreshToken(user);
  res.cookie("token", token, {
    httpOnly: false,// javascript only
    secure: true,//HTTPS
    sameSite: 'strict', // Enforce secure cookies & // Prevent CSRF attacks by setting sameSite
    // maxAge: 3 * 24 * 60 * 60 * 1000, // 30 days
});
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict', // Enforce secure cookies & // Prevent CSRF attacks by setting sameSite
  // maxAge: 3 * 24 * 60 * 60 * 1000, // 30 days
});

  res.status(201).json({status:'success', data: sanitizeUser(user),refreshToken,token ,imageUrl});
});

// post http://localhost:4000/api/users/auth/signup

//need to body{
//   email
//   password
// } 

// public
exports.login = asyncHandler(async (req, res, next) => {
  // Get the image link from url 
const baseUrlSegments = req.baseUrl.split("/").slice(2, -1);
const baseUrlPath = baseUrlSegments.join("/");
const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${baseUrlPath}`;

  const user = await UserModel.findOne({ email: req.body.email });
  let passwordUser;
  if (user) {
    passwordUser = await bcrypt.compare(req.body.password, user.password);
  }
  if (!user || !passwordUser) {
    return next(new ApiErorr("Incorrect email or password", 401));
  }

  // generate token
  const token = createToken(user);
  const refreshToken  = createRefreshToken(user);
  res.cookie("token", token, {
    httpOnly: false,// javascript only
    secure: true,//HTTPS
    sameSite: 'strict', // Enforce secure cookies & // Prevent CSRF attacks by setting sameSite
    // maxAge: 3 * 24 * 60 * 60 * 1000, // 30 days
});
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict', // Enforce secure cookies & // Prevent CSRF attacks by setting sameSite
  // maxAge: 3 * 24 * 60 * 60 * 1000, // 30 days
});
res.setHeader('Authorization', `Bearer ${token}`);

  res.status(200).json({status:'success', data: sanitizeUser(user),refreshToken ,token,imageUrl });
});
// public
exports.logout = asyncHandler(async (req, res, next) => {


  //  remove token
  
  res.cookie("token", '', {
    httpOnly: false,// javascript only
    secure: true,//HTTPS
    sameSite: 'strict', // Enforce secure cookies & // Prevent CSRF attacks by setting sameSite
   
});

res.cookie("refreshToken", '', {
  httpOnly: false,
  secure: true,
  sameSite: 'strict', // Enforce secure cookies & // Prevent CSRF attacks by setting sameSite

});


  res.status(200).json({status:'success', data: 'Logged out successfully' });
});


// Check the user if the password is updated and his identity
const handleAuthenticatedUser = async (user, req, next) => {

  try {

    const currentUser = await UserModel.findById(user.userId).lean()
    if (!currentUser) {
      return next(new ApiErorr('The user belonging to this token no longer exists', 401));
    }

    if (currentUser.passwordChangeAt) {
      const passwordChangeTimestamp = parseInt(currentUser.passwordChangeAt.getTime() / 1000, 10);
      if (passwordChangeTimestamp > user.iat) {
        return next(new ApiErorr('User recently changed his password. Please log in again...', 401));
      }
    }

    req.user = currentUser;
    next();
  } catch (error) {
    console.error('Error in handleAuthenticatedUser:', error);
    return next(new ApiErorr('Internal server error', 500));
  }
};


// check token
// exports.protect = asyncHandler(async (req, res, next) => {
  
 
//   const {refreshToken} = req.cookies;
//   const {token} = req.cookies;
// // chek token 
//   // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//   //   token = req.headers.authorization.split(' ')[1];
//   // }
//   if (!token) {
//     return next(new ApiErorr('You are not logged in. Please log in to access this route', 401));
//   }
// // Check token validity
//   jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {

//     if (err) {
//       //if Token Expired Error
//       if (err.name === 'TokenExpiredError') {
        
//         if (!refreshToken) {
//           return next(new ApiErorr('Refresh token is missing', 403));
//         }
//         // Check refreshToken validity
//         jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, async (refError, refUser) => {

//           if (refError) return next(new ApiErorr('Invalid refresh token', 403));
//           // Create a new Token
//           const newAccessToken = createToken(refUser);
          
         
//          console.log('new token :',newAccessToken);
//         //  Token update
//           res.cookie("token", newAccessToken, {
//             httpOnly: false,// javascript only
//             secure: false,//HTTPS
//             sameSite: 'strict', // Enforce secure cookies & // Prevent CSRF attacks by setting sameSite
        
//         }); 
//         res.setHeader('Authorization', `Bearer ${newAccessToken}`);
//           await handleAuthenticatedUser(refUser, req, next);
//         });
//       } // If the token is invalid
//       else {
        
//         return next(new ApiErorr('Invalid access token', 403));
//       }
//     } 
//     // If the token is valid
//     else {
//       await handleAuthenticatedUser(user, req, next);
//     }
//   });
// });

exports.protect = asyncHandler(async (req, res, next) => {
  // let token;
 const {refreshToken} = req.cookies;
 const {token} = req.cookies;
  // Check for token in headers
  // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  //   token = req.headers.authorization.split(' ')[1];
  // }

  if (!token) {
    return next(new ApiErorr('You are not logged in. Please log in to access this route', 401));
  }

  try {
    // Verify access token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

    
    await handleAuthenticatedUser(decoded, req, next);
  } catch (err) {
    // Token expired
    if (err.name === 'TokenExpiredError') {
     
      if (!refreshToken) {
        return next(new ApiErorr('Refresh token is missing', 403));
      }

      try {
        // Verify refresh token
        const decodedRefreshToken = await promisify(jwt.verify)(refreshToken, process.env.JWT_SECRET_KEY);
        
        // Generate new access token
        const newAccessToken = createToken(decodedRefreshToken);
        
        // Update cookie and authorization header
        res.cookie("token", newAccessToken, {
          httpOnly: false,
          // secure: process.env.NODE_ENV === 'production',
          secure: true,
          sameSite: 'strict', 
        });
        res.setHeader('Authorization', `Bearer ${newAccessToken}`);
        
        await handleAuthenticatedUser(decodedRefreshToken, req, next);
      } catch (refreshError) {
        return next(new ApiErorr('Invalid refresh token', 403));
      }
    } else {
      // Invalid access token
      return next(new ApiErorr('Invalid access token', 403));
    }
  }
});

// post forgotPassword
//  http://localhost:4000/api/users/auth/forgotPassword
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // 1- get user by email
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new ApiErorr(`there is no user with that email ${req.body.email}  `, 404)
    );
  }
  // 2 generate hash reset rendom 6 digits and save it in db

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");
  // save hashed password reset code into db
  user.passwordResetCode = hashedResetCode;
  // add expiration time for pasword reset code (10 min)
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;
  // eslint-disable-next-line no-self-assign
  user.image=user.image;
  await user.save();

  // 3- send email
  const message = `مرحبا: ${user.firstname}
  \n لقد تلقينا طلبًا لإعادة تعيين كلمة المرور لحساب المتجر الإلكتروني الخاص بك\n
   \n الرمز الاستعادة التي يمكنك استخدامه لاعادة تعيين كلمة المرور الخاصة بك هو: 
  ( ${resetCode} )\n ملاحظة : الرمز صالح لمدة 10 دقائق`;

  try {
    await sendEmail({
      message: message,
      email: user.email,
      subject: "your password reset code (valid for 5 ms)",
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;
    await user.save();
    return next(new ApiErorr(`error sending email (${err})`, 500));
  }
  await user.save();
  res.status(200).json({ success: true, message: "reset code sent to email" });
});

// post verifyResetCode
// http://localhost:4000/api/users/auth/verifyResetCode
exports.verifyResetCode = asyncHandler(async (req, res, next) => {
  // 1- get user based on reset code
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");
  const user = await UserModel.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ApiErorr(`reset code invalid or expired ${req.body.resetCode}  `, 404)
    );

  }
      // 2- reset code is invalid

      user.passwordResetVerified = true;
  
      await user.save();
      res.status(200).json({ success: true, message: "reset code verified" });
});
// reset password
// post http://localhost:4000/api/auth/resetPassword
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const baseUrlSegments = req.baseUrl.split("/").slice(2, -1);
const baseUrlPath = baseUrlSegments.join("/");
const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${baseUrlPath}`;
  // 1- get user based on email
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiErorr(`there is no user with that email ${req.body.email}  `, 404)
    );
  }

  // 2- check if password reset code is valid
  if (!user.passwordResetVerified) {
    return next(new ApiErorr("reset code not verified", 400));
  }
  // 3- check if password reset code expired
  if (user.passwordResetExpires < Date.now()) {
    return next(new ApiErorr("reset code not Expires", 400));
  }
  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;
  await user.save();
  // 4-  if everything is ok ,generate token
  const token = createToken(user);

  const refreshToken  = createRefreshToken(user);
  res.cookie("token", token, {
    httpOnly: false,// javascript only
    secure: true,//HTTPS
    sameSite: 'strict', // Enforce secure cookies & // Prevent CSRF attacks by setting sameSite
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
});
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict', // Enforce secure cookies & // Prevent CSRF attacks by setting sameSite
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
});
  res.status(200).json({status:'success', data: user, token,imageUrl });
});

