import { getAgent } from "./api.js"
import { renderHome } from "./feeds.js"

export async function renderProfile(did){
  const agent=getAgent()
  const target=did||agent.session.did

  const profile=await agent.getProfile({actor:target})
  const feed=await agent.getAuthorFeed({actor:target})

  const app=document.getElementById("app")

  app.innerHTML=`
  <div style="padding:20px;border-bottom:1px solid #1f2937">
    <img src="${profile.data.avatar||''}" style="width:80px;border-radius:50%">
    <h2>${profile.data.displayName||""}</h2>
    <p>@${profile.data.handle}</p>
    <p>${profile.data.description||""}</p>
  </div>
  `

  feed.data.feed.forEach(item=>{
    const p=item.post
    app.innerHTML+=`
    <div class="post-card">
      <div>${p.record.text}</div>
    </div>
    `
  })
}
