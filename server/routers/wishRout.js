const express = require("express");

const { protect } = require("../Controllers/auth.Controler");
const allowedTo = require("../utils/allowedTo");
const role = require("../utils/userRoles");
const { addProductTOWishlist,deletProductFromWishlist,getLoggedUserWishlist } = require("../Controllers/wishList.Controler");
const { creatProductToWishlistValidator,deletProductFromWishlistValidator } = require("../utils/validators/wishListValidator");



const router = express.Router();
router.use(protect,allowedTo(role.USER))

router.route("/")
.get(getLoggedUserWishlist)
.post(creatProductToWishlistValidator,addProductTOWishlist);


router
  .route("/:productId")
  .delete(deletProductFromWishlistValidator, deletProductFromWishlist);

module.exports = router;
