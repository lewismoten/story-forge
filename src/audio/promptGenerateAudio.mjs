export const promptGenerateAudio = async ({ prompt, sound, title }) => 
  `Turn these lyrics into a song.
TITLE: ${title}
SOUND: ${sound ?? ''}
LYRICS: ${prompt}
`;
