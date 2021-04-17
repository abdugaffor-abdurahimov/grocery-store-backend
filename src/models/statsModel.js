const { Schema, model } = require("mongoose");

const StatsSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    amount: { type: Number },
  },
  { timestamps: true }
);

const StatsModel = model("Stats", StatsSchema);

module.exports = StatsModel;
