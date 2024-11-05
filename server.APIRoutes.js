import * as serverImports from "./server.Imports.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import filter from "content-filter";
import { sanitiseInput } from "./middleware/middleware.sanitiseInput.js";
import rateLimit from "express-rate-limit";

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })
//

// initiate express
const app = express();
app.use(express.static("./uploads"));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
// Apply the rate limiting middleware to all requests
// app.use(limiter)

//filter content to prevent nosql injection
const blackList = ["$", "{", "&&", "||"];
const options = {
  urlBlackList: blackList,
  bodyBlackList: blackList,
};

app.use(filter(options));
app.use("/api/upload", serverImports.uploadRoutes);

//chekc if body contains something
app.use(sanitiseInput);

app.use("/api/user", serverImports.userRoutes);
app.use("/api/product", serverImports.ProductRoutes);

app.use("/api/lipanampesa", serverImports.LipaNaMpesaRoutes);
app.use("/api/SendEmails", serverImports.SendEmailsRoutes);
app.use("/api/ResetPassword", serverImports.ResetPasswordRoutes);
app.use("/api/marketplace/products", serverImports.MarketPlaceProductRoutes);
app.use("/api/marketplace/orders", serverImports.MarketPlaceOrderRoutes);

app.use("/api/user/wallet", serverImports.WalletTransactionRoutes);
app.use("/api/banners", serverImports.BannerRoutes);
app.use("/api/writeups", serverImports.WriteupRoutes);
app.use("/api/category", serverImports.CategoryRoutes);
export default app;
