const router = require("express").Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../utils/swagger");

const userRoute = require("../api/users");
const productsRoute = require("./products");

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use("/users", userRoute);
router.use("/products", productsRoute);

module.exports = router;
