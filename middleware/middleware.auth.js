import jwt from "jsonwebtoken";
import UserModel from "../models/models.user.js";
import { secrets } from "../config/config.config.js";

export const protect = (roles) => async (req, res, next) => {
  //check if token is passed
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //verify token then assign req.user
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, secrets.JWT_SECRET);
      req.user = await UserModel.findById(decoded.id)
        .select("-User_Password")
        .populate("User_Role_ID");

      if (req.body) {
        req.body = { ...req.body, creator: req.user };
      }

      const role = req.user.User_Role_ID.role_name;
      console.log(
        `User -> ${req.user.User_First_Name} // Role -> ${role}. Checking access...`
          .yellow
      );

      //then check if user role is allowed
      // if admin
      if (role === "admin") {
        console.log("[Access granted] Uyu ni mkubwa. Acha aende...".green);
        return next();
      } else {
        // if roles isn't passed at all
        if (!roles) {
          console.log(
            `[Access Denied] No one is allowed to access this route`.red
          );
          return res.status(401).send({
            message: "No one is allowed to access this route",
          });
        }

        // if user is given access to this route
        if (roles.includes(role)) {
          console.log(
            `[Access Granted] You are allowed as a ${role}. Moving on...`.green
          );
          return next();
        } else {
          // if user is not given access to this route
          console.log(
            `[Access Denied] You, as a ${role}, do not have the access to this route.`
              .red
          );
          return res.status(401).send({
            message: "You do not have the access to this route",
          });
        }
      }
    } catch (error) {
      //token verification failed
      console.log(`[Access Denied] An error occured\n ${error.message}`.red);
      return res.status(401).send({
        message: "Not authorized, an error occured while checking access",
        error: error.message,
      });
    }
  } else {
    // bearer token wasn't passed at all
    console.log(`[Access Denied] You need to login to access this route`.red);
    return res.status(401).send({
      message: "You need to login to access this route",
    });
  }
};

export const verify = async (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //verify token then assign req.user
    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, secrets.JWT_SECRET);
      //token verified
      res.status(204).send();
    } catch (error) {
      //token verification failed
      console.log(
        `[Verification Failed] An error occured\n ${error.message}`.red
      );
      return res.status(401).send({
        message: "Verification Failed, an error occured while checking access",
        error: error.message,
      });
    }
  } else {
    // bearer token wasn't passed at all
    console.log(`[Access Denied] Verification failed`.red);
    return res.status(401).send({
      message: "Verification failed",
    });
  }
};
