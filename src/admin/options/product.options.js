const AdminBro = require("admin-bro");
const ProductModel = require("../../models/productModel");
const { cloudinary } = require("../../middlewares/cloudinary.config");

const canEditProduct = ({ currentAdmin, record }) => {
  return currentAdmin && currentAdmin.role === "admin";
};

/**@type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    images: {
      components: {
        list: AdminBro.bundle("../components/product/product-images.list.tsx"),
        edit: AdminBro.bundle("../components/product/upload-image.edit.tsx"),
        show: AdminBro.bundle("../components/product/product-image.show.tsx"),
      },
    },

    description: {
      components: {
        list: AdminBro.bundle(
          "../components/product/product-description.list.tsx"
        ),
      },
    },

    comments: {
      isVisible: false,
    },

    userId: {
      isVisible: false,
    },
  },

  actions: {
    new: {
      before: async (req) => {
        if (req.method === "post") {
          try {
            const { images, ...otherParams } = req.payload;
            const info = await cloudinary.uploader.upload(
              images.path,
              (err, result) => {
                return new Promise((resolve, reject) =>
                  result ? resolve(result) : reject(err)
                );
              }
            );

            const newProduct = await ProductModel.create({
              ...otherParams,
              images: [info.url],
            });

            return { ...req, payload: newProduct.toObject() };
          } catch (error) {
            console.log({ error });
          }
        }
      },
    },

    edit: { isAccessible: canEditProduct },
    delete: { isAccessible: canEditProduct },
    new: { isAccessible: canEditProduct },
  },
};

module.exports = { options, resource: ProductModel };
