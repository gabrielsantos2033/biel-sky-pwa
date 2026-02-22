let session = null;

export async function login(identifier, password) {
  const res = await fetch("https://bsky.social/xrpc/com.atproto.server.createSession", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      identifier,
      password
    })
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
