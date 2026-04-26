import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

let cvCache;

async function loadCv() {
  if (!cvCache) {
    const raw = await readFile(join(process.cwd(), 'data', 'cv.json'), 'utf8');
    cvCache = JSON.parse(raw);
  }
  return cvCache;
}

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return sendJson(res, 500, {
      error: 'Missing OPENROUTER_API_KEY environment variable'
    });
  }

  try {
    const { message, language, pageLanguage } = await readBody(req);
    const cleanMessage = typeof message === 'string' ? message.trim() : '';
    const requestedLanguage = String(language || pageLanguage || 'en').toLowerCase();
    const responseLanguage = requestedLanguage.startsWith('vi') ? 'Vietnamese' : 'English';
    const missingInfoMessage = responseLanguage === 'Vietnamese'
      ? 'Thông tin này chưa có trong portfolio.'
      : 'This information is not available in the portfolio.';

    if (!cleanMessage) {
      return sendJson(res, 400, { error: 'Message is required' });
    }

    const cv = await loadCv();
    const siteUrl = process.env.OPENROUTER_SITE_URL || req.headers.origin || 'http://localhost:3000';
    const siteName = process.env.OPENROUTER_SITE_NAME || 'DVH Portfolio AI Assistant';
    const model = process.env.OPENROUTER_MODEL || 'openrouter/free';

    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'HTTP-Referer': siteUrl,
        'X-OpenRouter-Title': siteName,
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: [
              "You are an AI assistant on Đinh Văn Hùng's portfolio website.",
              'Sound natural, concise, and conversational, like a helpful portfolio guide.',
              'Do not claim to be Đinh Văn Hùng or a real human. Be transparent that you are the portfolio assistant if asked.',
              'Only answer based on the CV data below.',
              'Do not invent fake information.',
              `The portfolio page is currently displayed in ${responseLanguage}.`,
              `Always answer in ${responseLanguage}, regardless of the language used in the user's question.`,
              `If the answer is missing from the CV data, say exactly: "${missingInfoMessage}"`,
              '',
              JSON.stringify(cv)
            ].join('\n')
          },
          {
            role: 'user',
            content: cleanMessage
          }
        ],
        temperature: 0.4
      })
    });

    const data = await openRouterResponse.json().catch(() => ({}));

    if (!openRouterResponse.ok) {
      return sendJson(res, openRouterResponse.status, {
        error: data.error?.message || 'OpenRouter API error'
      });
    }

    return sendJson(res, 200, {
      reply: data.choices?.[0]?.message?.content || 'Không có phản hồi.'
    });
  } catch (error) {
    return sendJson(res, 500, { error: 'AI error' });
  }
}
