const API_BASE = "http://localhost:8000"

export async function signup(username: string, password: string) {
  const res = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.detail || "Signup failed")
  }

  return await res.json()
}

export async function login(username: string, password: string) {
  const body = new URLSearchParams();
  body.append("username", username);
  body.append("password", password);

  const res = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Login failed");
  }

  return await res.json(); // { access_token, token_type }
}

export async function getCurrentUser(token: string) {
  const res = await fetch(`http://localhost:8000/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.detail || "Failed to fetch user")
  }

  return await res.json()
}
