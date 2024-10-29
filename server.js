import fs from "fs";
import colors from "colors";
// database connection
import connectDB from "./config/config.db.js";
import { secrets } from "./config/config.config.js";
import { errorHandler } from "./middleware/middleware.errors.js";
import { notFound } from "./middleware/middleware.notFound.js";
import app from "./server.APIRoutes.js";
import bodyParser from "body-parser";
//connecting to db
connectDB().then(() => console.log("DB CONNECTED"));

//create the uploads folder if it doesnt exist
const dir = "./uploads";
if (!fs.existsSync(dir)) {
  console.log("uploads folder");
  fs.mkdirSync(dir);
}

app.use(errorHandler);
app.use(notFound);
app.use(bodyParser.json({ limit: "50mb" }));
const PORT = secrets.PORT || 5001;

// start server
app.listen(
  PORT,
  console.log(
    `Server running in ${secrets.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
