const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//const Article = require("./articles");
const path = require("path");
// const fetchAndSaveNews = require("./newsService");
//
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
const uri = process.env.MONGODB_URI;

// mongoose.connect(uri).then(() => {console.log("connected to MongoDB");}).catch((err) => 
//   {
//     console.error("could not connect to MongoDB");
//     process.exit(true);
//   }
// );

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});


app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, "index.html"));
  //trigger initial page setup here
});

//create a route here to get article from api , save it to array 
//trigger the refetching once array.length ==max is reached
app.get("/articles", async (req, res) => {
  try {
    const apikey = process.env.NEWSAPI_KEY;
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apikey}`);
    const data = await response.json();
    if (data.status !== "ok") 
      {
        console.log(`Error fetching news:`, data.message || 'Unknown error on 41th line of server.js');
        return;
      }
    let articleArray = [];
    articleArray = data.articles;
    console.log(articleArray);
    res.json(articleArray);
    
  } catch (err) {
    console.error(err);
  }
});

