import { Auth } from "two-step-auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DbConnect from "../../Server/Config/DataBase_Config";
import User from "../../Server/models/User";

const register = async (req, res) => {
  try {
    await DbConnect();

    const tempUser = await User.find({ emailId: req.body.emailId });
    if (tempUser[0]) {
      return res.send("Email Id Exist!");
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      emailId: req.body.emailId,
      password: hashPassword,
      otp: "",
    };

    const data = await Auth(req.body.emailId, "Arime");
    newUser.otp = data.OTP;

    const accessToken = jwt.sign(newUser, process.env.JWT_SECRET);

    return res.status(200).send({ accessToken });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

export default register;
