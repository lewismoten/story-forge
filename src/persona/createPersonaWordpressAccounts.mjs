import { listPersonaFiles } from "./listPersonaFiles.mjs"
import { loadPersonaA } from "./loadPersona.mjs";
import { savePersonaA } from "./savePersona.mjs";

export const createPersonaWordpressAccounts = async () => {
  const items = listPersonaFiles();
  for(let i = 0; i < items.length; i++) {
    const persona = await loadPersonaA(items[i]);
    if(!("blogs" in persona)) {
      persona.blogs = {};
    }
    if(!('story-forge' in persona.blogs)) {
      persona.blogs['story-forge'] = {};
    }

    const personalization =  persona.personalization;
    
    const blog = persona.blogs['story-forge'];
    let {
      type = "wordpress",
      baseUrl = "https://story-forge.lewismoten.com",
      username = personalization.user_name,
      appPassword = "aaaa bbbb cccc dddd eeee ffff",
      id = -1
    } = blog;
    id = await ensureWordpressUser({    // TODO

      id,
      username,
      baseUrl,
      personalization
    });
    appPassword = await ensureWordpressAppPassword(    // TODO

      {id, baseUrl, username, appPassword}
    );
    blog.type = type;
    blog.id = id;
    blog.username = username;
    blog.appPassword = appPassword;
    blog.baseUrl = baseUrl;
    await savePersonaA(persona);
  }
}