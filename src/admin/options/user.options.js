const AdminBro = require("admin-bro");
const User = require("../../models/userModel");

/**@type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    password: {
      type: "password",
    },
  },
};

module.exports = { options, resource: User };
