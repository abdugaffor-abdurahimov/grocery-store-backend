const express = require("express");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
const mongoose = require("mongoose");
const api = require("./api");

const { PORT, FE_URL, MONGODB_URL, NODE_ENV } = process.env;

const app = express();

const whitelist = [FE_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("NOT ALLOWED - CORS ISSUES"));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", api);

// Error handlers
// require("./middlewares/errorHandlers")(app);

mongoose
  .connect(MONGODB_URL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      if (NODE_ENV == "production") {
        console.log("Server is running 🚀 on  CLOUD on  PORT: ", PORT);
      } else {
        console.log(
          `Server is running 🚀 LOCALLY  on url : http://localhost:${PORT}`
        );
      }
      console.log(listEndpoints(app));
    });
  })
  .catch((e) => {
    console.log(`❌ DB connection error: ${e}`);
  });
