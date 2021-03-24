const { Schema, model } = require("mongoose");

const CartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
  amount: { type: Number, required: true },
});

const CartModel = model("Cart", CartSchema);

module.exports = CartModel;
