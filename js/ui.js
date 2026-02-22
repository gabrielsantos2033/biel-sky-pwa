export function svg(icon){
  const icons={
    like:`<svg width="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 0 0-6 0v4"></path><path d="M5 15h14l-1 5H6z"></path></svg>`,
    repost:`<svg width="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 1l4 4-4 4"></path><path d="M3 11V9a4 4 0 014-4h14"></path></svg>`,
    comment:`<svg width="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 15a4 4 0 01-4 4H7l-4 4V5a4 4 0 014-4h10a4 4 0 014 4z"></path></svg>`
  }
  return icons[icon]
}
