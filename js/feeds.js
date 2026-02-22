import {getAgent} from "./api.js"
import {svg} from "./ui.js"
import {like,repost} from "./post.js"
import {router} from "./router.js"

export async function renderHome(){
  const agent=getAgent()
  const res=await agent.getTimeline()

  const app=document.getElementById("app")
  app.innerHTML=""

  res.data.feed.forEach(item=>{
    const p=item.post
    const card=document.createElement("div")
    card.className="card"

    card.innerHTML=`
    <div class="post-header">
      <img class="avatar" src="${p.author.avatar||''}">
      <div>
        <strong>${p.author.displayName||""}</strong><br>
        <small>@${p.author.handle}</small>
      </div>
    </div>
    <p>${p.record.text}</p>
    <div class="actions">
      <button>${svg("comment")}</button>
      <button>${svg("repost")} ${p.repostCount||0}</button>
      <button>${svg("like")} ${p.likeCount||0}</button>
    </div>
    `
    app.appendChild(card)

    card.querySelectorAll("button")[1].onclick=()=>repost(p.uri,p.cid)
    card.querySelectorAll("button")[2].onclick=()=>like(p.uri,p.cid)

    card.querySelector(".post-header").onclick=()=>{
      router.go("profile",p.author.did)
    }
  })
}

export async function renderDiscover(){
  const app=document.getElementById("app")
  app.innerHTML="<div class='card'>Discover em desenvolvimento</div>"
}
