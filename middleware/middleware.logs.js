import LogsModel from "../models/models.Logs.js";

export const AddLog = async (req, res, next) => {
  const userIsLoggedIn = req.hasOwnProperty("user");
  let Logging_IP = req.headers["x-real-ip"] || req.connection.remoteAddress;
  Logging_IP = Logging_IP.split(":")[3];
  if (Logging_IP === undefined) {
    Logging_IP = req.headers["x-real-ip"] || req.connection.remoteAddress;
  }
  const log = await LogsModel.create({
    Logging_Endpoint: req.originalUrl,
    Logging_IP,
    Logging_Useragent: req.headers["user-agent"]
      ? req.headers["user-agent"]
      : "Not Defined",
    Logging_Request_Method: req.method,
  });
  if (userIsLoggedIn) {
    log.User_ID = req.user?.id;
    await log.save();
  }
  next();
};
