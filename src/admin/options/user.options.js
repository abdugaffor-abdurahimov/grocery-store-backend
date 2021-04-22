const AdminBro = require("admin-bro");
const User = require("../../models/userModel");

const canModifyUsers = ({ currentAdmin }) =>
  currentAdmin && currentAdmin.role === "admin";

/**@type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    password: {
      type: "password",
    },

    googleId: {
      isVisible: false,
    },
  },

  actions: {
    edit: { isAccessible: canModifyUsers },
    delete: { isAccessible: canModifyUsers },
    new: { isAccessible: canModifyUsers },
  },
};

module.exports = { options, resource: User };
