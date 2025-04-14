
// const Article = require("./articles");
// require("dotenv").config();

// const fetchAndSaveNews = async () => {
//   try {
//     const apikey = process.env.API_KEY;
//     const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apikey}`);
//     const data = await response.json();
    
//     if (data.status !== "ok") {
//       console.log(`Error fetching news:`, data.message || 'Unknown error');
//       return;
//     }
    
//     const articles = data.articles;

//     for (let article of articles) {
//       const { title, description, url, publishedAt, source } = article;
//       const newArticle = new Article({
//         title,
//         description,
//         url,
//         publishedAt: new Date(publishedAt),
//         source: source.name,
//       });

//       try {
//         await newArticle.save();
//         console.log(`Article saved: ${title}`);
//       } catch (error) {
//         console.error(`Error saving article ${title}:`, error.message);
//       }
//     }
//   } catch (error) {
//     console.error(`Error in fetchAndSaveNews:`, error.message);
//   }
// };

// module.exports = fetchAndSaveNews;
