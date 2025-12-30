const BASE_URL = "https://mixo-fe-backend-task.vercel.app";

export async function fetcher(endpoint: string) {
  const response = await fetch(BASE_URL + endpoint, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}
