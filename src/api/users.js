const Authorization = require("../middlewares/Authorization");
const UserModel = require("../models/userModel");
const { verifyToken, getTokenPairs } = require("../utils");
const q2m = require("query-to-mongo");
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/payment", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    // const user = await UserModel.create(req.body);
    const user = new UserModel(req.body);

    // const customer = await stripe.customers.create({
    //   id: user._id,
    //   object: user.role,
    //   currency: "usd",
    //   description: "My First Test Customer (created for API docs)",
    //   discount: null,
    //   email: user.email,
    //   name: user.firstname,
    // });

    console.log(user);
    // res.send(user._id);
  } catch (error) {
    console.log(error.message);
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
    res.send(req.user);
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

router.post("/:userId/addToCart", async (req, res, next) => {
  try {
    const { cart } = await UserModel.findByIdAndUpdate(
      req.params.userId,
      {
        $push: { cart: req.body },
      },
      { new: true }
    ).populate({
      path: "cart.product",
      select: { name: 1, price: 1, images: 1 },
    });

    res.status(201).send(cart);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:userId/updateCartAmout/:productId", async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    const { cart } = await UserModel.findOneAndUpdate(
      { _id: userId, "cart.product": productId },
      { "cart.$.amount": req.body.amount },
      { new: true }
    ).populate({
      path: "cart.product",
      select: { name: 1, price: 1, images: 1 },
    });

    res.send(cart);
  } catch (error) {
    next(error);
  }
});

router.delete("/:userId/updateCart/:productId", async (req, res, next) => {
  try {
    const { cart } = await UserModel.findByIdAndUpdate(
      req.params.userId,
      {
        $pull: { cart: { product: req.params.productId } },
      },
      { new: true }
    ).populate({
      path: "cart.product",
      select: { name: 1, price: 1, images: 1 },
    });

    res.status(202).send(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
