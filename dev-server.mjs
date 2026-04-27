import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createReadStream, existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import chatHandler from './api/chat.js';
import ttsHandler from './api/tts.js';

const root = fileURLToPath(new URL('.', import.meta.url));
const preferredPort = Number(process.env.PORT || 3000);
const maxPortAttempts = process.env.PORT ? 1 : 10;

async function loadDotEnv() {
  try {
    const envText = await readFile(join(root, '.env'), 'utf8');
    envText.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) return;
      const index = trimmed.indexOf('=');
      const key = trimmed.slice(0, index).trim();
      const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, '');
      if (key && process.env[key] === undefined) process.env[key] = value;
    });
  } catch {
    // Local development still works for static files without an .env file.
  }
}

function contentType(filePath) {
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain; charset=utf-8'
  };
  return types[extname(filePath).toLowerCase()] || 'application/octet-stream';
}

function cacheHeaders(relative) {
  if (relative === 'index.html') {
    return { 'Cache-Control': 'no-cache' };
  }

  if (/\.(?:css|js|json|png|jpe?g|svg|txt)$/i.test(relative)) {
    return { 'Cache-Control': 'public, max-age=31536000, immutable' };
  }

  return { 'Cache-Control': 'no-cache' };
}

function serveStatic(req, res) {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(url.pathname);
  const relative = pathname === '/'
    ? 'index.html'
    : pathname === '/favicon.ico'
      ? 'assets/favicon-32.png'
      : pathname.replace(/^\/+/, '');
  const filePath = normalize(join(root, relative));

  if (
    relative.startsWith('.') ||
    relative.startsWith('api/') ||
    !filePath.startsWith(root) ||
    !existsSync(filePath)
  ) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  res.writeHead(200, {
    'Content-Type': contentType(filePath),
    ...cacheHeaders(relative)
  });
  createReadStream(filePath).pipe(res);
}

await loadDotEnv();

function setLocalCors(req, res) {
  const origin = req.headers.origin || '';
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  }
}

function handleRequest(req, res) {
  const path = req.url || '';

  if (path.startsWith('/api/')) {
    setLocalCors(req, res);
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }
  }

  if (path.startsWith('/api/chat')) {
    chatHandler(req, res);
    return;
  }

  if (path.startsWith('/api/tts')) {
    ttsHandler(req, res);
    return;
  }

  serveStatic(req, res);
}

function startServer(port, attemptsLeft) {
  const server = createServer(handleRequest);

  server.on('error', error => {
    if (error.code === 'EADDRINUSE' && attemptsLeft > 1) {
      const nextPort = port + 1;
      console.warn(`Port ${port} is in use, trying ${nextPort}...`);
      startServer(nextPort, attemptsLeft - 1);
      return;
    }

    console.error(error);
    process.exitCode = 1;
  });

  server.listen(port, () => {
    console.log(`Portfolio dev server: http://localhost:${port}`);
  });
}

startServer(preferredPort, maxPortAttempts);
