import {getAgent} from "./api.js"

export async function renderProfile(did){
  const agent=getAgent()
  const me=agent.session.did
  const target=did||me

  const profile=await agent.getProfile({actor:target})
  const feed=await agent.getAuthorFeed({actor:target})

  const app=document.getElementById("app")

  app.innerHTML=`
  <div class="card">
    <img class="avatar" src="${profile.data.avatar||''}">
    <h2>${profile.data.displayName||''}</h2>
    <p>@${profile.data.handle}</p>
    <p>${profile.data.description||''}</p>
  </div>
  `

  feed.data.feed.forEach(item=>{
    const p=item.post
    app.innerHTML+=`
    <div class="card">
      <p>${p.record.text}</p>
    </div>
    `
  })
}
