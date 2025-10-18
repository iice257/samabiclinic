export const ADMIN_CREDENTIALS = {
  username: "samabi",
  password: "adminarea",
}

export function validateAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}

export function setAdminSession(token: string): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("adminSession", token)
  }
}

export function getAdminSession(): string | null {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("adminSession")
  }
  return null
}

export function clearAdminSession(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("adminSession")
  }
}

export function isAdminAuthenticated(): boolean {
  return getAdminSession() !== null
}
