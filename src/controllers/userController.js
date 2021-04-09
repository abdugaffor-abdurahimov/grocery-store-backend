const UserModel = require("../models/userModel");
const csv = require("../utils/csv");

const controller = {};

controller.download = async (req, res, next) => {
  try {
    const fields = [
      {
        label: "Name",
        value: "name",
      },
      {
        label: "Price",
        value: "price",
      },
      {
        label: "Description",
        value: "description",
      },
      {
        label: "Category",
        value: "category",
      },
      {
        label: "Amount",
        value: "amount",
      },
    ];

    const { cart } = await UserModel.findById(req.params.userId)
      .populate({
        path: "cart.product",
      })
      .lean();

    const data = cart.map((item) => ({ amount: item.amount, ...item.product }));

    return csv(res, "card.csv", fields, data);
  } catch (error) {
    next(error);
  }
};

module.exports = controller;
