import { basicAuthHeader } from "../helpers/basicAuthHeader.mjs";

export const wordpressApiGet = async (endpointPath, credentials) => {
  const { baseUrl, username, appPassword } = credentials;
  const endpoint = `${baseUrl}${endpointPath}`;
  const Authorization = basicAuthHeader(username, appPassword);
  const res = await fetch(endpoint, {method: "GET", headers: {Authorization}});
  const text = await res.text();
 if (!res.ok) {
    const status = res.status;
    throw new Error(`Wordpress API call failed: ${status} ${text}`);
  }
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}