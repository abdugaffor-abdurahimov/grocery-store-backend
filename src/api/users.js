const Authorization = require("../middlewares/Authorization");
const UserModel = require("../models/userModel");
const { verifyToken, getTokenPairs } = require("../utils");
const q2m = require("query-to-mongo");
const CartModel = require("../models/cartModel");
const router = require("express").Router();

router.post("/register", async (req, res, next) => {
  try {
    const { _id } = await UserModel.create(req.body);
    res.send(_id);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findByCredentials(email, password);
    if (!user) {
      const error = new Error("Invalid password or email");
      error.httpStatusCode = 404;
      throw error;
    }

    const tokenPairs = await getTokenPairs(user);
    res.send(tokenPairs);
  } catch (error) {
    next(error);
  }
});

router.get("/refreshToken", async (req, res, next) => {
  try {
    // const refreshToken = req.body.refreshToken;
    const refreshToken = req.header("Authorization").replace("Bearer ", "");

    if (!refreshToken) {
      const err = new Error("Refresh Token Misiing");
      err.httpStatusCode = 403;
      throw err;
    }

    const decoded = await verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await UserModel.findById(decoded._id);

    const newTokens = await getTokenPairs(user);

    res.send(newTokens);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/me", Authorization, async (req, res, next) => {
  try {
    const carts = await CartModel.find({ userId: req.user._id });
    res.send({ user: req.user, carts: carts });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const query = q2m(req.query);
    const total = await UserModel.countDocuments(query.criteria);

    const users = await UserModel.find(query.criteria)
      .skip(query.options.skip)
      .limit(query.options.limit);

    res.send({ next: query.links("", total), data: users });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
