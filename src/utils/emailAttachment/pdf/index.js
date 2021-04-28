const ejs = require("ejs");
// const htmlPdf = require("html-pdf");
const path = require("path");
const UserModel = require("../../../models/userModel");
const StatsModel = require("../../../models/statsModel");

const htmlToPdfBuffer = async (userAddress) => {
  try {
    const pathname = path.join(__dirname + "/template.ejs");

    const { cart } = await UserModel.findOneAndUpdate(
      {
        email: userAddress,
      },
      { cart: [] }
    )
      .populate({
        path: "cart.product",
      })
      .lean();

    const items = [];
    cart.forEach(async (item) => {
      items.push({
        amount: item.amount,
        ...item.product,
        images: item.product.images[0],
      });

      // Saving data for feature improvements
      let product = await StatsModel.findOne({ productId: item.product._id });

      console.log({ product });

      if (!product) {
        product = await StatsModel.create({
          productId: item.product._id,
          amount: item.amount,
        });
      }

      await product.updateOne({ amount: product.amount + item.amount });
    });

    const html = await ejs.renderFile(pathname, {
      products: items,
    });

    return html;
  } catch (error) {
    console.log(error);
  }
};

module.exports = htmlToPdfBuffer;
