// src/ai/genkit.ts

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({
      // Add this line to pass your API key
      apiKey: process.env.AIzaSyCRg3EdmVW2iGp12M37RsgZMqxMkSMhs2c, 
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
