import { basicAuthHeader } from "../helpers/basicAuthHeader.mjs";

export const wordpressApiPost = async (endpointPath, credentials, payload) => {
  const { baseUrl, username, appPassword } = credentials;
  const endpoint = `${baseUrl}${endpointPath}`;
  const Authorization = basicAuthHeader(username, appPassword);
  const headers = { Authorization };
  let body;
  if (payload) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(payload);
  }
  const res = await fetch(endpoint, { method: "POST", headers, body });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!res.ok) {
    const status = res.status;
    const code = json?.data?.code ?? '';
    throw new Error(`Wordpress API call failed. ${code}`, {
      cause: {
        status,
        text,
        data,
        code
      }
    });
  }
  return data;
}