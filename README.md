# Story Forge

Create stories using AI. Multi-persona, shared-world story 
generator using OpenAI Responses API.

## Features

- Story Building (ChatGPT)
  - Multiple personas, each with its own ongoing "voice" + continuity
  - Shared World Bible (docs you add + link extracts)
  - Cross-persona referencing via shared canon summaries
  - Reuses conversation state via previous_response_id
  - Also keeps local rolling memory summaries as a fallback
  - Suggested image descriptions, tags, categories for blogs
  - Metadata for creating AI music, podcasts, radio shows
- Image Generation (DeepAI)
  - Create images to go along with theme of each story
  - Images created as a batch for stories that are missing images
- Blogging (Wordpress)
  - Upload images as media
  - Post as multiple user accounts
  - Use Title, Slugs, Featur Images, Tags, Categories
  - Schedule posts in the future

## Future features
Partial work is done for music generation. DeepAI has a model for music
generation, but it doesn't appear to be expoed via an API.  
For now, you may use the title, sound, and lyrics as a prompt to
paste into your favorite music generator.

## Setup

### OpenAI
1. Go to https://platform.openai.com
2. Create a project
3. Create an API key
4. Setup environment variables.

```bash
# macOS/Linux
export OPENAI_API_KEY="..."
# Windows
setx OPENAI_API_KEY "..."
```

### DeepAI

1. Go to https://deepai.org/dashboard/profile
2. Create an API key
3. Setup environment variables.

```bash
# macOS/Linux
export DEEPAI_API_KEY="..."
# Windows
setx DEEPAI_API_KEY "..."
```

### Wordpress

Make sure that the user has a role that is permitted to
create categories and tags, such "Editor".

Setup an application password.

1. Go to `/wp-admin/` dashboard
2. Go to `Users` menu
3. Click the user
4. Scroll down to `Application Passwords`
5. Fill out `New Application Password Name`
6. Click `Add Application Password`
7. Copy the application password
8. In the source code, got to your generated personas `/.story-forge/personas/{name}.json`
9. Add a new `blogs` section with a named key and your credentials

```json
{ 
  "blogs": {
    "story-forge": {
      "type": "wordpress",
      "baseUrl": "https://example.com",
      "username": "wordpress.user.name",
      "appPassword": "abcd efgh ijkl mnop qrst uvwx"
    }
  }
}
```

If you setup a wordpress blog on a shared hose, you may need to enable
application passwords manually. 

#### Hostinger
1. Go to /wp-admin/ Dashboard
2. Hover oer `Hostinger` on the menu
3. Click `Tools`
4. In the `Security` section
5. Ensure `Disable application passwords` is off


## Usage

Create Stories

```bash
node ./src/story-forge.mjs init
node ./src/story-forge.mjs persona:create "present-prophet"
node ./src/story-forge.mjs persona:create "present-prophet" "fred"
node ./src/story-forge.mjs doc:add ./worldbuilding/setting.md
node ./src/story-forge.mjs link:add "https://example.com/lore-page"
node ./src/story-forge.mjs story:generate --persona "present-prophet-fred" --links "https://example.com/a,https://example.com/b"
node ./src/story-forge.mjs story:generate --persona "far-future-historian"
```

Create images for stories
```bash
node ./src/feature-image.mjs
```

### Workflow
```bash
node ./src/story-forge.mjs init
node ./src/story-forge.mjs persona:create reporter theo
node ./src/story-forge.mjs story:generate --persona reporter-theo
# The rest are done in batches
node ./src/feature-image.mjs 

#### Stop ####
# Before you go further, setup your persona with a blog
# And with the Editor role so that they can create tags/categories
#
node ./src/upload-feature-image.mjs
# if a singer persona, you may want to work on song prompts
node ./src/music-maker.mjs
node ./src/upload-post.mjs
```