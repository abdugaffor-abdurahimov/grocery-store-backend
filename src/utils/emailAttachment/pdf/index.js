const { log } = require("console");
const ejs = require("ejs");
// const htmlPdf = require("html-pdf");
const path = require("path");
const UserModel = require("../../../models/userModel");

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

    const items = cart.map((item) => ({
      amount: item.amount,
      ...item.product,
      images: item.product.images[0],
    }));

    log(items[0].images);

    const html = await ejs.renderFile(pathname, {
      products: items,
    });

    return html;
  } catch (error) {
    console.log(error);
  }
};

module.exports = htmlToPdfBuffer;
