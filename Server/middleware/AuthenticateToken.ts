import jwt from "jsonwebtoken";

const authenticateToken = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  let User, Err;

  if (!token) {
    Err = 401;
    return { Err, User };
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, authUser) => {
    if (err) Err = err;

    User = { ...authUser };
  });

  return { Err, User };
};

export default authenticateToken;
