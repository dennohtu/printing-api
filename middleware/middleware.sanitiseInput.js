export const sanitiseInput = (req, res, next) => {
  console.log("The req.method is ", req.method);
  if (req.method === "GET" || req.method === "DELETE") {
    console.log("This request doesnt need a body");
    next();
  } else {
    //Requests that need a body POST PUT
    if (Object.keys(req.body).length === 0) {
      console.log("the body is empty");
      return res.status(404).send({
        message: "Empty body",
      });
    } else {
      next();
    }
  }
};
