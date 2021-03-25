const router = require("express").Router();

const userRoute = require("../api/users");
const productsRoute = require("./products");

router.use("/users", userRoute);
router.use("/products", productsRoute);

module.exports = router;
