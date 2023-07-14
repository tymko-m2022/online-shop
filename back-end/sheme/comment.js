const { Schema, model} = require('mongoose');

const commentSchema = new Schema({
  slug: { type: String, required: true },
  text: { type: String, required: true },
});

const CommentModel = model('Comment', commentSchema);

module.exports = CommentModel;