import { env } from '../config/env.js';
import { loadCv } from './cv.service.js';

function responseLanguageFrom(language) {
  const requestedLanguage = String(language || 'en').toLowerCase();
  return requestedLanguage.startsWith('vi') ? 'Vietnamese' : 'English';
}

export async function createPortfolioReply({ message, language, origin }) {
  if (!env.openRouterApiKey) {
    const error = new Error('Missing OPENROUTER_API_KEY environment variable');
    error.statusCode = 500;
    throw error;
  }

  const cleanMessage = typeof message === 'string' ? message.trim() : '';

  if (!cleanMessage) {
    const error = new Error('Message is required');
    error.statusCode = 400;
    throw error;
  }

  const responseLanguage = responseLanguageFrom(language);
  const missingInfoMessage = responseLanguage === 'Vietnamese'
    ? 'Thông tin này chưa có trong portfolio.'
    : 'This information is not available in the portfolio.';
  const cv = await loadCv();

  let response;

  try {
    response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      signal: AbortSignal.timeout(env.openRouterTimeoutMs),
      headers: {
        'Content-Type': 'application/json',
        'HTTP-Referer': env.openRouterSiteUrl || origin || 'http://localhost:3000',
        'X-OpenRouter-Title': env.openRouterSiteName,
        Authorization: `Bearer ${env.openRouterApiKey}`
      },
      body: JSON.stringify({
        model: env.openRouterModel,
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
  } catch (error) {
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      const timeoutError = new Error('OpenRouter API timed out');
      timeoutError.statusCode = 504;
      throw timeoutError;
    }

    throw error;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.error?.message || 'OpenRouter API error');
    error.statusCode = response.status;
    throw error;
  }

  return data.choices?.[0]?.message?.content || 'Không có phản hồi.';
}
