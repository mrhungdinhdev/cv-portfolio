import { config } from 'dotenv';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../../..', import.meta.url));

config({ path: join(projectRoot, '.env') });

function numberFromEnv(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const env = {
  isProduction: process.env.NODE_ENV === 'production',
  port: numberFromEnv(process.env.PORT, 3001),
  maxPortAttempts: process.env.PORT ? 1 : 10,
  openRouterApiKey: process.env.OPENROUTER_API_KEY,
  openRouterModel: process.env.OPENROUTER_MODEL || 'openrouter/free',
  openRouterSiteUrl: process.env.OPENROUTER_SITE_URL,
  openRouterSiteName: process.env.OPENROUTER_SITE_NAME || 'DVH Portfolio AI Assistant',
  openRouterTimeoutMs: numberFromEnv(process.env.OPENROUTER_TIMEOUT_MS, 30000),
  openAiApiKey: process.env.OPENAI_API_KEY,
  openAiTtsModel: process.env.OPENAI_TTS_MODEL || 'gpt-4o-mini-tts',
  openAiTtsVoice: process.env.OPENAI_TTS_VOICE || 'cedar',
  openAiTimeoutMs: numberFromEnv(process.env.OPENAI_TIMEOUT_MS, 30000),
  projectRoot,
  publicDir: join(projectRoot, 'frontend', 'public'),
  cvPath: join(projectRoot, 'backend', 'data', 'cv.json')
};
