const { Schema, model } = require("mongoose");

const StatsSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    amount: { type: Number },
  },
  { timestamps: true }
);

StatsSchema.methods.toJSON = function () {
  const stats = this;
  const statsObj = stats.toObject();

  delete statsObj.__v;

  return statsObj;
};

const StatsModel = model("Stats", StatsSchema);

module.exports = StatsModel;
