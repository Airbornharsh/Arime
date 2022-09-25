import User from "../../../Server/models/User";
import jwt from "jsonwebtoken";
import DbConnect from "../../../Server/Config/DataBase_Config";

const verify = async (req, res) => {
  try {
    await DbConnect();

    if (!req.body.accessToken) return res.sendStatus(401);

    let tempUser;
    let tempErr;

    jwt.verify(req.body.accessToken, process.env.JWT_SECRET, (err, temp) => {
      tempUser = temp;
      tempErr = err;
    });

    if (tempErr) return res.send(tempErr.message);

    if (req.body.otp !== tempUser.otp.toString()) return res.send("Wrong Otp");

    const newUser = new User({
      emailId: tempUser.emailId,
      password: tempUser.password,
    });

    const data = await newUser.save();
    res.status(200).send(data);
  } catch (e) {
    return res.status(500).send(e);
  }
};

export default verify;
