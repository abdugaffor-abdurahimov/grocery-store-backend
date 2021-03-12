const { verifyToken } = require("../utils");
const UserModel = require("../models/userModel");

const userAuth = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization").replace("Bearer ", "");

    const decoded = await verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await UserModel.findById(decoded._id);

    if (!user) throw new Error("Authorization failed");

    req.user = user;
    req.token = accessToken;
    next();
  } catch (error) {
    next(error);
  }
};
