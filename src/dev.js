import { createServer } from 'node:http';
import { createApp } from './app.js';
import { env } from './config/env.js';

function startServer(port, attemptsLeft) {
  const server = createServer(createApp());

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
    console.log(`Portfolio Express server: http://localhost:${port}`);
  });
}

startServer(env.port, env.maxPortAttempts);