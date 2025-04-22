# Project_News_WebApp

The application follows a standard client-server architecture:

Backend: A Node.js server built with the Express framework. It handles API requests, business logic, user authentication, interaction with the MongoDB database (via Mongoose), and fetching news articles from the external NewsAPI.org service.
 
Frontend: A single-page application (SPA) structure implemented using vanilla JavaScript, HTML, and CSS. The frontend interacts with the backend via RESTful API calls (fetch) to retrieve data and trigger actions.

Database: MongoDB is used as the database. It stores user credentials and cached news articles.
 
External API: NewsAPI.org is used to fetch current news headlines.

Directories:

1 ├── .gitignore             # Specifies intentionally untracked files (node_modules, .env)
2 ├── README.md              # Project description, goals, and context
3 ├── admin.js               # Frontend logic JS 
4 ├── app.js                 # Frontend JS for initial application setup and home view
5 ├── article.js             # Backend Mongoose schema definition for Articles
6 ├── auth.js                # Frontend JS for Login/Signup UI and logic
7 ├── dashboard.js           # Frontend JS for User Dashboard UI and logic
8 ├── index.css              # CSS styles for the application
9 ├── index.html             # Main HTML file (entry point for the frontend)
10|── package-lock.json      # Records exact versions of dependencies
11├── package.json           # Project metadata and dependencies
12├── server.js              # Backend server setup, API endpoints, and logic
15├── ui.js                  # Frontend utility function for rendering HTML content
16└── user.js                # Backend Mongoose schema definition for Users


Setup and Configuration

Node.js and npm installed.
MongoDB server running or access to a MongoDB Atlas instance.
An API key from NewsAPI.org.

Installation:
1. Clone the repository.
2. Navigate to the project directory in your terminal.
3. Install dependencies: npm install

Configuration:
1.Create a .env file in the root of the project directory.
2.Add the following environment variables to the .env file:
 
dotenv:
MONGODB_URI=your_mongodb_connection_string 
NEWSAPI_KEY=your_newsapi_org_api_key 

Note: Replace your_mongodb_connection_string with your actual MongoDB connection string.
Replace your_newsapi_org_api_key with your key from NewsAPI.org.
 
Running the Application:

Start the server:

node server.js

Open your web browser and navigate to http://localhost:5000


###Resources:
https://mongoosejs.com/docs/guide.html
https://mongoosejs.com/docs/queries.html


https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener


AI referred for pagination logic as it is free API it quickly within 3 fetch finishes the quota so in order to control and manage so i can use it for maximum time




 





























































































1. Recently, Trust over news agencies has seen a drop due to n number of reasons.
2. This has resulted in losing faith over these agencies that were supposed to inform and educate civilians and hence the revenue drop
3. Current gap is widening slowly and with new upcoming generation it will increase even more i think as more people are switching to social media platform for their news sources
4. A major issue lies in the current structure of news websites, where users are bombarded with an overwhelming amount of content, much of which is driven by the interests of the agencies themselves, often dictated by funding, sponsors, or advertisers  --> civilians do not want that
5. This creates a sense of distrust and detachment among readers.
6. Hence new generation is switching to social platforms but mostly are unaware there is an issue to content manipulation, algorithmic manipulation and pushing content based on engagement
7. This is even Worse than traiditional news agencies -> This increases the rate of creating echo chambers and polarization of public opinion -> leaving up with fragmented society .
8. so civilians are kinda stuck in middle and are their opinions are being played upon rather what civilian want i.e crystal clear news with authenticity / responsibiltity
# Business_solution
points of requirment: switching resonsibility to article writers and they would be face of news agencies and not the news agencies itself.
I propose the creation of a news web app that woud be a spin version of news agencies in the realm of social media targeting new generation than than the traditional model of news delivery. The platform will be a hybrid of social media engagement and responsible journalism, focusing on article writers (independent journalists, reporters, and subject matter experts) rather than traditional news agencies. Writers will create and submit articles directly to the platform, bypassing the need for intermediary news agencies.

## The core objective is to solve key problems faced by today's news agencies ecosystem:
Restoring Trust in News agencies :
how? -> what do people do on social media like Twitter/X ? 
They follow their favorite people within their interested topics.
:::By focusing on individual article writers, the platform can provide more transparent, unbiased, and trustworthy reporting. Users will have a clearer understanding of who is writing the news and can choose to follow writers they trust.
:::
These writers will have a liscence/ tag from news agencies

2. Honestly this will also reduce information overload over users
3. there is a growing Demand for Ethical, Independent News
.
.
conclude: This platform represents a refreshing shift from the traditional, corporate-dominated news ecosystem to one that empowers individual writers and restores trust in the news cycle

![Untitled Diagram](https://github.com/user-attachments/assets/687e9a07-616f-4293-80ce-68cf7d065f0a)
API: [NewsAPI.org]

