const userRouter = require("./users.Route");
const authRouter = require("./auth.Route");
const categoryRouter = require("./categoryRouter");
const brandRouter = require("./brandRouter");
const productRouter = require("./productRouter");

const wishRouter = require("./wishRout");

const couponRouter = require("./couponRouter");
const ordertRouter = require("./orderRoute");
const cartRouter = require("./cartRouter");
const carouselRouter = require("./carouselRouter");











exports.MountRoutes=(app)=>{
    // Routes

app.use("/api/users", userRouter);
app.use("/api/users/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/brands", brandRouter);
app.use("/api/products", productRouter);
app.use("/api/wishlist", wishRouter);
app.use("/api/coupons", couponRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordertRouter);
app.use("/api/carousel", carouselRouter);
}