const { verifyToken } = require("../utils");
const UserModel = require("../models/userModel");

const Authorization = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization").replace("Bearer ", "");

    // If accessToken is expired catch case handels error
    const decoded = await verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await UserModel.findOne({ _id: decoded._id }).populate({
      path: "cart.product",
      select: { name: 1, price: 1, images: 1 },
    });
    req.user = user;
    req.token = accessToken;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = Authorization;
