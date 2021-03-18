const ProductModel = require("../models/productModel");
const q2m = require("query-to-mongo");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const { _id } = await ProductModel.create(req.body);
    res.send(_id);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const query = q2m(req.query);
    const total = await ProductModel.countDocuments(query.criteria);
    const data = await ProductModel.find(query.criteria)
      .skip(query.options.skip)
      .limit(query.options.limit);

    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await ProductModel.findById(req.params.id);
    if (user) res.send(user);

    res.status(404).send("Not Found");
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    await ProductModel.findByIdAndUpdate(req.params.id, req.body);
    res.send("UPDATED");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
