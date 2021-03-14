const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
  details: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      "Meat & SeafoodView",
      "Healthy Snacking",
      "Heat & Eat MealsView",
      "Easter Candy",
      "St. Patrick's Day SipsView",
      "Fresh Vegetables",
      "Fresh Fruit",
      "CheeseView",
      "Canned GoodsView",
    ],
  },
  userId: { type: Schema.Types.ObjectId, ref: "users" },
});

ProductSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  delete userObj.__v;

  return userObj;
};

const UserModel = model("Product", ProductSchema);

module.exports = UserModel;
