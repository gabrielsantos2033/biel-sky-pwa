import {login} from "./api.js"
import {router} from "./router.js"

const handle=prompt("Seu usuário Bluesky")
const password=prompt("Senha (App Password recomendado)")

await login(handle,password)

router.go("home")

window.router=router
