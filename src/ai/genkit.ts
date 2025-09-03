
// AI configuration file for Genkit integration.
// Sets up the Genkit AI client with Google Gemini model for resume parsing and improvement flows.
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Exported AI client instance configured with Google Gemini 2.0 Flash model.
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash', // Used for all AI-powered resume features
});
