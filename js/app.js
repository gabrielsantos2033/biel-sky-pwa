import {login} from "./api.js"
import {router} from "./router.js"

window.doLogin = async function(){
  const handle=document.getElementById("handle").value
  const password=document.getElementById("password").value

  if(!handle || !password) return alert("Preencha tudo")

  await login(handle,password)

  document.getElementById("login").classList.add("hidden")
  document.getElementById("appContainer").classList.remove("hidden")

  router.go("home")
}

window.router=router
