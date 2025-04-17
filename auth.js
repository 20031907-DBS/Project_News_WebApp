function renderLogin() {
  render(`
    <div class="main-container">
      <div class="glossy-container">
        <div class="header">
          <h2>Login</h2>
          <button onclick="renderHome()">Back</button>
        </div>
        <form onsubmit="handleLogin(event)">
          <input type="email" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  `);
}

function renderSignup() {
  render(`
    <div class="main-container">
      <div class="glossy-container">
        <div class="header">
          <h2>Sign Up</h2>
          <button onclick="renderHome()">Back</button>
        </div>
        <form onsubmit="handleSignup(event)">
          <input type="email" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  `);
}

async function handleSignup(event) {
  event.preventDefault(); //preventing page from refreshing as default behavior is to refresh once submit button is clicked
  const form = event.target;
  await fetch("/api/signup", {method: "POST",headers: { "Content-Type": "application/json" },body: JSON.stringify({ username: form.username.value, password: form.password.value })});
  renderHome();
}

async function handleLogin(event) {
  event.preventDefault(); //preventing page from refreshing as default behavior is to refresh once submit button is clicked
  const form = event.target;
  const res = await fetch("/api/login", {method: "POST",headers: { "Content-Type": "application/json" },body: JSON.stringify({ username: form.username.value, password: form.password.value })});
  const data = await res.json();
  data.isAdmin ? renderAdmin() : renderUserDashboard(data.user.username);
}

const handleLogout = () => renderHome(); 