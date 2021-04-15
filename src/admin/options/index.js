const AdminBro = require("admin-bro");
const User = require("./user.options");
const Product = require("./product.options");

const AdminBroOptions = {
  resources: [Product, User],
  dashboard: {
    handler: async () => {
      return { some: "USER DATA" };
    },
    component: AdminBro.bundle("../components/Dashboard"),
  },
  branding: {
    companyName: "Grocery store",
  },
};

module.exports = AdminBroOptions;
