import DbConnect from "../../Server/Config/DataBase_Config";
import authenticateToken from "../../Server/middleware/AuthenticateToken";
import User from "../../Server/models/User";

const addfav = async (req, res) => {
  try {
    const { AuthUser, Err } = await authenticateToken(req, res);

    if (Err === 401) return res.status(401);

    await DbConnect;

    const TempUser = await User.findOne({ emailId: AuthUser.emailId });

    // console.log(TempUser.favs);

    if (!TempUser) return res.status(401).send("No Account Exists");

    const isExist = TempUser.favs.filter((value, i) => {
      return TempUser.favs[i].animeId === req.body.animeId.toString();
    });
    if (isExist.length > 0) {
      return res.send("Already Exists");
    } else {
      TempUser.favs.push({
        animeId: req.body.animeId.toString(),
        addedAt: Date.now(),
      });
    }

    await User.findByIdAndUpdate(TempUser._id, { favs: [...TempUser.favs] });

    res.send("ok");
  } catch (e) {
    res.status(500).send(e);
  }
};

export default addfav;
