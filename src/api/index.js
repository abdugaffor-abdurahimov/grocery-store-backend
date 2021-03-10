const router = require("express").Router();

const userRoute = require("../api/users");

router.use("/users", userRoute);

module.exports = router;
