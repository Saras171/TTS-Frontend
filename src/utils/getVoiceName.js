// File: src/utils/getVoiceName.js

/**
 * Returns the appropriate Google Cloud TTS voice name based on selected language and gender.
 * Voice names are mapped from available Standard/Wavenet voices by locale and gender.
 * 
 * @param {string} language - The BCP-47 language code (e.g., 'en-US').
 * @param {string} gender - 'male' or 'female'.
 * @returns {string} - Corresponding Google TTS voice name.
 */
export const getVoiceName = (language, gender) => {
  const maleVoices = {
    'en-US': 'en-US-Wavenet-D',
    'en-GB': 'en-GB-Wavenet-D',
    'hi-IN': 'hi-IN-Standard-B',
    'fr-FR': 'fr-FR-Wavenet-D',
    'de-DE': 'de-DE-Wavenet-D',
    'es-ES': 'es-ES-Standard-B',
    'ja-JP': 'ja-JP-Standard-B',
    'ko-KR': 'ko-KR-Standard-B',
    'it-IT': 'it-IT-Standard-D',
    'ru-RU': 'ru-RU-Wavenet-D'
  };

  const femaleVoices = {
    'en-US': 'en-US-Wavenet-F',
    'en-GB': 'en-GB-Wavenet-F',
    'hi-IN': 'hi-IN-Standard-A',
    'fr-FR': 'fr-FR-Wavenet-E',
    'de-DE': 'de-DE-Wavenet-E',
    'es-ES': 'es-ES-Standard-A',
    'ja-JP': 'ja-JP-Standard-A',
    'ko-KR': 'ko-KR-Standard-A',
    'it-IT': 'it-IT-Standard-C',
    'ru-RU': 'ru-RU-Wavenet-C'
  };

  return gender === 'female' ? femaleVoices[language] : maleVoices[language];
};
