const fetch = require("node-fetch");
const Article = require("./articles");
require("dotenv").config();

const fetchANdSaveNews = async () => {
  console.log("inside fetchANdSaveNews");
  try {
    const apikey = process.env.API_KEY;
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apikey}`
    );
    const x = await response.json(); // parsing the html data into json
    console.log("got the response");
    if (x.status !== "ok") {
      //its how its defined in news api docs
      console.log(`Error fetching news`, x.message); //error also defined in docs
    }
    console.log("going to perform iteration");
    const articles = x.articles; //pulling array obj into our local
    for (let article of articles) {
      //iterating to push what we require into our article obj
      const { title, description, url, publishedAt, source } = article;
      const newArticle = new Article({
        title,
        description,
        url,
        publishedAt: new Date(publishedAt),
        source: source.name,
      });
      
      try {
        await newArticle.save(); //mongodb push
        console.log(`Article saved: ${title}`);
      } catch (error) {
        console.error(`Error saving article ${title}:`, error.message);
      }
    }
    console.log(`News Articles fetched and saved into mongodb`);
  } catch (error) {
    console.error(`Error in fetchANdSaveNews:`, error.message);
  }
};

module.exports = fetchANdSaveNews;
