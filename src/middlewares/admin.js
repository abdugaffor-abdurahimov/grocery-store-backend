const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const UserModel = require("../models/userModel");
const ProductModel = require("../models/productModel");

AdminBro.registerAdapter(AdminBroMongoose);

const AdminBroOptions = {
  resources: [UserModel, ProductModel],
};

const adminBro = new AdminBro(AdminBroOptions);
const adminRouter = AdminBroExpress.buildRouter(adminBro);

module.exports = adminRouter;
