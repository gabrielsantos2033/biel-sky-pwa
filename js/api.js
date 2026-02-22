let session = null;

export async function login(identifier, password) {
  const res = await fetch("https://bsky.social/xrpc/com.atproto.server.createSession", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  session = data;
  localStorage.setItem("bsky_session", JSON.stringify(data));
  return data;
}

export function getSession() {
  if (session) return session;
  const saved = localStorage.getItem("bsky_session");
  if (saved) {
    session = JSON.parse(saved);
    return session;
  }
  return null;
}

export function logout() {
  session = null;
  localStorage.removeItem("bsky_session");
}

// 🔥 FEED REAL
export async function getTimeline() {
  const s = getSession();
  const res = await fetch("https://bsky.social/xrpc/app.bsky.feed.getTimeline", {
    headers: {
      Authorization: `Bearer ${s.accessJwt}`
    }
  });
  return res.json();
}

// 🔥 PERFIL REAL
export async function getProfile() {
  const s = getSession();
  const res = await fetch(
    `https://bsky.social/xrpc/app.bsky.actor.getProfile?actor=${s.handle}`,
    {
      headers: {
        Authorization: `Bearer ${s.accessJwt}`
      }
    }
  );
  return res.json();
}

// 🔥 PUBLICAÇÃO REAL
export async function createPost(text) {
  const s = getSession();

  const record = {
    text,
    createdAt: new Date().toISOString()
  };

  const res = await fetch("https://bsky.social/xrpc/com.atproto.repo.createRecord", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${s.accessJwt}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      repo: s.did,
      collection: "app.bsky.feed.post",
      record
    })
  });

  return res.json();
}
