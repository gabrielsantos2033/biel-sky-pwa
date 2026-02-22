import {getAgent} from "./api.js"

export async function like(uri,cid){
  const agent=getAgent()
  await agent.like({subject:{uri,cid}})
}

export async function repost(uri,cid){
  const agent=getAgent()
  await agent.repost({subject:{uri,cid}})
}
