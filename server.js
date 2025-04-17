const fetch = require('node-fetch');
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const path = require("path");
const User = require("./user");
const Article = require("./article");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
const uri = process.env.MONGODB_URI;
app.use(express.static(path.join(__dirname)));
mongoose
  .connect(uri)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.error("could not connect to MongoDB", err.message);
    process.exit(true);
  });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
  //trigger initial page setup here
});

// create a route here to get article from api , save it to array
// trigger the refetching once array.length ==max is reached

// code fetching from testing waters branch..

/**SignUp */

async function handleSignUpserver(req, res) {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.json({ message: "User already exist" });
  }
  const user = new User({ username, password });
  await user.save();

  res.json({ message: "User Created", user });
}

/**login */

async function handleLoginserver(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  // This would make it secure as only person with access to server can know this password its amazons responsibilty afrer taht
  const admin_password = 'hardcodedAdminPass123';

  if (!user) {
    return res.status(401).json({ message: "user not found" });
  }
  
// Check if the provided password matches the one in the database
  if (user.password !== password) { return res.status(401).json({ message: "Invalid password" });}
// 
  let isAdmin = false;
  if (username === 'admin@newsapp.com') {
    if (password === admin_password) {
      isAdmin = true;
    }
  }
  //set status to 200 for client 
  res.status(200).json({ 
    message: "Login Successful", 
    user: { username: user.username, _id: user._id }, 
    isAdmin: isAdmin 
  });
}

async function handleInOutRoutes(req, res) {
  try {
    const users = await User.find({}, "username _id");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
}

async function handleUpdate(req, res) {
  try {
    const userId = req.params.id;
    const { username, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, password },
      { new: true }
    );
    res.json({ message: "User updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
}

async function handleDelete(req, res) {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
}

// Get total article count
app.get("/api/articles/count", async (req, res) => {
  try {
    const count = await Article.countDocuments({});
    res.json({ count });
  } catch (err) {
    console.error("Error counting articles:", err);
    res.status(500).json({ message: "Error counting articles" });
  }
});

// Get articles with pagination
async function handleArticles(req, res) {
  const { page = 1, pageSize = 10 } = req.query;
  const currentPage = parseInt(page);
  const limit = parseInt(pageSize);

  try {
    // Find articles for the current page
    const articles = await Article.find({}).sort({ publishedAt: -1 }).skip((currentPage - 1) * limit).limit(limit);
    res.json({ articles, page: currentPage, pageSize: limit });
  } catch (err) {
    console.error("Error fetching articles from DB:", err);
    res.status(500).json({ message: "Error fetching articles from database" });
  }
}

// Read - Route stays the same
app.get("/api/articles", handleArticles);

//delete single article
app.delete("/api/articles/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting article" });
  }
});

//reset database by deleting all records
app.delete("/api/articles", async (req, res) => {
  try {
    await Article.deleteMany({});
    res.json({ message: "All articles deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting all articles" });
  }
});

// Read
app.get("/api/users", handleInOutRoutes);

//Create
app.post("/api/signup", handleSignUpserver);
app.post("/api/login", handleLoginserver);

//Update
app.put("/api/users/:id", handleUpdate);

//Delete
app.delete("/api/users/:id", handleDelete);
/**simulating logout*/
app.post("/api/logout", (req, res) => {
  res.json({ message: "Logout Successful" });
});

async function fetchAndSaveArticles() {
  try {
    const apikey = process.env.NEWSAPI_KEY;
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apikey}`
    );
    const data = await response.json();

    if (data.status === "error") {
      console.error("NewsAPI error:", data.message);
      return;
    }

    // Save articles to database
    for (const article of data.articles) {
      const newArticle = new Article({
        title: article.title,
        description: article.description,
        url: article.url,
        publishedAt: new Date(article.publishedAt),
        source: article.source.name,
      });
      await newArticle.save();
    }

    console.log("Articles fetched and saved successfully");
  } catch (err) {
    console.error("Error fetching and saving articles:", err);
    throw err;
  }
}

// Add new endpoint to trigger article fetching
app.post("/api/fetch-articles", async (req, res) => {
  try {
    await fetchAndSaveArticles();
    res.json({ message: "Articles fetched and saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error fetching articles" });
  }
});

// --- NEW Endpoint for User Category Fetch --- 

const USER_CATEGORY_FETCH_COUNT = 5; // How many articles to fetch & save per category click

// Get articles by category with pagination
async function getArticlesFromDB(category, page, pageSize = 1) {
  return await Article.find({ category }).sort({ publishedAt: -1 }).skip((page - 1) * pageSize).limit(pageSize);
}

async function fetchAndSaveCategoryNews(category, page = 1) {
  // First try to get from database
  const dbArticles = await getArticlesFromDB(category, page);
  if (dbArticles.length > 0) {
    return dbArticles[0];
  }

  // If not in database, fetch from API
  const apikey = process.env.NEWSAPI_KEY;
  if (!apikey) {
    throw new Error("API key not configured on server.");
  }

  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${encodeURIComponent(category)}&pageSize=100&apiKey=${apikey}`;
  console.log("Fetching category from NewsAPI:", url);

  const newsApiResponse = await fetch(url);
  if (!newsApiResponse.ok) {
    const errorBody = await newsApiResponse.json().catch(() => ({ message: "Unknown API error" }));
    throw new Error(`NewsAPI Error: ${errorBody.message || newsApiResponse.statusText}`);
  }
  const newsApiData = await newsApiResponse.json();

  if (newsApiData.status === "error") {
    throw new Error(`NewsAPI Error: ${newsApiData.message}`);
  }

  const fetchedArticles = newsApiData.articles || [];
  console.log(`Fetched ${fetchedArticles.length} articles for ${category}`);

  if (fetchedArticles.length > 0) {
    const articlesToSave = fetchedArticles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: new Date(article.publishedAt),
      source: article.source?.name || 'N/A',
      category: category
    }));
    
    try {
      await Article.insertMany(articlesToSave, { ordered: false });
      console.log(`Saved ${articlesToSave.length} articles for ${category} to DB.`);
    } catch(dbError) {
      console.error(`Database error saving articles for ${category}:`, dbError);
    }
  }

  // Return requested page from database
  return (await getArticlesFromDB(category, page))[0] || null;
}

// Register the new POST route
app.post("/api/fetch-category-news", async (req, res) => {
  const { category, page = 1 } = req.body;
  if (!category) {
    return res.status(400).json({ message: "Category is required" });
  }

  try {
    const article = await fetchAndSaveCategoryNews(category, page);
    if (article) {
      res.json({ article }); 
    } else {
      res.json({ article: null, message: `No articles found for category: ${category}` });
    }
  } catch (err) {
    console.error(`Error in /api/fetch-category-news for ${category}:`, err);
    res.status(500).json({ message: err.message || "Error fetching category news" });
  }
});
