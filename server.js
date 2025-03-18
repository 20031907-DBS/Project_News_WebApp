const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Article = require("./article");
//html embedding
const path = require("path");
//
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.error("could not connect to MongoDB===========...>>>>");
    console.error(err);
    process.exit(1);
  });

//added html file to route /  GET version 10
// app.get("/", (req, res) => {
//   res.send("Hello from your new API");
// });
app.get("/", (res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
    console.log("Arctile found routed to /articles");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not retrieve articles" });
  }
});

app.post("/fetch-and-save-news", async (res) => {
  try {
    const apiKey = process.env.NEWSAPI_KEY; // Make sure you have this in your .env file
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const testing = [];

    if (data.status === "ok") {
      const articles = data.articles;
      for (const articleData of articles) {
        const { title, description, url, publishedAt, source } = articleData;
        const article = new Article({
          title,
          description,
          url,
          publishedAt,
          source: source.name, // Use the name from the source object
        });
        await article.save();
        testing.push(article);
      }
      res.json({
        message:
          "News fetched and saved successfully! ======>======>======>======>",
        counthowmanygotadded: testing.length,
      });
      console.log(testing.length);
    } else {
      res.status(500).json({ error: "Failed to fetch news from NewsAPI.org" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});
//part of deletion
app.delete("/delete-data-1day-old", async (res) => {
  const flushdata = new Date();
  flushdata.setDate(flushdata.getHours() - 2);

  try {
    const del = await Article.deleteMany({ publishedAt: { $lt: flushdata } });
    console.log(
      "deleted data 2 hour ago : here is the deleted data count",
      del.deletedCount
    );
    res.json({
      message: "deleted data 2 hour ago : here is the deleted data count",
      deletedCount: del.deletedCount,
    });
  } catch (err) {
    console.log("error deleting the data", err);
  }
  //
});
