const router = require("express").Router();

const userRoute = require("../api/users");
const productsRoute = require("./products");
const cartRoute = require("./cart");

router.use("/users", userRoute);
router.use("/products", productsRoute);
router.use("/cart", cartRoute);

module.exports = router;
