const app = document.getElementById("app");

function render(contentHtml) {
  app.innerHTML = contentHtml;
}

function renderHome() {
  render(
    `
        <h1> Welcome to Dashboard </h1>
        <button onclick="renderLogin()">Login</button>
        <button onclick="renderSignup()">Signup</button>
        <button onclick="renderAdmin()">Admin</button>
        `
  );
}

function renderLogin() {
  render(
    `
        <h2> Login </h2>
        <form onsubmit="handleLogin(event)">
            <input type="text" name="username" placeholder="username" required/><br>
            <input type="password" name="password" placeholder="Password" required/><br>
            <input type="submit">Login<br>
        </form> 
        <button onclick="renderHome()">Back</button>
        `
  );
}

function renderSignup() {
  render(
    `
        <h2>Signup</h2>
        <form onsubmit="handleSignup(event)"

        `
  );
}
