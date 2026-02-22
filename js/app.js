import { router, navigate } from "./router.js";
import { login, getSession, logout } from "./api.js";

const app = document.getElementById("app");

function renderLogin() {
  app.innerHTML = `
    <div class="card">
      <h2>BIEL Sky Ultra</h2>
      <input id="user" placeholder="usuario.bsky.social" />
      <input id="pass" type="password" placeholder="App Password" />
      <button id="loginBtn">Entrar</button>
    </div>
  `;

  document.getElementById("loginBtn").onclick = async () => {
    try {
      await login(
        document.getElementById("user").value,
        document.getElementById("pass").value
      );
      navigate("home");
      render();
    } catch (e) {
      alert("Erro ao logar");
    }
  };
}

function renderHome() {
  app.innerHTML = `
    <div class="card">
      <h2>Feed</h2>
      <p>Em breve aqui aparecerão posts.</p>
      <button id="logoutBtn">Sair</button>
    </div>
  `;

  document.getElementById("logoutBtn").onclick = () => {
    logout();
    navigate("login");
    render();
  };
}

function render() {
  const route = router();
  const session = getSession();

  if (!session && route !== "login") {
    navigate("login");
    render();
    return;
  }

  if (route === "login") return renderLogin();
  if (route === "home") return renderHome();
}

window.addEventListener("hashchange", render);
render();
