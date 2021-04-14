const AdminBro = require("admin-bro");
const { buildAuthenticatedRouter } = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const User = require("./options/user.options");
const Product = require("./options/product.options");

AdminBro.registerAdapter(AdminBroMongoose);

const AdminBroOptions = {
  resources: [Product, User],
  dashboard: {
    handler: async () => {
      return { some: "USER DATA" };
    },
    component: AdminBro.bundle("./components/Dashboard"),
  },
  branding: {
    companyName: "Grocery store",
  },
};

const adminBro = new AdminBro(AdminBroOptions);

const adminRouter = buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    const user = await UserModel.findOne({ email });

    if (user) {
      const matched = await bcrypt.compare(password, user.password);

      if (matched) {
        return user;
      }
    }

    return false;
  },
  cookiePassword: "pass",
});

module.exports = adminRouter;
