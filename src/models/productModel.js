const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Dried Fruits", "Canned GoodsView"],
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [
    {
      text: { type: String, required: true },
      comment: { type: String, required: true },
      user: { type: Schema.Types.ObjectId, ref: "User" },
      rate: { type: Number, required: true },
    },
  ],
});

ProductSchema.methods.toJSON = function () {
  const product = this;
  const productObj = product.toObject();

  productObj.comments.reverse();

  delete productObj.__v;
  delete productObj.userId;

  return productObj;
};

const ProductModel = model("Product", ProductSchema);

module.exports = ProductModel;
