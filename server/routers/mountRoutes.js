const userRouter = require("./users.Route");
const authRouter = require("./auth.Route");
const categoryRouter = require("./categoryRouter");
const subcategoryRouter = require("./subcategoryRouter");
const brandRouter = require("./brandRouter");
const productRouter = require("./productRouter");
const reviewRouter = require("./reviewRouter");
const wishRouter = require("./wishRout");
const addressRouter = require("./adressesRout");
const couponRouter = require("./couponRouter");
const ordertRouter = require("./orderRoute");
const cartRouter = require("./cartRouter");
const carouselRouter = require("./carouselRouter");











exports.MountRoutes=(app)=>{
    // Routes

app.use("/api/users", userRouter);
app.use("/api/users/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/subcategory", subcategoryRouter);
app.use("/api/brands", brandRouter);
app.use("/api/products", productRouter);
app.use("/api/review", reviewRouter);
app.use("/api/wishlist", wishRouter);
app.use("/api/addresses", addressRouter);
app.use("/api/coupons", couponRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordertRouter);
app.use("/api/carousel", carouselRouter);
}