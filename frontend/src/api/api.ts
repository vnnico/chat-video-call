const BASE_URL = "http://localhost:3000";

export async function api<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    let message = "Something went wrong";

    try {
      const body = await res.json();
      if (body && typeof body.message === "string") {
        message = body.message;
      }
    } catch {
      // fallback ke text biasa
      const text = await res.text();
      if (text) message = text;
    }

    throw new Error(message);
  }

  return res.json() as Promise<T>;
}
