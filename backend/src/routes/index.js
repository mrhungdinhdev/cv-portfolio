import { Router } from 'express';
import { chatRouter } from './chat.routes.js';
import { ttsRouter } from './tts.routes.js';

export const apiRouter = Router();

apiRouter.use('/chat', chatRouter);
apiRouter.use('/tts', ttsRouter);
