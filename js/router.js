export function router() {
  const hash = window.location.hash.replace("#/", "") || "login";
  return hash;
}

export function navigate(route) {
  window.location.hash = route;
}
