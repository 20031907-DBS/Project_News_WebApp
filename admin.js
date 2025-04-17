// Main Admin Panel
function renderAdmin() {
  render(`
    <div class="main-container">
      <div class="glossy-container">
        <div class="header">
          <h2>Admin Panel</h2>
          <button onclick="renderHome()">Back</button>
        </div>
        <div class="data-container">
          <h3>Users</h3>
          <div id="userTable"></div>
        </div>
        <div class="data-container">
          <h3>Articles</h3>
          <button onclick="fetchAndSaveArticles()">Fetch Articles</button>
          <div id="articleTable"></div>
        </div>
      </div>
    </div>
  `);
  fetchUsers();
  fetchArticles();
}

// User Management Functions
async function fetchUsers() {
  const userTableDiv = document.getElementById("userTable");
  userTableDiv.innerHTML = '<div class="loading-state"><div class="spinner"></div></div>';
  
  try {
    const res = await fetch("/api/users");
    const users = await res.json();
    //here we got data from backend lets see what we can do with it
    userTableDiv.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${users.length ? users.map(user => `
            <tr>
              <td>${user?.username || ''}</td>
              <td class="action-buttons">
                <button onclick="editUser('${user?._id || ''}', '${user?.username || ''}')">Edit</button>
                <button onclick="deleteUser('${user?._id || ''}')">Delete</button>
              </td>
            </tr>
          `) : '<tr><td colspan="2">No users found</td></tr>'}
        </tbody>
      </table>
      <div class="navigation-section">
        <button onclick="renderAddUser()">Add User</button>
      </div>
    `;
  } catch (error) {
    userTableDiv.innerHTML = '<div class="empty-state">Error</div>';
  }
}

function renderAddUser() {
  render(`
    <div class="main-container">
      <div class="glossy-container">
        <div class="header">
          <h2>Add User</h2>
          <button onclick="renderAdmin()">Back</button>
        </div>
        <form onsubmit="handleAddUser(event)">
          <input type="email" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  `);
}

async function handleAddUser(event) {
  event.preventDefault();
  const form = event.target;
  await fetch("/api/signup", {method: "POST",headers: { "Content-Type": "application/json" },body: JSON.stringify({ username: form.username.value, password: form.password.value })});
  renderAdmin();
}

function editUser(userId, currentUsername) {
  render(`
    <div class="main-container">
      <div class="glossy-container">
        <div class="header">
          <h2>Edit User</h2>
          <button onclick="renderAdmin()">Back</button>
        </div>
        <form onsubmit="handleEditUser(event, '${userId}')">
          <input type="email" name="username" value="${currentUsername}" required />
          <input type="password" name="password" placeholder="New Password" required />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  `);
}

async function handleEditUser(event, userId) {
  event.preventDefault();
  const form = event.target;
  await fetch(`/api/users/${userId}`, {method: "PUT",headers: { "Content-Type": "application/json" },body: JSON.stringify({ username: form.username.value, password: form.password.value })});
  renderAdmin();
}

async function deleteUser(userId) {
  await fetch(`/api/users/${userId}`, {method: "DELETE"});
  renderAdmin();
}

// Article Management Functions
async function fetchArticles() {
  const articleTableDiv = document.getElementById("articleTable");
  articleTableDiv.innerHTML = '<div class="loading-state"><div class="spinner"></div></div>';
  try {
    const countRes = await fetch("/api/articles/count");
    const { count } = await countRes.json();
    const pageSize = 10;
    const totalPages = Math.ceil(count / pageSize);
    const allArticles = [];
    for (let page = 1; page <= totalPages; page++) {
      const res = await fetch(`/api/articles?page=${page}&pageSize=${pageSize}`);
      const data = await res.json();
      if (data.articles?.length) allArticles.push(...data.articles);
    }
    articleTableDiv.innerHTML = (`
      <table class="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Source</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${allArticles.length ? allArticles.map(article => `
            <tr>
              <td>${article?.title || ''}</td>
              <td>${article?.description || ''}</td>
              <td>${article?.source || ''}</td>
              <td class="action-buttons">
                ${article?.url ? `<a href="${article.url}" target="_blank">Read</a>` : ''}
                <button onclick="deleteArticle('${article?._id || ''}')">Delete</button>
              </td>
            </tr>
          `) : '<tr><td colspan="4">No articles found</td></tr>'}
        </tbody>
      </table>
      <div class="navigation-section">
        <button onclick="resetArticles()">Delete All</button>
      </div>
    `);
  } catch (error) {
    articleTableDiv.innerHTML = '<div class="empty-state">Error</div>';
  }
}

async function fetchAndSaveArticles() {
  await fetch("/api/fetch-articles", {method: "POST"});
  fetchArticles();
}

async function deleteArticle(id) {
  await fetch(`/api/articles/${id}`, {method: "DELETE"});
  fetchArticles();
}

async function resetArticles() {
  await fetch("/api/articles", {method: "DELETE"});
  fetchArticles();
} 