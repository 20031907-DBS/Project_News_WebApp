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

let currentUser = null;

function setupEvents(){
const signupForm= document.getElementById('signupForm');
const loginForm= document.getElementById('loginForm');
const goToLogin= document.getElementById('goToLogin');
const goToSignup=document.getElementById('goToSignup');
const logoutBtn = document.getElementById('logoutBtn');

if(signupForm)
	{
		signupForm.addEventListener('submit', async (e)=>{
			e.preventDefault();
			const formData = new FormData(signupForm);
			const username = formData.get('username');
			const password = formData.get('password');
			
			try {
				const res = await fetch('http://localhost:5000/api/signup',{
					method:'POST',
					headers:{'Content-Type': 'application/json'},
					body: JSON.stringify({username,password})
				});

				const data = await res.json();
				if(res.ok)
				{
					currentUser = username;
					renderWelcome(currentUser);
					setupEvents();
				}else{
					alert(`Error: ${data.message || 'Something went wrong'}`);
				}
			} catch (error) {
				console.error('Signup error:', error);
				alert('Failed to connect to server. Please make sure the server is running.');
			}
		});
	}

	 if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(loginForm);
      const username = formData.get('username');
      const password = formData.get('password');

      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        currentUser = username;
        renderWelcome(currentUser);
        setupEvents();
      } else {
        alert(data.message);
      }
    });
  }

  if (goToLogin) {
    goToLogin.addEventListener('click', () => {
      renderLogin();
      setupEvents();
    });
  }

  if (goToSignup) {
    goToSignup.addEventListener('click', () => {
      renderSignup();
      setupEvents();
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await fetch('http://localhost:5000/api/logout', {
        method: 'POST'
      });

      currentUser = null;
      renderLogin();
      setupEvents();
    });
  }
}

setupEvents();


