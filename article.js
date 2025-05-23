const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  url: { type: String },
  urlToImage: { type: String },
  publishedAt: { type: Date },
  source: { type: String },
  category: { type: String }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
