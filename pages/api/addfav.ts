import authenticateToken from "../../Server/middleware/AuthenticateToken";

const addfav = async (req, res) => {
  try {
    const { User, Err } = authenticateToken(req, res);

    if (Err === 401) return res.status(401);

    console.log(User);
    res.send(User);
  } catch (e) {
    res.status(500).send(e);
  }
};

export default addfav;
