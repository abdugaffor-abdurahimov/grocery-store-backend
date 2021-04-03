const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const UserModel = require("../models/userModel");
const ProductModel = require("../models/productModel");
const bcrypt = require("bcryptjs");
AdminBro.registerAdapter(AdminBroMongoose);

const AdminBroOptions = {
  resources: [ProductModel, UserModel],
  dashboard: {
    handler: async () => {
      return { some: "output" };
    },
    component: AdminBro.bundle("./components/Dashboard"),
  },
  branding: {
    companyName: "Grocery store",
  },
};

const adminBro = new AdminBro(AdminBroOptions);

const adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
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
