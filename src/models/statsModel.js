const { Schema, model } = require("mongoose");

const StatsSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    amount: { type: Number },
  },
  { timestamps: true }
);

StatsSchema.methods.toJSON = function () {
  const stats = this;
  const statsObj = stats.toObject();

  delete statsObj.__v;
  delete statsObj.userId;

  return statsObj;
};

const StatsModel = model("Stats", StatsSchema);

module.exports = StatsModel;
