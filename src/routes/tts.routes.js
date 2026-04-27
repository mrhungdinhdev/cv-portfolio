import { Router } from 'express';
import { createSpeechAudio } from '../services/openai-tts.service.js';

export const ttsRouter = Router();

ttsRouter.post('/', async (req, res, next) => {
  try {
    const audio = await createSpeechAudio({
      text: req.body?.text,
      language: req.body?.language || req.body?.pageLanguage
    });

    res
      .status(200)
      .set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': String(audio.length),
        'Cache-Control': 'no-store'
      })
      .end(audio);
  } catch (error) {
    next(error);
  }
});
