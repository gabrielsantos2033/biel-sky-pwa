import {getAgent} from "./api.js"
import {router} from "./router.js"

export function renderSearch(){
  const app=document.getElementById("app")
  app.innerHTML=`
    <input id="query" placeholder="Buscar usuário">
    <div id="results"></div>
  `
  document.getElementById("query").oninput=async(e)=>{
    const agent=getAgent()
    const q=e.target.value
    if(q.length<2)return
    const res=await agent.searchActors({q})
    const results=document.getElementById("results")
    results.innerHTML=""
    res.data.actors.forEach(a=>{
      results.innerHTML+=`
      <div class="card" onclick="router.go('profile','${a.did}')">
      ${a.displayName||""} (@${a.handle})
      </div>
      `
    })
  }
}
