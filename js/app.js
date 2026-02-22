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

/* ================= ICONS ================= */

function iconHome(active) {
  return `<svg viewBox="0 0 24 24" width="22" height="22" fill="${active?'#fff':'#aaa'}">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"/>
  </svg>`;
}

function iconUser(active) {
  return `<svg viewBox="0 0 24 24" width="22" height="22" fill="${active?'#fff':'#aaa'}">
    <path d="M12 12a5 5 0 1 0-0.001-10.001A5 5 0 0 0 12 12zm0 2c-4.418 0-8 2.239-8 5v3h16v-3c0-2.761-3.582-5-8-5z"/>
  </svg>`;
}

function iconLike() {
  return `<svg viewBox="0 0 24 24" width="20" height="20" fill="#aaa">
    <path d="M12 21s-6.716-4.686-9.33-8.03C1.043 10.81 2.094 6.8 6.04 6.207 8.353 5.88 12 9 12 9s3.647-3.12 5.96-2.793c3.946.593 4.997 4.603 3.37 6.763C18.716 16.314 12 21 12 21z"/>
  </svg>`;
}

function iconComment() {
  return `<svg viewBox="0 0 24 24" width="20" height="20" fill="#aaa">
    <path d="M4 4h16v12H5.17L4 17.17V4z"/>
  </svg>`;
}

function iconSearch() {
  return `<svg viewBox="0 0 24 24" width="20" height="20" fill="#aaa">
    <path d="M10 2a8 8 0 105.293 14.293l4.207 4.207 1.414-1.414-4.207-4.207A8 8 0 0010 2z"/>
  </svg>`;
}

/* ================= NAV ================= */

function bottomNav(active) {
  return `
    <nav>
      <div onclick="navigate('home')">${iconHome(active==='home')}</div>
      <div onclick="navigate('profile')">${iconUser(active==='profile')}</div>
    </nav>
  `;
}

/* ================= LOGIN ================= */

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

/* ================= HOME ================= */

async function renderHome() {
  const data = await getTimeline();
  const posts = data.feed || [];

  app.innerHTML = `
    <header style="display:flex;justify-content:space-between;align-items:center;">
      <span>Home</span>
      ${iconSearch()}
    </header>
    <main>
      <div class="card">
        <textarea id="newPost" placeholder="O que você está pensando?"></textarea>
        <button id="postBtn">Publicar</button>
      </div>

      ${posts.map(p => {
        const post = p.post;
        const author = post.author;
        const images = post.embed?.images || [];

        return `
          <div class="card">
            <div style="display:flex;align-items:center;margin-bottom:8px;">
              <img src="${author.avatar || ''}" 
                   style="width:36px;height:36px;border-radius:50%;margin-right:10px;object-fit:cover;">
              <div>
                <div style="font-weight:600;">${author.displayName || author.handle}</div>
                <div style="font-size:12px;color:#aaa;">@${author.handle}</div>
              </div>
            </div>

            <p style="margin-bottom:8px;">${post.record.text}</p>

            ${images.map(img => `
              <img src="${img.fullsize}" 
                   style="width:100%;border-radius:12px;margin-bottom:8px;">
            `).join("")}

            <div style="display:flex;gap:16px;margin-top:8px;">
              ${iconLike()}
              ${iconComment()}
            </div>
          </div>
        `;
      }).join("")}
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

/* ================= PROFILE ================= */

async function renderProfile() {
  const profile = await getProfile();

  app.innerHTML = `
    <header>Perfil</header>
    <main>
      <div class="card" style="text-align:center;">
        <img src="${profile.avatar || ''}" 
             style="width:90px;height:90px;border-radius:50%;object-fit:cover;margin-bottom:10px;">
        <h3>${profile.displayName || profile.handle}</h3>
        <p style="color:#aaa;">@${profile.handle}</p>
        <p style="margin-top:8px;">
          ${profile.followersCount} seguidores • ${profile.followsCount} seguindo
        </p>
        <button id="logoutBtn" style="margin-top:12px;">Sair</button>
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

/* ================= ROUTER ================= */

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
