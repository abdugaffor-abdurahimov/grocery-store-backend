const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Dried Fruits", "Canned GoodsView"],
  },
  userId: { type: Schema.Types.ObjectId, ref: "users" },
});

ProductSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  delete userObj.__v;
  delete userObj.userId;

  return userObj;
};

const UserModel = model("Product", ProductSchema);

module.exports = UserModel;
