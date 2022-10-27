import DbConnect from "../../Server/Config/DataBase_Config";
import authenticateToken from "../../Server/middleware/AuthenticateToken";
import User from "../../Server/models/User";

const VerifyUser = async (req, res) => {
  try {
    const { AuthUser, Err } = authenticateToken(req, res);

    if (Err === 401) return res.status(401);

    await DbConnect();
    const tempUser = await User.findOne({ emailId: AuthUser.emailId });

    if (tempUser) res.status(200).send({ isValid: true, User: tempUser });
    else res.status(200).send({ isValid: false, User: [] });
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = VerifyUser;
