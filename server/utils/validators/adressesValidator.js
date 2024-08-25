const { check } = require("express-validator");
const validatorMiddleware = require("../../middleWare/validatorMiddleware");
const UserModel = require("../../models/users.module");


exports.creatAddressValidator = [
    check("alias")
    .notEmpty()
      .withMessage("alias is required")
      .custom(async (val) => {
        const alias = await UserModel.find({"addresses.alias":val});
        console.log(alias);
        if (alias.length !== 0) {
          return Promise.reject(new Error(`the alias is user`));
        }
        return true;
      })
      ,
  
     validatorMiddleware
  ];
 
  

 



exports.deletAddressValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid address id Format")   
    .custom(async (val) => {
        const user = await UserModel.find({ "addresses._id": val});
        if (user.length === 0) {
          return Promise.reject(new Error(`No address found for this id: ${val}`));
        }
        return true;
    }),
   validatorMiddleware
];


