const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  comments: {
    type: Array,
    default: []
  },
  commentcount: {
    type: Number,
    default: 0
  }
});



module.exports = model("book", BookSchema);