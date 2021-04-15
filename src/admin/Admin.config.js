const AdminBro = require("admin-bro");
const { buildAuthenticatedRouter } = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const UserModel = require("../models/userModel");
const AdminBroOptions = require("./options");

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro(AdminBroOptions);

const adminRouter = buildAuthenticatedRouter(adminBro, {
  cookieName: "admin-bro",
  cookiePassword: "secret password",
  authenticate: async (email, password) => {
    const user = await UserModel.findByCredentials(email, password);
    return user;
  },
});

module.exports = adminRouter;
