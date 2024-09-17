const path = require("path");

const asyncHandler = require("express-async-handler");
const factory = require("./handelersFactory");
const {
  uploadImage,
  updatemageFromFolder,
} = require("../middleWare/uploadImgeMiddlewRE.JS");

const ApiError = require("../utils/apiError");
const { sendEmail } = require("../utils/sendEmail");
const cartModel = require("../models/cartModel");
const orderModul = require("../models/orderModel");
const productModel = require("../models/productModule");

// upload single image && DeliveryReceiptImage  and orderPdf
exports.uploadorderImge = uploadImage([
  { name: "image", maxCount: 1 },
  { name: "orderPdf", maxCount: 1 },
  { name: "DeliveryReceiptImage", maxCount: 1 },
]);

//post  create cash order
// /api/orders/:cartId
exports.createcashOrder = asyncHandler(async (req, res, next) => {
  const DeliveryVerificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  // app settings
  const shippingPrice = 0;
  const taxtPrice = 0;
  const shipping = req.body;

  // 1- get cart depend on cardid
  const cart = await cartModel.findById(req.params.cartId);
  if (!cart) {
    return next(new ApiError(`cart not found id${req.params.cartId}`, 404));
  }

  // 2- get order depend on price "chek if coupon applay"
  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;
  const totalOrderPrice = cartPrice + taxtPrice + shippingPrice;

  // 3- create order with default paymentMethod cash
  const order = await orderModul.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: shipping,
    image: req.body.image,
    VerificationCode: DeliveryVerificationCode,
    totalOrderPrice,
  });
  // 3- send email

  // 4_ after creating order,increment product sold,decrement product quantity
  if (order) {
    const bulkoptions = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { sold: +item.quantity, quantity: -item.quantity } },
      },
    }));
    //  تقوم بعمل اكثر من اوبريشن في كوماند واحد
    await productModel.bulkWrite(bulkoptions, {});
    // 5-clear cart depend on cardid
    await cartModel.findByIdAndDelete(req.params.cartId);
  }
  res.status(201).json({ message: "success", data: order });
});

// Display orders based on user (all orders our  user order)
exports.filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
  if (req.user.role === "user") req.filteropject = { user: req.user._id };
  next();
});

//  get  get all orders
// /api/orders
exports.getAllOrders = factory.getAll(orderModul, "orders");
exports.deletOrder = factory.deleteOne(orderModul, "order");

//  get  get all orders
// /api/orders/:id
exports.findSpecificOrder = factory.getOne(orderModul);

// put update order paid status to paid
// /api/orders/:id/pay
exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await orderModul.findById(req.params.id);
  if (!order) {
    return next(
      new ApiError(`there is such a order with id : ${req.params.id}`, 404)
    );
  }
  // update order to paid
  order.isPaid = true;
  order.paidAt = Date.now();

  const updateOrder = await order.save();

  res.status(200).json({ data: updateOrder });
});

// put update order delivered status
// /api/orders/:id/deliver
exports.updateOrderTodelivered = asyncHandler(async (req, res, next) => {
  const order = await orderModul.findById(req.params.id);
  if (!order) {
    return next(
      new ApiError(`there is such a order with id : ${req.params.id}`, 404)
    );
  }
  // update order to paid
  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updateOrder = await order.save();

  res.status(200).json({ data: updateOrder });
});

// put update order pdf
// /api/orders/:id/invoice
exports.updateOrderSendInvoice = asyncHandler(async (req, res, next) => {
  const order = await orderModul.findById(req.params.id);
  if (!order) {
    return next(
      new ApiError(`there is such a order with id : ${req.params.id}`, 404)
    );
  }
  // chek If this order has an invoice

  await updatemageFromFolder(req.params.id, orderModul, req);
  order.orderPdf = req.body.orderPdf;

  const updateOrder = await order.save();
  try {
    await sendEmail({
      message: `<h2>  ${order.user.firstname}:مرحبا </h2>
        <p>تم استلام طلبك بنجاح وتم إنشاء الفاتورة الخاصة بك من قبل شركة مجرة السماء للتجارة.</p>
      <p>شكرا لكم لاختياركم لنا سنقوم بارسال طلبيتكم باقرب  وقت </p>
      <p>   يمكنك تحميل الفاتورة من الرابط في الاسفل</p>
                <p>sky Galaxy  شكرا لاختياركم </p>

    `,
      email: order.user.email,
      subject: "   تم استلام طلبك بنجاح ",
      attachments: [
        {
          filename: "ملف الفاتورة.pdf",
          path: path.join(
            process.env.UPLOADS_DIRECTORY,
            "orders",
            req.body.orderPdf
          ), // مسار الملف
        },
      ],
    });
  } catch (err) {
    return next(new ApiError(`error sending email (${err})`, 500));
  }

  res.status(200).json({ data: updateOrder });
});
// send Delivery-receipt-image
exports.updateOrderDeliveryReceiptImage = asyncHandler(
  async (req, res, next) => {
    const order = await orderModul.findById(req.params.id);
    if (!order) {
      return next(
        new ApiError(`there is such a order with id : ${req.params.id}`, 404)
      );
    }
    // chek If this order has an invoice

    // if(order.orderPdf){
    // update imge from uploads folder
    await updatemageFromFolder(req.params.id, orderModul, req);
    // }
    order.DeliveryReceiptImage = req.body.DeliveryReceiptImage;

    const updateOrder = await order.save();
    try {
      await sendEmail({
        message: `<h2>تم استلام طلبك ${order.user.firstname}:مرحبا </h2>
      <p>  تم توصيل طلبك بنجاح    بك من قبل  شركه مجرة السماء للتجارة  </p>
      <p>شكرا لكم لاختياركم لنا       </p>
      <p>وهذه صورة وصل الاستلام":</p>
      <img src="cid:productImage@ecommerce" alt="Product Image" />
          <p>sky Galaxy  شكرا لاختياركم </p>
    `,
        email: order.user.email,
        subject: "   تم استلام طلبك بنجاح ",
        attachments: [
          {
            filename: "وصل الاستلام", // اسم الملف المرفق
            path: path.join(
              process.env.UPLOADS_DIRECTORY,
              "orders",
              req.body.DeliveryReceiptImage
            ),
            cid: "productImage@ecommerce",
          },
        ],
      });
    } catch (err) {
      return next(new ApiError(`error sending email (${err})`, 500));
    }

    res.status(200).json({ data: updateOrder });
  }
);

