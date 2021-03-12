const Authorization = require("../middlewares/Authorization");
const UserModel = require("../models/userModel");
const { getTokenPairs } = require("../utils");

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

router.get("/me", Authorization, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
