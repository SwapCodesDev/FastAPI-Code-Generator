'use server';

/**
 * @fileOverview A flow to generate an entire Python file (header, middle, and footer) from a single prompt.
 * @deprecated Use generate-all-files flow instead.
 */

import {ai} from '@/ai/genkit';
import { fillMissingSections } from './fill-missing-sections';
import { GenerateFileFromPromptInputSchema, FillMissingSectionsOutputSchema, type GenerateFileFromPromptInput, type GenerateFileFromPromptOutput } from '@/lib/schemas';


export async function generateFileFromPrompt(input: GenerateFileFromPromptInput): Promise<GenerateFileFromPromptOutput> {
  return generateFileFromPromptFlow(input);
}

const generateFileFromPromptFlow = ai.defineFlow(
  {
    name: 'generateFileFromPromptFlow',
    inputSchema: GenerateFileFromPromptInputSchema,
    outputSchema: FillMissingSectionsOutputSchema,
  },
  async input => {
    // Re-use the fillMissingSections flow to ensure consistency
    const result = await fillMissingSections({
      fileType: input.fileType,
      context: input.context,
    });
    return result;
  }
);
