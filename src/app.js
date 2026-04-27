import express from 'express';
import compression from 'compression';
import { join } from 'node:path';
import { apiRouter } from './routes/index.js';
import { env } from './config/env.js';

function localCors(req, res, next) {
  const origin = req.headers.origin || '';

  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  }

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    next(error);
    return;
  }

  res.status(error.statusCode || 500).json({
    error: error.message || 'Internal server error'
  });
}

export function createApp() {
  const app = express();

  app.disable('x-powered-by');

  app.use(compression({
    threshold: 1024,
    level: 6
  }));

  app.use('/api', localCors);
  app.use('/api', express.json({ limit: '1mb' }), apiRouter);

  app.get('/favicon.ico', (req, res) => {
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.sendFile(join(env.publicDir, 'assets', 'images', 'favicon-32.png'));
  });

  app.get('/assets/favicon.png', (req, res) => {
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.sendFile(join(env.publicDir, 'assets', 'images', 'favicon-32.png'));
  });

  app.get('/icon.png', (req, res) => {
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.sendFile(join(env.publicDir, 'assets', 'images', 'icon-384.jpg'));
  });

  app.use(express.static(env.publicDir, {
    extensions: ['html'],
    etag: true,
    setHeaders(res, filePath) {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
        return;
      }

      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }));

  app.get('/', (req, res) => {
    res.sendFile(join(env.publicDir, 'index.html'));
  });

  app.use('/api', (req, res) => {
    res.status(404).json({ error: 'API route not found' });
  });

  app.use('/api', errorHandler);

  return app;
}
