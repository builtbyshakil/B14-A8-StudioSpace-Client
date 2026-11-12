let tokenRequest = null;

export function forgetToken() {
  tokenRequest = null;
}

function ensureToken() {
  if (!tokenRequest) {
    tokenRequest = fetch("/api/token", { method: "POST" }).then((response) => {
      if (!response.ok) tokenRequest = null;
      return response.ok;
    });
  }
  return tokenRequest;
}

export async function clearToken() {
  forgetToken();
  await fetch("/api/token", { method: "DELETE" });
}

function send(path, method, body) {
  return fetch(`/api${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
}

export async function api(path, { method = "GET", body, auth = false } = {}) {
  if (auth) await ensureToken();

  let response = await send(path, method, body);

  if (auth && response.status === 401) {
    forgetToken();
    await ensureToken();
    response = await send(path, method, body);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }

  return data;
}
