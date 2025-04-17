// Main application initialization
function renderHome() {
  render(
    `
    <div class="main-container">
      <div class="glossy-container">
        <div class="header">
          <h1>Welcome to Dashboard</h1>
          <div class="navigation-section">
            <button onclick="renderLogin()">Login</button>
            <button onclick="renderSignup()">Signup</button>
          </div>
        </div>
      </div>
    </div>
    `
  );
}

// Initial load
renderHome();
