const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("Access Denied");
    }
    // move secret to env
    const decode = jwt.verify(token, "secret");
    // decode the userid from token and add it to req object to use it in next function
    req.userId = decode.userId;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = { verifyAuth };
