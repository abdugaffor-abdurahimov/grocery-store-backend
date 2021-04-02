const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const UserModel = require("../models/userModel");
const ProductModel = require("../models/productModel");

AdminBro.registerAdapter(AdminBroMongoose);

const AdminBroOptions = {
  resources: [ProductModel, UserModel],
};

const adminBro = new AdminBro(AdminBroOptions);
const adminRouter = AdminBroExpress.buildRouter(adminBro);

module.exports = adminRouter;
