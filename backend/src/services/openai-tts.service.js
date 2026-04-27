import { env } from '../config/env.js';

function ttsInstructions(language) {
  if (String(language || '').toLowerCase().startsWith('vi')) {
    return 'Speak in natural Vietnamese with a warm, calm portfolio assistant tone. Keep a realistic pace, clear intonation, and gentle pauses between ideas.';
  }

  return 'Speak in natural English with a warm, calm portfolio assistant tone. Keep a realistic pace, clear intonation, and gentle pauses between ideas.';
}

export async function createSpeechAudio({ text, language }) {
  if (!env.openAiApiKey) {
    const error = new Error('Missing OPENAI_API_KEY environment variable');
    error.statusCode = 501;
    throw error;
  }

  const cleanText = typeof text === 'string' ? text.trim().slice(0, 1800) : '';

  if (!cleanText) {
    const error = new Error('Text is required');
    error.statusCode = 400;
    throw error;
  }

  let response;

  try {
    response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      signal: AbortSignal.timeout(env.openAiTimeoutMs),
      headers: {
        Authorization: `Bearer ${env.openAiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: env.openAiTtsModel,
        voice: env.openAiTtsVoice,
        input: cleanText,
        instructions: ttsInstructions(language),
        response_format: 'mp3'
      })
    });
  } catch (error) {
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      const timeoutError = new Error('OpenAI TTS API timed out');
      timeoutError.statusCode = 504;
      throw timeoutError;
    }

    throw error;
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const error = new Error(errorBody.error?.message || 'OpenAI TTS API error');
    error.statusCode = response.status;
    throw error;
  }

  return Buffer.from(await response.arrayBuffer());
}
