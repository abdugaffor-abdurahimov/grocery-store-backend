const express = require("express");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
const mongoose = require("mongoose");
const api = require("./api");
const { PORT, FE_URL, MONGODB_URL, NODE_ENV, STRIPE_SECRET_KEY } = process.env;
const app = express();
const adminRouter = require("./admin/Admin.config");

const whitelist = [FE_URL];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("NOT ALLOWED BY CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", api);
app.use("/admin", adminRouter);

// Error handlers
require("./middlewares/errorHandlers")(app);

mongoose
  .connect(MONGODB_URL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(listEndpoints(app));
      if (NODE_ENV == "production") {
        console.log("Server is running 🚀 on  CLOUD on  PORT: ", PORT);
      } else {
        console.log(
          `Server is running 🚀 LOCALLY  on url : http://localhost:${PORT}`
        );
      }
    });
  })
  .catch((e) => {
    console.log(`❌ DB connection error: ${e}`);
  });
