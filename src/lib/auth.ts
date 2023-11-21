export async function authAsUser(): Promise<string> {
  const res = await fetch("https://overtevr.cs.upb.de/api/auth", {
    method: "POST",
  });
  const response = await res.json();
  return response.token;
}
