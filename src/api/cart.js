const CartModel = require("../models/cartModel");
const router = require("express").Router();
const Authorization = require("../middlewares/Authorization");

router.post("/", Authorization, async (req, res, next) => {
  try {
    const { _id } = await CartModel.create(req.body);
    res.send(_id);
  } catch (error) {
    next(error);
  }
});

router.get("/", Authorization, async (req, res, next) => {
  try {
    const carts = await CartModel.find({ userId: req.user._id });
    res.send(carts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
