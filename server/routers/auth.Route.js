const express = require("express");

const { signup, login,logout, signupUploadUserImge ,forgotPassword,resetPassword,verifyResetCode} = require("../Controllers/auth.Controler");
const {
  signUpValidator,
  logInValidator,
  
} = require("../utils/validators/authValidator ");
const { resizeImge } = require("../middleWare/uploadImgeMiddlewRE.JS");





const router = express.Router();

router.route("/signup").post(signupUploadUserImge,signUpValidator,resizeImge,  signup);
router.route("/login").post(logInValidator, login);
router.route("/forgotPassword").post(forgotPassword);
router.route("/verifyResetCode").post(verifyResetCode);
router.route("/resetPassword").put(resetPassword);
router.route("/logout").post(logout);


// router
//   .route("/users/:id")
//   .get(getUserValidator, getUserById)
//    .patch(updateUserValidator, updatetUserById)
//   // .patch(deletUser)
//   .delete(deletUserValidator, deletUser);

module.exports = router;
