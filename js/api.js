export let agent

export async function login(handle,password){
  agent = new window.atproto.BskyAgent({
    service: 'https://bsky.social'
  })

  await agent.login({identifier:handle,password})
}

export function getAgent(){
  return agent
}
