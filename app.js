const app = document.getElementById("app");

function renderSignup() {
  app.innerHTML = `
    <h2>Signup</h2>
    <form id="signupForm">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Signup</button>
    </form>
    <p>Already have an account? <a href="#" id="goToLogin">Login here</a></p>
  `;
}

function renderLogin() {
  app.innerHTML = `
    <h2>Login</h2>
    <form id="loginForm">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <a href="#" id="goToSignup">Signup here</a></p>
  `;
}

function renderWelcome(username) {
  app.innerHTML = `
    <h2>Welcome, ${username}</h2>
    <button id="logoutBtn">Logout</button>
  `;
}

renderSignup();
