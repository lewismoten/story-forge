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

## Usage

Create Stories

```bash
node ./src/storyforge.mjs init
node ./src/storyforge.mjs persona:create "present-prophet"
node ./src/storyforge.mjs persona:create "present-prophet" "fred"
node ./src/storyforge.mjs doc:add ./worldbuilding/setting.md
node ./src/storyforge.mjs link:add "https://example.com/lore-page"
node ./src/storyforge.mjs story:generate --persona "present-prophet-fred" --links "https://example.com/a,https://example.com/b"
node ./src/storyforge.mjs story:generate --persona "far-future-historian"
```

Create images for stories
```bash
node ./src/feature-image.mjs
```