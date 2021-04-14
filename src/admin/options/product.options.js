const AdminBro = require("admin-bro");
const ProductModel = require("../../models/productModel");

/**@type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    images: {
      components: {
        edit: AdminBro.bundle("../components/product-images.edit.tsx"),
        list: AdminBro.bundle("../components/product-images.list.tsx"),
      },
    },
  },

  actions: {
    new: {},
  },
};

module.exports = { options, resource: ProductModel };
