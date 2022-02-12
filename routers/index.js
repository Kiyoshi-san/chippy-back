import express from "express";
import path from "path";
import productRouter from "./productRouter.js";
import dotenv from "dotenv";
import userRouter from "./userRouter.js";
import categoryRouter from "./categoryRouter.js";
import orderRouter from "./orderRouter.js";
import uploadRouter from "./uploadRouter.js";
import cartRouter from "./cartRouter.js";

// ALLOWING process.env
dotenv.config();
const indexRouter = express();

// #######################################
// 3rd PARTY
// #######################################
// PAYPAL
indexRouter.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

// GOOGLE MAPS
indexRouter.get("/api/config/google", (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || "");
});

// #######################################
// ROUTES
// #######################################
// SERVER ROOT READY
indexRouter.get("/", (req, res) => {
  res.send("Server is ready");
});

// PRODUCTION - https://amazona-kiyoshi-app.herokuapp.com/
// We are serving the file inside the build folder in frontend folder
/* indexRouter.use(express.static(path.join(__dirname, "/frontend/build")));
// serving the index.html inside the build folder
indexRouter.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
); */

// UPLOAD IMAGE
const __dirname = path.resolve();
indexRouter.use("/api/uploads", uploadRouter);
indexRouter.use("/uploads", express.static(path.join(__dirname, "/uploads")));
indexRouter.use("/api/users", userRouter);
indexRouter.use("/api/categories", categoryRouter);
indexRouter.use("/api/products", productRouter);
indexRouter.use("/api/orders", orderRouter);
indexRouter.use("/api/cart", cartRouter);

export default indexRouter;
