import { navigate, router } from "./router.js";
import { login, getSession, logout } from "./api.js";

const app = document.getElementById("app");

function bottomNav(active) {
  return `
  <nav>
    <div onclick="navigate('home')" class="${active === 'home' ? 'active' : ''}">
      <svg viewBox="0 0 24 24">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"/>
      </svg>
    </div>
    <div onclick="navigate('profile')" class="${active === 'profile' ? 'active' : ''}">
      <svg viewBox="0 0 24 24">
        <path d="M12 12a5 5 0 1 0-0.001-10.001A5 5 0 0 0 12 12zm0 2c-4.418 0-8 2.239-8 5v3h16v-3c0-2.761-3.582-5-8-5z"/>
      </svg>
    </div>
  </nav>
  `;
}

function renderLogin() {
  app.innerHTML = `
    <div class="card" style="margin: auto; margin-top: 100px;">
      <h2>BIEL Sky Ultra</h2>
      <input id="uid" placeholder="usuario.bsky.social" />
      <input id="pwd" type="password" placeholder="App Password" />
      <button onclick="handleLogin()" class="primary">Entrar</button>
    </div>
  `;
}

async function handleLogin() {
  const user = document.getElementById("uid").value;
  const pass = document.getElementById("pwd").value;
  try {
    await login(user, pass);
    navigate("home");
    render();
  } catch (e) {
    alert("Erro ao logar, confira credenciais.");
  }
}

function renderHome() {
  app.innerHTML = `
    <header>Home</header>
    <main>
      <div class="card">
        Bem-vindo ao BIEL Sky Ultra!
      </div>
    </main>
    ${bottomNav("home")}
  `;
}

function renderProfile() {
  const session = getSession();
  app.innerHTML = `
    <header>Perfil</header>
    <main>
      <div class="card">
        <h3>${session?.refreshJwt?.handle || "Usuário"}</h3>
        <button class="primary" onclick="handleLogout()">Sair</button>
      </div>
    </main>
    ${bottomNav("profile")}
  `;
}

function handleLogout() {
  logout();
  navigate("login");
  render();
}

export function render() {
  const route = router();
  const session = getSession();

  if (!session && route !== "login") {
    navigate("login");
    return renderLogin();
  }
  
  if (route === "login") return renderLogin();
  if (route === "home") return renderHome();
  if (route === "profile") return renderProfile();
}
