const express = require("express");

const { protect } = require("../Controllers/auth.Controler");
const allowedTo = require("../utils/allowedTo");
const role = require("../utils/userRoles");
const {     deletAddress,
  addAddress,
  getAddresses} = require("../Controllers/address.Controler");
const { deletAddressValidator ,creatAddressValidator} = require("../utils/validators/adressesValidator");



const router = express.Router();
router.use(protect,allowedTo(role.USER))

router.route("/")
.get(getAddresses)
.post(creatAddressValidator,addAddress);


router
  .route("/:id")
  .delete(deletAddressValidator, deletAddress);

module.exports = router;
