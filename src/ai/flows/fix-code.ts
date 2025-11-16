'use server';
/**
 * @fileOverview An AI agent to identify and fix errors or improve the quality of code.
 *
 * - fixCode - A function that handles the code fixing process.
 */

import {ai} from '@/ai/genkit';
import { z } from 'zod';
import type { FixCodeInput, FixCodeOutput } from '@/lib/schemas';
import { FixCodeInputSchema, FixCodeOutputSchema } from '@/lib/schemas';


export async function fixCode(input: FixCodeInput): Promise<FixCodeOutput> {
  return fixCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fixCodePrompt',
  input: {schema: FixCodeInputSchema},
  output: {schema: FixCodeOutputSchema},
  prompt: `You are an AI expert in identifying and fixing errors in Python code for FastAPI applications.

You will receive a piece of code that belongs to a specific section of a file ('api.py', 'schema.py', or 'logic.py').
Your goal is to identify any errors or potential improvements in the code and provide a fixed version.
If no fixes are needed, return the original code.

File Type: {{{fileType}}}
Section of the file this code belongs to: {{{section}}}

Code to fix:
\`\`\`python
{{{code}}}
\`\`\`

Shared context from user or other files:
{{{context}}}

Provide the fixed code and a brief explanation of the changes made.
`,
});

const fixCodeFlow = ai.defineFlow(
  {
    name: 'fixCodeFlow',
    inputSchema: FixCodeInputSchema,
    outputSchema: FixCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
