import { getAgent } from "./api.js"
import { like, repost } from "./post.js"
import { router } from "./router.js"

function formatDate(date){
  return new Date(date).toLocaleDateString("pt-BR")
}

function renderImage(embed){
  if(!embed || !embed.images) return ""
  return embed.images.map(img =>
    `<img class="post-image" src="${img.fullsize}">`
  ).join("")
}

export async function renderHome(){
  const agent=getAgent()
  const res=await agent.getTimeline()
  const app=document.getElementById("app")
  app.innerHTML=""

  res.data.feed.forEach(item=>{
    const p=item.post

    const card=document.createElement("div")
    card.className="post-card"

    card.innerHTML=`
    <div class="post">
      <img class="avatar" src="${p.author.avatar||''}">
      <div class="post-body">

        <div class="post-top">
          <strong>${p.author.displayName||""}</strong>
          <span class="handle">@${p.author.handle}</span>
          <span class="date">${formatDate(p.record.createdAt)}</span>
        </div>

        <div class="post-text">${p.record.text||""}</div>

        ${renderImage(p.record.embed)}

        <div class="actions">
          <button class="action-btn like">❤️ ${p.likeCount||0}</button>
          <button class="action-btn repost">🔁 ${p.repostCount||0}</button>
          <button class="action-btn reply">💬 ${p.replyCount||0}</button>
        </div>

      </div>
    </div>
    `

    app.appendChild(card)

    card.querySelector(".avatar").onclick=
      ()=>router.go("profile",p.author.did)

    card.querySelector(".like").onclick=
      ()=>like(p.uri,p.cid)

    card.querySelector(".repost").onclick=
      ()=>repost(p.uri,p.cid)
  })
}
