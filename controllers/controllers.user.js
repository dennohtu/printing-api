import mongoose from "mongoose";
import RoleModel from "../models/models.roles.js";
//models
import UserModel from "../models/models.user.js";
import cache from "memory-cache";
import { checkPasswordValidity } from "../utils/utils.passwordValidation.js";
import { generateToken } from "../utils/utils.generateJWTToken.js";
import { sendEmail } from "../utils/utils.sendEmails.js";
import { sendOTP } from "../utils/utils.sendOTP.js";

import { validateEmail } from "../utils/utils.validateIsEmail.js";
import { validatePhoneNumberFormate } from "../utils/utils.validateIsCorrectPhoneNumber.js";

import OrderPaymentModel from "../models/models.payment.order.js";

//seed new admin user to fresh db
export const seedAdmin = async () => {
  let num = await UserModel.find();

  if (num.length === 0) {
    let usr = {
      User_Phone: "254704534766",
      User_Email: "dennismureithi10@gmail.com",
      User_Password: "printing@1234",
    };

    await UserModel.create(usr);
  }
};
// @desc Register new user by creating a new account
// @route api/user/register
// @access public
export const registerNewUser = async (req, res) => {
  try {
    if (req.body) {
      // the expected input from the user
      let { User_Phone, User_Email, User_Role } = req.body;
      //    validate email
      const isEmailValid = await validateEmail(req.body.User_Email);
      if (!isEmailValid) {
        return res.status(403).send({
          message: "Invalid email format",
        });
      }

      //    validate phone number
      const isPhoneValid = await validatePhoneNumberFormate(
        req.body.User_Phone
      );
      if (!isPhoneValid) {
        return res.status(403).send({
          message: "Invalid Phone number format",
        });
      }

      //    validate password
      const isPasswordValid = await checkPasswordValidity(
        req.body.User_Password
      );
      if (isPasswordValid.length > 0) {
        return res.status(403).send({
          message:
            "Password must meet the following conditions : " +
            "Minimum 8 characters," +
            " One uppercase, " +
            "one lowercase, " +
            "2 digits," +
            "no spaces\n",
        });
      }

      // check if user with email or phone number exists
      const user_by_phone = await UserModel.find({ User_Phone });
      const user_by_email = await UserModel.find({ User_Email });
      if (user_by_phone.length === 0 && user_by_email.length === 0) {
        const getRoleID = await RoleModel.find({ role_name: User_Role });
        const getDefaultRole = await RoleModel.findOne({ role_name: "admin" });
        // const userMod = JSON.parse(JSON.stringify(req.body))
        let getPermsForRole;

        // default permissions for the role
        const createNewUser = await UserModel.create(req.body);

        //if user is a customer
        const token = generateToken(createNewUser._id);

        const newUser = await createNewUser.save();
        const updatedUser = JSON.parse(JSON.stringify(newUser));
        updatedUser["token"] = token;
        // send otp

        if (User_Role === "customer" && !req.user) {
          // for customers onboarding themselves
          await sendOTP(req.body.User_Email, User_Phone);
          await sendEmail(
            req.body.User_Email,
            "Congratulations you are in!",
            `Hello ${req.body.User_First_Name}, Welcome to Mex Printing! Your account has been successfully created`
          );
        }
        if (User_Role === "admin") {
          await sendEmail(
            req.body.User_Email,
            "Congratulations you are in! Mex Printing",
            `Hello ${req.body.User_First_Name}, Welcome to Mex Printing! Your account has been successfully created.\nLogin using password ${req.body.User_Password} and enjoy!`
          );
        }
        res.json(updatedUser);
      } else {
        return res.status(404).send({
          message: "User with this email or phone number already exists",
        });
      }
    }
  } catch (error) {
    console.error(
      `Error on registerNewUser function in the controller.user.js file : ${error.stack}`
        .red.underline.bold
    );
    res.status(404).send({
      message:
        "Something went wrong while trying to register you.Contact admin.",
      error: error.message,
    });
  }
};

// @desc Verify the users phone number by OTP
// @route api/user/checkOTPValid
// @access public
export const checkOTPValid = async (req, res) => {
  try {
    // enter phone number and receive OTP

    const { User_Phone, OTP } = req.body;

    if (req.body) {
      const isPhoneValid = await validatePhoneNumberFormate(User_Phone);
      if (!isPhoneValid) {
        return res.status(403).send({
          message: "Invalid Phone number format",
        });
      }
      //    verify OTP
      // method to get saved OTP code from memcache
      const otp_value = cache.get(User_Phone);
      if (OTP === otp_value) {
        res.json(true);
      } else {
        return res.status(403).send({
          message: "Code already expired",
        });
      }
    }
  } catch (error) {
    console.error(
      `Error on verifyPhoneNumber function in the controller.user.js file : ${error.message}`
        .red.underline.bold
    );

    return res.status(503).send({
      message: "Something went wrong contact admin",
      error: error.message,
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const usr = await UserModel.findOne(req.params.userID);
    if (usr) {
      await UserModel.updateOne(
        { _id: usr._id },
        {
          User_Verified: true,
        }
      );

      res.send({
        message: "User verified successfully",
      });
    } else {
      res.status(404).send({
        message: "Could not find a user with the provided id",
      });
    }
  } catch (e) {
    res.status(503).send({
      message: "Something happened when trying to verify details",
      error: e,
    });
  }
};

// @desc Login the user
// @route api/user/login
// @access public
export const loginUser = async (req, res) => {
  try {
    //  user phone and password for login
    const { User_Phone, User_Email, User_Password } = req.body;
    if (req.body) {
      //restrict providing both email and phone
      if (User_Phone && User_Email) {
        return res.status(403).send({
          message: "Provide either Phone number or Email, not both",
        });
      }

      //ensure email or phone isValid
      let isValid;
      if (User_Phone) {
        isValid = await validatePhoneNumberFormate(User_Phone);
      } else if (User_Email) {
        isValid = await validateEmail(User_Email);
      } else {
        return res.status(403).send({
          message: "Email or Phone Number is required",
        });
      }

      if (!isValid) {
        return res.status(403).send({
          message: "Invalid Phone number or email format",
        });
      }
      //check if phone or email exists on the db
      let existingUser;
      if (User_Phone) {
        existingUser = await UserModel.findOne({ User_Phone }).populate(
          "User_Role_ID"
        );
      } else if (User_Email) {
        existingUser = await UserModel.findOne({ User_Email }).populate(
          "User_Role_ID"
        );
      }

      if (existingUser && (await existingUser.matchPassword(User_Password))) {
        //login user if they exist and the passwords match
        const token = await generateToken(existingUser._id);
        const updatedUser = JSON.parse(JSON.stringify(existingUser));
        updatedUser["token"] = token;

        res.json(updatedUser);
      } else {
        return res.status(404).send({
          message: "Either the user doesnt exist or the password is incorrect",
        });
      }
    }
  } catch (error) {
    console.error(
      `Error on loginUser function in the controller.user.js file : ${error.message}`
        .red.underline.bold
    );
    console.log(error);
    return res.status(503).send({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// @desc send otp to the user
// @route api/user/sendOTPToPhoneNUmber
// @access public
export const sendOTPToPhoneNUmber = async (req, res) => {
  try {
    const { User_Phone, User_Email } = req.body;
    if (req.body) {
      //  make sure the phone number is validated
      const isPhoneValid = await validatePhoneNumberFormate(User_Phone);
      if (!isPhoneValid) {
        return res.status(403).send({
          message: "Invalid Phone number format",
        });
      }

      //    check if phone number exists on the db
      let checkUser;
      if (User_Phone)
        checkUser = await UserModel.findOne({
          User_Phone: User_Phone,
          active: true,
        });
      else
        checkUser = await UserModel.findOne({
          User_Email: User_Email,
          active: true,
        });
      console.log("checking if user exist", checkUser);
      if (checkUser) {
        if (await sendOTP(checkUser.User_Email, User_Phone)) {
          res.json(true);
        }
      } else {
        return res.status(403).send({
          message: "User with this phone number/ email does not exist",
        });
      }
    } else {
      return res.status(403).send({
        message: "No phone number/ email passed in request",
      });
    }
  } catch (error) {
    console.error(
      `Error on sendOTPToPhoneNUmber function in the controller.user.js file : ${error.message}`
        .red.underline.bold
    );
    console.log(error);
    return res.status(503).send({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// @desc reset password
// @route api/user/resetPassword/:token
// @access private
export const resetPassword = async (req, res) => {
  try {
    //    find the user calendar with the id
    const foundUser = await UserModel.find({
      _id: req.params.userID,
      active: true,
    }).populate("User_Role_ID");

    if (foundUser.length > 0) {
      res.json(foundUser);
    } else {
      res.status(403).send({
        message: "User not found",
      });
    }
  } catch (e) {
    console.error("Error while trying to read userr details", e);
    res.status(503).send({
      message: "Something went wrong while trying to read user. Contact admin",
      error: e,
    });
  }
};

// @desc update user password after reset password
// @route api/user/updateUserPassword/:token
// @access public

// export const updateUserDetails = async(req, res) => {

//     try{

//         let findUserID = await UserModel.findByIdAndUpdate( {_id: req.params.userID},{...req.body}).populate('User_Role_ID').populate("Permission_ID");
//         if(req.body.User_Password){
//             findUserID.User_Password = req.body.User_Password
//             findUserID = await findUserID.save()
//         }

//         if(findUserID){

//             res.json(findUserID)
//         }else{
//             res.status(403).send({
//                 message:"No records found"
//             })
//         }
//     }catch (e) {
//         console.error("Error while trying to update user details",e)
//         res.status(503).send({
//             message:"Something went wrong while trying to update user. Contact admin"
//             ,error:e
//         })
//     }
// }

// @desc Read user details
// @method GET
// @route api/user/readUserDetails/:userID
// @access private

export const readUserDetails = async (req, res) => {
  try {
    //    find the user calendar with the id
    const foundUser = await UserModel.find({
      _id: req.params.userID,
      active: true,
    }).populate("User_Role_ID");

    if (foundUser.length > 0) {
      res.json(foundUser);
    } else {
      res.status(403).send({
        message: "User not found",
      });
    }
  } catch (e) {
    console.error("Error while trying to read user details", e);
    res.status(503).send({
      message: "Something went wrong while trying to read user. Contact admin",
      error: e,
    });
  }
};

// @desc Read all users details
// @method GET
// @route api/user/readALlUserDetails
// @access private

export const readAllUserDetails = async (req, res) => {
  try {
    const queryList = req.query;
    //fill the role id

    req.query.User_Role;

    //  find the crop calendar with the id
    const foundUsers = await UserModel.find({
      ...queryList,
      active: true,
    }).populate("User_Role_ID");
    if (foundUsers.length > 0) {
      res.json(foundUsers);
    } else {
      res.status(403).send({
        message: "No records found",
      });
    }
  } catch (e) {
    console.error("Error while trying to get user details", e);

    res.status(503).send({
      message:
        "Something went wrong while trying to read all users. Contact admin",
      error: e,
    });
  }
};

// @desc update user details
// @route api/user/updateUser/:userID
// @access private

export const updateUserDetails = async (req, res) => {
  let us = req.body;

  try {
    let findUserID = await UserModel.findById(req.params.userID).populate(
      "User_Role_ID"
    );
    //update password
    if (req.body.User_Password) {
      const isPasswordValid = await checkPasswordValidity(
        req.body.User_Password
      );
      if (isPasswordValid.length > 0) {
        return res.status(403).send({
          message:
            "Password must meet the following conditions : " +
            "Minimum 8 characters," +
            " One uppercase, " +
            "one lowercase, " +
            "2 digits," +
            "no spaces\n",
        });
      }

      findUserID.User_Password = req.body.User_Password;
    }

    findUserID.User_First_Name = us.User_First_Name
      ? us.User_First_Name
      : findUserID.User_First_Name;
    findUserID.User_Last_Name = us.User_Last_Name
      ? us.User_Last_Name
      : findUserID.User_Last_Name;
    findUserID.User_Email = us.User_Email
      ? us.User_Email
      : findUserID.User_Email;
    findUserID.User_Phone = us.User_Phone
      ? us.User_Phone
      : findUserID.User_Phone;
    findUserID.User_Gender = us.User_Gender
      ? us.User_Gender
      : findUserID.User_Gender;
    findUserID.User_Passport_Photo = us.User_Passport_Photo
      ? us.User_Passport_Photo
      : findUserID.User_Passport_Photo;
    findUserID.User_Id_Card_Front = us.User_Id_Card_Front
      ? us.User_Id_Card_Front
      : findUserID.User_Id_Card_Front;
    findUserID.User_Id_Card_Back = us.User_Id_Card_Back
      ? us.User_Id_Card_Back
      : findUserID.User_Id_Card_Back;
    findUserID.User_KRA_Pin = us.User_KRA_Pin
      ? us.User_KRA_Pin
      : findUserID.User_KRA_Pin;
    findUserID.User_IsPhone_Validated = us.User_IsPhone_Validated
      ? us.User_IsPhone_Validated
      : findUserID.User_IsPhone_Validated;
    let role = await RoleModel.findOne({ role_name: us.User_Role });
    if (role) findUserID.User_Role_ID = role;
    findUserID = await findUserID.save();

    if (findUserID) {
      res.json(findUserID);
    } else {
      res.status(403).send({
        message: "No records found",
      });
    }
  } catch (e) {
    console.error("Error while trying to update user details", e);
    res.status(503).send({
      message:
        "Something went wrong while trying to update user. Contact admin",
      error: e,
    });
  }
};

// @desc deactivate user instead of delete from db
// @route api/user/deleteUser/:userID
// @access private

export const deleteUserDetails = async (req, res) => {
  try {
    const userID = req.params.userID;
    const findUserID = await UserModel.findOne({ _id: userID });

    const response = await findUserID.remove();
    console.log(res);
    res.json({ message: "deleted successfully" });
  } catch (e) {
    console.error("Error while trying to delete user", e);
    res.status(503).send({
      message: "Something went wrong while trying to delete the user",
      error: e,
    });
  }
};

// @desc deactivate user instead of delete from db
// @route api/user/deleteUser/:userID
// @access private

export const deleteManyUserDetails = async (req, res) => {
  try {
    const { userIDS } = req.body;

    console.log("the ids are ", userIDS, req.body);
    const deleteUsersByID = await UserModel.updateMany(
      { _id: { $in: userIDS } },
      {
        active: false,
      },
      {
        new: true,
        multi: true,
      }
    );

    res.json(true);
  } catch (e) {
    console.error("Error while trying to delete many", e);

    res.status(503).send({
      message: "Something went wrong while trying to delete many",
      error: e,
    });
  }
};

// @desc read all  orders for a user
// @route api/User/readOrderHistory/:UserID
// @access private
export const readOrderHistory = async (req, res) => {
  const orderId = req.params.Order_ID;
  try {
    const payments = await OrderPaymentModel.find({
      Order_ID: orderId,
      active: true,
    })
      .populate("Mpesa_ID")
      .populate("Order_ID");

    if (payments.length > 0) {
      res.send(payments);
    } else
      res.status(403).send({
        message: "No orders found for this user",
      });
  } catch (e) {
    console.error("Error occured while fetching order history for user", e);
    res.status(503).send({
      message:
        "An error occured while processing your request. Kindly Contact admin",
      error: e.message,
    });
  }
};
