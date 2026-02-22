import { login, getSession, logout } from "./api.js";

const app = document.getElementById("app");

function navigate(route) {
  window.location.hash = route;
}

function getRoute() {
  return window.location.hash.replace("#", "") || "login";
}

function homeIcon() {
  return `
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"/>
    </svg>
  `;
}

function userIcon() {
  return `
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M12 12a5 5 0 1 0-0.001-10.001A5 5 0 0 0 12 12zm0 2c-4.418 0-8 2.239-8 5v3h16v-3c0-2.761-3.582-5-8-5z"/>
    </svg>
  `;
}

function bottomNav(active) {
  return `
    <nav>
      <div onclick="navigate('home')" style="color:${active==='home'?'#fff':'#aaa'}">
        ${homeIcon()}
      </div>
      <div onclick="navigate('profile')" style="color:${active==='profile'?'#fff':'#aaa'}">
        ${userIcon()}
      </div>
    </nav>
  `;
}

function renderLogin() {
  app.innerHTML = `
    <main style="display:flex;justify-content:center;align-items:center;height:100vh;">
      <div class="card" style="width:100%;max-width:400px;">
        <h2 style="margin-bottom:16px;">BIEL Sky Ultra</h2>
        <input id="user" placeholder="usuario.bsky.social" />
        <input id="pass" type="password" placeholder="App Password" />
        <button id="loginBtn">Entrar</button>
      </div>
    </main>
  `;

  document.getElementById("loginBtn").onclick = async () => {
    try {
      await login(
        document.getElementById("user").value,
        document.getElementById("pass").value
      );
      navigate("home");
      render();
    } catch {
      alert("Erro ao logar.");
    }
  };
}

function renderHome() {
  app.innerHTML = `
    <header>Home</header>
    <main>
      <div class="card">
        Bem-vindo ao BIEL Sky Ultra.
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
        <p><strong>Logado como:</strong></p>
        <p>${session?.handle || "Usuário"}</p>
        <button id="logoutBtn">Sair</button>
      </div>
    </main>
    ${bottomNav("profile")}
  `;

  document.getElementById("logoutBtn").onclick = () => {
    logout();
    navigate("login");
    render();
  };
}

function render() {
  const route = getRoute();
  const session = getSession();

  if (!session && route !== "login") {
    navigate("login");
    return renderLogin();
  }

  if (route === "login") return renderLogin();
  if (route === "home") return renderHome();
  if (route === "profile") return renderProfile();
}

window.addEventListener("hashchange", render);
render();

window.navigate = navigate;
