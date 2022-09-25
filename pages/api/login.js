import User from "../../Server/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DbConnect from "../../Server/Config/DataBase_Config";

const Login = async (req, res) => {
  try {
    await DbConnect();

    const tempUser = await User.findOne({ emailId: req.body.emailId });
    if (!tempUser) {
      return res.status(400).send(`No Such ${req.body.emailId} Id Exist`);
    }

    const passwordSame = await bcrypt.compare(
      req.body.password,
      tempUser.password
    );

    if (!passwordSame) {
      return res.status(401).send("Wrong Password");
    }

    const authUser = { emailId: req.body.emailId };

    const accessToken = jwt.sign(authUser, process.env.JWT_SECRET);
    res.send({ accessToken });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = Login;
