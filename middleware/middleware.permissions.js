export const checkPermission = (req, res, next, roles) => {
  try {
    const role = req.user.User_Role_ID.role_name;
    if (role === "admin") {
      console.log("Uyu ni mkubwa. Acha aende...");
      return next();
    } else {
      if (!roles) {
        console.log("No auth required. Moving on...");
        return next();
      }
      if (roles.includes(role)) {
        console.log("You are allowed. Moving on...");
        return next();
      } else {
        res.status(401).send({
          message: "You do not have the permission to view this route",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error occured while authenticating you.",
      error: error.message,
    });
  }
};
