import { basicAuthHeader } from "../helpers/basicAuthHeader.mjs";

export const wordpressApiPost = async (endpointPath, credentials, payload) => {
  const { baseUrl, username, appPassword } = credentials;
  const endpoint = `${baseUrl}${endpointPath}`;
  const Authorization = basicAuthHeader(username, appPassword);
  const init = { method: "POST", headers:{ Authorization }, body: void 0 };
  if (payload) {
    init.headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(payload);
  }
  let res;
  try {
    res = await fetch(endpoint, init);
  } catch(e) {
    console.error('fetch failed', endpoint);
    //console.log(e);
    throw e;
  }
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!res.ok) {
    const status = res.status;
    console.log('status', status);
    console.log('endpoint', endpoint);
    console.log('init', init);

    console.error(data);
    const code = data?.data?.code ?? '';
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