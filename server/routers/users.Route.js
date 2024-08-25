const express = require("express");
const {
  addUser,
  getUser,
  getUserById,
  updatetUserById,
  deletUser,
  changeUserPassword,
  getLoggedUserData,
  updateLoggedUserPassword,
  updatLoggedUser,
  deletLoggedUserData,
  uploadUserImge,
} = require("../Controllers/user.Controler");
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deletUserValidator,
  changePasswordValidator,
  updatLoggedUserValidator
} = require("../utils/validators/userValidator");
const { protect } = require("../Controllers/auth.Controler");
const allowedTo = require("../utils/allowedTo");
const role = require("../utils/userRoles");
const { resizeImge } = require("../middleWare/uploadImgeMiddlewRE.JS");

const router = express.Router();
// user
router.get(
  "/getMe",
  protect,
  // allowedTo(role.USER),
  getLoggedUserData,
  getUserValidator,
  getUserById
);
router.put(
  "/changeMyPassword",
  protect,
  allowedTo(role.USER),
  updateLoggedUserPassword
);
router.put("/updatLoggedUser", protect, allowedTo(role.USER),uploadUserImge,updatLoggedUserValidator, resizeImge, updatLoggedUser);
router.delete("/deletme", protect, allowedTo(role.USER), deletLoggedUserData);







// admin routes

router.route("/").get(protect, allowedTo(role.ADMIN), getUser);
router
  .route("/adduser")
  .post(
    protect,
    allowedTo(role.ADMIN),
    uploadUserImge,
    createUserValidator,
    resizeImge,
    addUser
  );
router
  .route("/changePassword/:id")
  .put(
    protect,
    allowedTo(role.ADMIN),
    changePasswordValidator,
    changeUserPassword
  );

router
  .route("/:id")
  .get(protect, allowedTo(role.ADMIN), getUserValidator, getUserById)
  .put(
    protect,
    allowedTo(role.ADMIN),
    uploadUserImge,
    updateUserValidator,
    resizeImge,
    updatetUserById
  )
  // .patch(deletUser)
  .delete(protect, allowedTo(role.ADMIN), deletUserValidator, deletUser);

module.exports = router;
