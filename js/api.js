import { BskyAgent } from "https://esm.sh/@atproto/api"

let agent

export async function login(handle,password){
  agent = new BskyAgent({
    service: "https://bsky.social"
  })

  await agent.login({
    identifier: handle,
    password: password
  })
}

export function getAgent(){
  return agent
}
