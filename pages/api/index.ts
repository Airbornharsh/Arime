import DbConnect from "../../Server/Config/DataBase_Config";

const api = async (req, res) => {
  DbConnect();
  res.status(200).send("Hello World");
};

export default api;
