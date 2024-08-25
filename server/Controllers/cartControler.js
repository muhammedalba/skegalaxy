const asyncHandler = require("express-async-handler");

const cartModel = require("../models/cartModel");
const couponModel = require("../models/couponModel");
const productModel = require("../models/productModule");
const ApiError = require("../utils/apiError");

const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  cart.totalCartPrice = totalPrice;
  
  cart.totalPriceAfterDiscount = undefined;
  return totalPrice;
};

// post http://localhost:4000/api/cart
exports.addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color } = req.body;
  
  // get productbyID
  const product = await productModel.findById(productId);

  const price =product.priceAfterDiscount?product.priceAfterDiscount:product.price


  // 1-get cart for logged  user
  let cart = await cartModel.findOne({ user: req.user._id });
// chek product If available add to cart
if(product.quantity > 0) {

  if (!cart  ) {
    cart = await cartModel.create({
      user: req.user._id,
      cartItems: [
        {
          product: productId,
          price: price,
          color,
        },
      ],
    });
  } else {
    // 2-check if product is exist in cart

    const productIndex = cart.cartItems.findIndex(
      (item) =>
        item.product._id.toString() === productId.toString()
    );

    
    if (productIndex > -1 ) {
// If the required quantity is available
      if( product.quantity > cart.cartItems[productIndex].quantity){
        cart.cartItems[productIndex].quantity += 1;
      
      }else{
        return next(new ApiError("out of stock", 400));
      }
    } else {
      // if product is not exist in cart
      cart.cartItems.push({
        product: productId,
        price: price,
        color,
        quantity: 1,
      });
    }
  }

}else{
  return next(new ApiError("out of stock", 400));
 
}


  //   calculate total cart price
  calcTotalCartPrice(cart);

  await cart.save();

  res.status(201).json({
    resnumOfCartItems: cart.cartItems.length,
    data: cart,
    status:201,
    msg: " product aded success",
  });
});

// get all items from cart
// get http://localhost:4000/api/cart
exports.getCart = asyncHandler(async (req, res, next) => {
   // imge url
   const imageUrl=`${req.protocol}://${req.get('host')}/uploads/${req.baseUrl.split("/").slice(2).join("/")}`;
   const newUrl = imageUrl.replace("cart", "products");

  const cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) {
    return next(
      new ApiError(` there is no cart this user id ${req.user._id} `, 404)
    );
  }
  //   calculate total cart price
  calcTotalCartPrice(cart);

  res
    .status(200)
    .json({ resnumOfCartItems: cart.cartItems.length, data: cart,imageUrl:newUrl });
});

// remove item from cart
// delet http://localhost:4000/api/cart/:itemid
exports.removeCartItem = asyncHandler(async (req, res, next) => {
  try {
    // التحقق من وجود الـ cart
    const cart = await cartModel.findOneAndUpdate(
      { user: req.user._id },
      {
        $pull: {
          cartItems: {
            product: req.params.itemid,
          },
        },
      },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

  

    // حساب السعر الإجمالي بعد إزالة العنصر
    calcTotalCartPrice(cart);
    
    // حفظ التغييرات في قاعدة البيانات
    await cart.save();

    // إرسال الاستجابة
    res.status(200).json({ numOfCartItems: cart.cartItems.length, data: cart });
  } catch (error) {
    // معالجة الأخطاء
    next(error);
  }
});


// clear cart
// delet http://localhost:4000/api/cart
exports.clearCart = asyncHandler(async (req, res, next) => {
  const cart = await cartModel.findOneAndDelete(
    { user: req.user._id },
    { new: true }
  );

  res.status(204).send();
});
// update cart item quantity
// put http://localhost:4000/api/cart/:itemid
exports.updateCartItemQuantity = asyncHandler(async (req, res, next) => {
  const {productId, quantity } = req.body;
  // get productbyID
  const product = await productModel.findById(productId);
  console.log(product.quantity);
  
  const cart = await cartModel.findOne({ user: req.user._id });

  if (!cart) {
    return next(
      new ApiError(` there is no cart for user  ${req.user._id} `, 404)
    );
  }
  const productIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === req.params.itemid.toString()
  );
  if (productIndex > -1) {
 
    if(quantity <= product.quantity) {
      cart.cartItems[productIndex].quantity = quantity;
      

    }else{
      return next(new ApiError("out of stock", 400));
    }
  } else {
    return next(
      new ApiError(` there is no item for id  ${req.params.itemid} `, 404)
    );
  }
  await cart.save();
  calcTotalCartPrice(cart);
  res.status(201).json({
    resnumOfCartItems: cart.cartItems.length,
    data: cart,
    msg: " updated item success",
  });
});

// Applay coupon on logged cart
// put http://localhost:4000/api/cart/applayCoupon
exports.applayCoupon = asyncHandler(async (req, res, next) => {
  // 1- get coupon  based on coupon name
  const coupon = await couponModel.findOne({
    name: req.body.coupon,
    expires: { $gt: Date.now()},
  });

  if (!coupon) {
    return next(
      new ApiError(`  coupon is invalid or expired${req.body.coupon} `, 404)
    );
  }
  //   2- get logged user  cart to get total cart price
  const cart = await cartModel.findOne({ user: req.user._id });
  const totalPrice = cart.totalCartPrice;

  // 3- Calculate price after priceAfterDiscount
  const priceAfterDiscount =( totalPrice - (totalPrice * coupon.discount) / 100).toFixed(2);
  cart.totalPriceAfterDiscount=priceAfterDiscount;


  await cart.save();
  res.status(201).json({
    resnumOfCartItems: cart.cartItems.length,
    data: cart,
    msg: "  success",
  });
});
