import jwt from "jsonwebtoken";

const authenticateToken = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  let AuthUser, Err;

  if (!token) {
    Err = 401;
    return { Err, AuthUser };
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, authUser) => {
    if (err) Err = err;

    AuthUser = { ...authUser };
  });

  return { Err, AuthUser };
};

export default authenticateToken;
