import { BskyAgent } from "https://esm.sh/@atproto/api?bundle"

let agent = null

window.doLogin = async function () {
  const handle = document.getElementById("handle").value
  const password = document.getElementById("password").value

  try {
    agent = new BskyAgent({
      service: "https://bsky.social"
    })

    await agent.login({
      identifier: handle,
      password: password
    })

    document.getElementById("login").classList.add("hidden")

    loadHome()

  } catch (err) {
    alert("Erro no login: " + err.message)
    console.error(err)
  }
}

window.loadHome = async function () {
  if (!agent) return

  const app = document.getElementById("app")
  app.innerHTML = "Carregando..."

  try {
    const res = await agent.getTimeline()

    app.innerHTML = ""

    res.data.feed.forEach(item => {
      const p = item.post

      app.innerHTML += `
        <div style="padding:16px;border-bottom:1px solid #1f2937">
          <strong>${p.author.displayName || ""}</strong>
          <div style="color:#9ca3af">@${p.author.handle}</div>
          <p>${p.record.text || ""}</p>
        </div>
      `
    })

  } catch (err) {
    console.error(err)
    app.innerHTML = "Erro ao carregar feed."
  }
}

window.loadProfile = async function () {
  if (!agent) return

  const app = document.getElementById("app")
  app.innerHTML = "Carregando perfil..."

  try {
    const res = await agent.getProfile({
      actor: agent.session.did
    })

    app.innerHTML = `
      <div style="padding:20px">
        <h2>${res.data.displayName || ""}</h2>
        <p style="color:#9ca3af">@${res.data.handle}</p>
        <p>${res.data.description || ""}</p>
      </div>
    `

  } catch (err) {
    console.error(err)
    app.innerHTML = "Erro ao carregar perfil."
  }
}
