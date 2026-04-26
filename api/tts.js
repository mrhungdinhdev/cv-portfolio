async function readBody(req) {
  if (Buffer.isBuffer(req.body)) return JSON.parse(req.body.toString('utf8') || '{}');
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');

  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function ttsInstructions(language) {
  if (String(language || '').toLowerCase().startsWith('vi')) {
    return 'Speak in natural Vietnamese with a warm, calm portfolio assistant tone. Keep a realistic pace, clear intonation, and gentle pauses between ideas.';
  }

  return 'Speak in natural English with a warm, calm portfolio assistant tone. Keep a realistic pace, clear intonation, and gentle pauses between ideas.';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return sendJson(res, 501, { error: 'Missing OPENAI_API_KEY environment variable' });
  }

  try {
    const { text, language } = await readBody(req);
    const cleanText = typeof text === 'string' ? text.trim().slice(0, 1800) : '';

    if (!cleanText) {
      return sendJson(res, 400, { error: 'Text is required' });
    }

    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENAI_TTS_MODEL || 'gpt-4o-mini-tts',
        voice: process.env.OPENAI_TTS_VOICE || 'cedar',
        input: cleanText,
        instructions: ttsInstructions(language),
        response_format: 'mp3'
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return sendJson(res, response.status, {
        error: error.error?.message || 'OpenAI TTS API error'
      });
    }

    const audio = Buffer.from(await response.arrayBuffer());
    res.statusCode = 200;
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', String(audio.length));
    res.setHeader('Cache-Control', 'no-store');
    res.end(audio);
  } catch (error) {
    return sendJson(res, 500, { error: 'TTS error' });
  }
}
