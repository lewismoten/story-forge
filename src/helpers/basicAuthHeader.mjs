
export const basicAuthHeader = (username, password) => {
  const token = Buffer
    .from(`${username}:${password}`)
    .toString("base64");
  return `Basic ${token}`;
}