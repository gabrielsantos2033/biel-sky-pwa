import { renderHome } from "./feeds.js"
import { renderSearch } from "./search.js"
import { renderProfile } from "./profile.js"

function go(route, param = null) {

  if (route === "home") {
    renderHome()
  }

  else if (route === "search") {
    renderSearch()
  }

  else if (route === "profile") {
    renderProfile(param)
  }

  else if (route === "discover") {
    document.getElementById("app").innerHTML =
      "<div class='card'>Discover em breve</div>"
  }

  else if (route === "notifications") {
    document.getElementById("app").innerHTML =
      "<div class='card'>Notificações em breve</div>"
  }
}

export const router = { go }
