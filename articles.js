const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  publishedAt: { type: Date, required: true },
  source: { type: String, required: true },
});

const Article = mongoose.model("Article", artileSchema);

module.exports = Article;
