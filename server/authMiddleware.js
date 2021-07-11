import pkg from "jsonwebtoken";

const { verify } = pkg;

const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  const { jwt_token } = req.cookies;

  if (!jwt_token) {
    console.log("No token found or invalid token");
    return next();
  }

  try {
    const data = verify(jwt_token, process.env.JWT_SECRET);
    req.id = data.id;
    console.log("data: ", data);
    return next();
  } catch {}
  next();
};

export default authMiddleware;
