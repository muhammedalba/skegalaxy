// eslint-disable-next-line import/no-extraneous-dependencies
const stripe = require("stripe")("sk_test_51PRvCc04PQXKD0Rqli1MC6Xi9yikoS0JqHzCGEU3AY8FYqEWMVSLk0GwR3B4kIxo57PSPy3MpOc4kbz1Ovv9fHYB00Q8hSlODB");

const asyncHandler = require("express-async-handler");
const factory = require("./handelersFactory");
const { uploadImage ,updatemageFromFolder} = require("../middleWare/uploadImgeMiddlewRE.JS");

const ApiError = require("../utils/apiError");
const {sendEmail} = require("../sendEmail");
const cartModel = require("../models/cartModel");
const orderModul = require("../models/orderModel");
const productModel = require("../models/productModule");
const UserModel = require("../models/users.module");


// upload single image && DeliveryReceiptImage  and orderPdf 
exports.uploadorderImge=uploadImage([{name:'image',maxCount:1},{name:'orderPdf',maxCount:1},{name:'DeliveryReceiptImage',maxCount:1}])

//post  create cash order
// /api/orders/:cartId
exports.createcashOrder = asyncHandler(async (req, res, next) => {

const DeliveryVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
 

  
  // app settings
  const shippingPrice = 0;
  const taxtPrice = 0;
  const shipping=req.body


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
    shippingAddress:shipping,
    image:req.body.image,
    VerificationCode:DeliveryVerificationCode,
    totalOrderPrice,
  });
  // 3- send email
  const invoiceHtml = `
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sales Order</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            direction: rtl;
            text-align: right;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            margin: 0 auto;
            border: 1px solid #ddd;
            max-width: 800px;
        }
        .header, .footer {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1, .footer p {
            margin: 0;
        }
        .info {
            margin-bottom: 20px;
        }
        .info div {
            margin-bottom: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 10px;
            text-align: right;
        }
        .totals {
            margin-top: 20px;
            text-align: right;
        }
        .totals div {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>شركة الفصول السبعة المحدودة</h1>
        </div>
        <div class="info">
            <div>رقم الطلب: RUH-2-2024 -327808/08/2024</div>
            <div>التاريخ: 08/08/2024</div>
            <div>مكان التسليم: </div>
            <div>رقم التسليم: </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>الرقم</th>
                    <th>الوصف</th>
                    <th>الكمية</th>
                    <th>السعر</th>
                    <th>الإجمالي</th>
                    <th>الضريبة</th>
                    <th>الإجمالي النهائي</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mattex GeoMatt 120 GSM</td>
                    <td>600.00</td>
                    <td>1.16</td>
                    <td>696.00</td>
                    <td>104.35</td>
                    <td>800.35</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>رسوم النقل</td>
                    <td>1.00</td>
                    <td>100.00</td>
                    <td>100.00</td>
                    <td>14.99</td>
                    <td>114.99</td>
                </tr>
            </tbody>
        </table>
        <div class="totals">
            <div>إجمالي الكمية: 601.00</div>
            <div>إجمالي المبلغ: 796.00</div>
            <div>إجمالي الخصم: 0.35</div>
            <div>المبلغ الصافي: 795.65</div>
            <div>ضريبة القيمة المضافة: 119.35</div>
            <div>إجمالي المبلغ المستحق: 915.00</div>
        </div>
        <div class="footer">
            <p>Powered by: Digital Upgrade</p>
        </div>
    </div>
</body>
</html>

`;
  

  // try {
  //   await sendEmail({
  //     message: invoiceHtml,
  //     email: req.user.email,
  //     subject: "تم استلام الطلب",
  //   });
  // } catch (err) {
  // return next(new ApiError(`error sending email (${err})`, 500));
  // }



  // 4_ after creating order,increment product sold,decrement product quantity
  if (order) {
    const bulkoptions = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { sold: +item.quantity, quantity: -item.quantity } },
      },
    }));
    //  تقوم بعمل اكثر من اوبريشن في كوماند واحد
    await productModel.bulkWrite(bulkoptions,{});
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
exports.getAllOrders = factory.getAll(orderModul,"orders");
exports.deletOrder = factory.deleteOne(orderModul,'order');

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
 
  // if(order.orderPdf){
      // update imge from uploads folder
      await updatemageFromFolder(req.params.id, orderModul, req);
  // }
  order.orderPdf = req.body.orderPdf;
 

  const updateOrder = await order.save();

  res.status(200).json({ data: updateOrder });
});
// send Delivery-receipt-image
exports.updateOrderDeliveryReceiptImage = asyncHandler(async (req, res, next) => {
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

  res.status(200).json({ data: updateOrder });
});
// get checkout session from stripe and send it as response
// /api/orders/checkout-session/cartId
exports.checkoutSession = asyncHandler(async (req, res, next) => {
  // app settings
  const shippingPrice = 0;
  const taxtPrice = 0;

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

  //3-  create stripe chekout session
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: { 
         
          currency: 'sar',  
          unit_amount: totalOrderPrice * 100 ,// ( 0.1 => 10)
            product_data: {
              name: req.user.firstname,
              
              // images: ['https://example.com/t-shirt.png'],
            
            },
            } ,


        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.protocol}://${req.get('host')}/api/orders`,
    cancel_url: `${req.protocol}://${req.get('host')}/api/cart`,
    customer_email: req.user.email,
    client_reference_id: req.params.cartId,
    metadata: req.body.shippingAddress,
  });

  res.status(200).json({ data: session });
});



const createCardOrder =async(session)=>{
const cartId = session.client_reference_id;
const shippingAddress = session.metadata;
const orderPrice = session.amount_total / 100;


const cart =await cartModel.findById(cartId);
const user =await UserModel.findOne({email:session.customer_email});
  // 3- create order with default paymentMethod card
  const order = await orderModul.create({
    user: user._id,
    cartItems: cart.cartItems,
    shippingAddress,
    totalOrderPrice:orderPrice,
    isPaid:true,
    paidAt:Date.now(),
    paymentMethodType:'card'
  });
   // 4_ after creating order,increment product sold,decrement product quantity
  if (order) {
    const bulkoptions = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { sold: + item.quantity, quantity: - item.quantity } },
      },
    }));
    //  تقوم بعمل اكثر من اوبريشن في كوماند واحد
    await productModel.bulkWrite(bulkoptions,{});
    // 5-clear cart depend on cardid
    await cartModel.findByIdAndDelete(cartId);
  }
  

}


// this webhook will run when stripe payment success paid
// post checkout session from stripe and send it as response
// /webhook-checkout
exports.webhookCheckout= asyncHandler(async (req, res, next) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
     return res.status(400).send(`Webhook Error: ${err.message}`);
   
  }
  if (event.type ==='checkout.session.completed'){
    //create order

    createCardOrder(event.data.object)

    res.status(200).json({ received: true});
  }
})