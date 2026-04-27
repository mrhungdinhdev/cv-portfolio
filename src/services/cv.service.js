import { readFile } from 'node:fs/promises';
import { env } from '../config/env.js';

let cvCache;

export async function loadCv() {
  if (!cvCache) {
    const raw = await readFile(env.cvPath, 'utf8');
    cvCache = JSON.parse(raw);
  }

  return cvCache;
}
