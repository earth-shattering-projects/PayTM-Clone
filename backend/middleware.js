const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleWare = (req, res, next) => {
  const tokenString = req.headers.authorization;
  if (tokenString) {
    if (!tokenString.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const token = tokenString.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid token" });
    }
  } else {
    return res.status(403).json({ message: "Authorization header not found" });
  }
};

module.exports = {
  authMiddleWare,
};
