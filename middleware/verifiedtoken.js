const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  console.log("Authorization Header:", bearerHeader);

  if (!bearerHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = bearerHeader.split(" ")[1];
  console.log("Extracted Token:", token);
  console.log("JWT Secret:", process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;