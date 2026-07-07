export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getCsrfToken() {
  const res = await fetch(`${API_BASE_URL}/api/csrf/`, {
    credentials: "include"
  });
  const data = await res.json();
  return data.csrfToken;
}