
let currentPage = 1;
let currentCategory = null;

function renderUserDashboard(username) {
  currentPage = 1;
  currentCategory = null;
  render(`
    <div class="main-container">
      <div class="glossy-container">
        <div class="header">
          <h2>Welcome, ${username}!</h2>
          <button onclick="handleLogout()">Logout</button> 
        </div>
        <div class="navigation-section">
          <button onclick="handleClick(this.value)" value="business">Business</button>
          <button onclick="handleClick(this.value)" value="entertainment">Entertainment</button>
          <button onclick="handleClick(this.value)" value="general">General</button>
          <button onclick="handleClick(this.value)" value="health">Health</button>
          <button onclick="handleClick(this.value)" value="science">Science</button>
          <button onclick="handleClick(this.value)" value="sports">Sports</button>
          <button onclick="handleClick(this.value)" value="technology">Technology</button>
        </div>
        <div id="content" class="data-container">
          <div class="empty-state">Select a category</div>
        </div>
        <div class="navigation-section">
          <button onclick="moreFetch()">Next Article</button>
        </div>
      </div>
    </div>
  `);
}

// Handle category button clicks
async function handleClick(category) {
  currentCategory = category;
  currentPage = 1;
  const res = await fetch('/api/fetch-category-news', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category })
  });
  const data = await res.json();
  displayArticle(data.article);
}

// Handle "Next" button clicks
async function moreFetch() {
  currentPage++;
  const res = await fetch('/api/fetch-category-news', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      category: currentCategory,
      page: currentPage 
    })
  });
  const data = await res.json();
  if (data.article) displayArticle(data.article);
  else currentPage--;
}

// Helper function to display an article
function displayArticle(article) {
  document.getElementById('content').innerHTML = `
    <div class="data-item">
      ${article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">` : ''}
      <h3>${article.title}</h3>
      <p>${article.description}</p>
      <p><strong>Source:</strong> ${article.source}</p>
      ${article.url ? `<p><a href="${article.url}" target="_blank">Read full article</a></p>` : ''}
      <p><small>Published: ${new Date(article.publishedAt).toLocaleString()}</small></p>
    </div>
  `;
}
