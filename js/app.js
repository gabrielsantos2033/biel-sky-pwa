import { BskyAgent } from "https://esm.sh/@atproto/api?bundle"

let agent = null

window.doLogin = async function () {
  const handleInput = document.getElementById("handle")
  const passwordInput = document.getElementById("password")

  const handle = handleInput.value.trim()
  const password = passwordInput.value.trim()

  if (!handle || !password) {
    alert("Preencha usuário e app password.")
    return
  }

  try {
    agent = new BskyAgent({
      service: "https://bsky.social"
    })

    const loginResponse = await agent.login({
      identifier: handle,
      password: password
    })

    if (!loginResponse.success) {
      alert("Login falhou.")
      return
    }

    if (!agent.session || !agent.session.accessJwt) {
      alert("Sessão não criada corretamente.")
      return
    }

    console.log("Login OK:", agent.session)

    document.getElementById("login").classList.add("hidden")

    await loadHome()

  } catch (err) {
    console.error("Erro no login:", err)
    alert("Erro de autenticação. Verifique handle completo e app password.")
  }
}

window.loadHome = async function () {
  if (!agent || !agent.session) {
    console.log("Sem sessão válida.")
    return
  }

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
    console.error("Erro timeline:", err)
    app.innerHTML = "Erro 401. Sessão inválida."
  }
}
