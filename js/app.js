import {
  login,
  getSession,
  logout,
  getTimeline,
  getProfile,
  createPost
} from "./api.js";

const app = document.getElementById("app");

function navigate(route) {
  window.location.hash = route;
}

function getRoute() {
  return window.location.hash.replace("#", "") || "login";
}

function iconHome(active) {
  return `<svg viewBox="0 0 24 24" width="24" height="24" fill="${active?'#fff':'#aaa'}">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"/>
  </svg>`;
}

function iconUser(active) {
  return `<svg viewBox="0 0 24 24" width="24" height="24" fill="${active?'#fff':'#aaa'}">
    <path d="M12 12a5 5 0 1 0-0.001-10.001A5 5 0 0 0 12 12zm0 2c-4.418 0-8 2.239-8 5v3h16v-3c0-2.761-3.582-5-8-5z"/>
  </svg>`;
}

function bottomNav(active) {
  return `
    <nav>
      <div onclick="navigate('home')">${iconHome(active==='home')}</div>
      <div onclick="navigate('profile')">${iconUser(active==='profile')}</div>
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

async function renderHome() {
  const data = await getTimeline();
  const posts = data.feed || [];

  app.innerHTML = `
    <header>Home</header>
    <main>
      <div class="card">
        <textarea id="newPost" placeholder="O que você está pensando?"></textarea>
        <button id="postBtn">Publicar</button>
      </div>
      ${posts.map(p => `
        <div class="card">
          <strong>${p.post.author.displayName || p.post.author.handle}</strong>
          <p>${p.post.record.text}</p>
        </div>
      `).join("")}
    </main>
    ${bottomNav("home")}
  `;

  document.getElementById("postBtn").onclick = async () => {
    const text = document.getElementById("newPost").value;
    if (!text) return;
    await createPost(text);
    render();
  };
}

async function renderProfile() {
  const profile = await getProfile();

  app.innerHTML = `
    <header>Perfil</header>
    <main>
      <div class="card">
        <h3>${profile.displayName || profile.handle}</h3>
        <p>@${profile.handle}</p>
        <p>${profile.followersCount} seguidores</p>
        <p>${profile.followsCount} seguindo</p>
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

async function render() {
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
