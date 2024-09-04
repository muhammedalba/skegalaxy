const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const factory = require("./handelersFactory");
const UserModel = require("../models/users.module");
const ApiError = require("../utils/apiError");
const { uploadImage } = require("../middleWare/uploadImgeMiddlewRE.JS");
const { createToken } = require("../utils/createToken");
const {
  updatemageFromFolder,
} = require("../middleWare/uploadImgeMiddlewRE.JS");

const uploadUserImge = uploadImage([{ name: "image", maxCount: 1 }]);
// get all users
// get http://localhost:4000/api/api/users

const getUser = factory.getAll(UserModel,'users');

// add user

// post http://localhost:4000/api/usres/adduser
// need to body{
//   firstname
//   lastname
//   email
//   password
//   passwordConfirm
//   role
//   }
const addUser = factory.createOne(UserModel);

// get user by id
// get http://localhost:4000/api/users/id
const getUserById = factory.getOne(UserModel);

// update User ById
// patch http://localhost:4000/api/users/id
const updatetUserById = factory.updateOne(UserModel);

// delet user
// delet http://localhost:4000/api/users/id

const deletUser = factory.deleteOne(UserModel,'user' ,"addresses");

// changeUserPassword (admin)
// patch http://localhost:4000/api/users/changePassword/id
const changeUserPassword = asyncHandler(async (req, res, next) => {
  const changePassword = await UserModel.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 15),

      passwordChangeAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!changePassword) {
    return next(new ApiError(`no document for this id ${req.params.id}`, 404));
  }

  return res.json({status:'success',changePassword});
});

// change logged User  Password
// get http://localhost:4000/api/users/getMe
const getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

// update logged User  Password
// get http://localhost:4000api/users/changeMyPassword
const updateLoggedUserPassword = asyncHandler(async (req, res) => {

  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 11),
      passwordChangeAt: Date.now(),
    },
    { new: true }
  );
  res.cookie("token", '', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', 
  });

  res.status(200).json({ status:'success',data: user });
});


// update logged User  (wiyhout password role)
// get http://localhost:4000/api/users/updatLoggedUser
const updatLoggedUser = asyncHandler(async (req, res, next) => {
  await updatemageFromFolder(req.user._id, UserModel, req);
  const updateUser = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      image: req.body.image
    },
    { new: true }
  );

  res.status(200).json({status:'success',data: updateUser });
});

// deactive logged user
// delet  get http://localhost:4000/api/users/deletme

const deletLoggedUserData = asyncHandler(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({ status: "success" });
});

module.exports = {
  addUser,
  getUser,
  getUserById,
  updatetUserById,
  deletUser,
  changeUserPassword,
  updateLoggedUserPassword,
  uploadUserImge,
  deletLoggedUserData,
  getLoggedUserData,
  updatLoggedUser,
};
