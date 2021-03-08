const express = require("express");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
const mongoose = require("mongoose");

const { PORT, FE_URL, MONGODB_URL, NODE_ENV } = process.env;

const app = express();

app.use(express.json());

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
    if (NODE_ENV == "production") {
      console.log("🚀 Server is running on CLOUD on PORT: ", PORT);
    } else {
      console.log("🚀 Server is running LOCALLY on PORT: ", PORT);
    }
    console.log(listEndpoints(app));
  })
  .catch((e) => {
    console.log("MONGODB_URL", MONGODB_URL);
    console.log(`❌ DB connection error: ${e}`);
  });
