import { Router } from 'express';
import { createPortfolioReply } from '../services/openrouter.service.js';

export const chatRouter = Router();

chatRouter.post('/', async (req, res, next) => {
  try {
    const reply = await createPortfolioReply({
      message: req.body?.message,
      language: req.body?.language || req.body?.pageLanguage,
      origin: req.headers.origin
    });

    res.json({ reply });
  } catch (error) {
    next(error);
  }
});
