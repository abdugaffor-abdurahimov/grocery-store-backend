const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  text: { type: String, required: true },
  comment: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "admin" },
  rate: { type: Number, required: true },
});

CommentSchema.methods.toJSON = function () {
  const comment = this;
  const commentObj = comment.toObject();

  delete commentObj.__v;
  return commentObj;
};

const CommentModel = model("Comment", CommentSchema);

module.exports = CommentModel;
