'use server';

/**
 * @fileOverview An AI agent that fills missing sections of a python file.
 *
 * - fillMissingSections - A function that fills missing sections of a python file using AI.
 */

import {ai} from '@/ai/genkit';
import type { FillMissingSectionsInput, FillMissingSectionsOutput } from '@/lib/schemas';
import { FillMissingSectionsInputSchema, FillMissingSectionsOutputSchema } from '@/lib/schemas';


export async function fillMissingSections(
  input: FillMissingSectionsInput
): Promise<FillMissingSectionsOutput> {
  return fillMissingSectionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fillMissingSectionsPrompt',
  input: {schema: FillMissingSectionsInputSchema},
  output: {schema: FillMissingSectionsOutputSchema},
  prompt: `You are an AI expert in generating Python code for various file types. Your task is to generate ONLY the content for the specified empty section based on the file type, the context, and the existing code in other sections.

File Type: {{{fileType}}}

Section to Generate: {{{sectionToGenerate}}}

- If fileType is 'api.py':
  - The 'header' should contain FastAPI imports, app instance creation, and imports for logic/schema.
  - The 'middle' should define API endpoints (e.g., @app.post("/predict")).
  - The 'footer' should include helper functions or a 'uvicorn' runner block.
- If fileType is 'schema.py':
  - The 'header' should contain Pydantic's BaseModel import.
  - The 'middle' should define Pydantic models for request/response data.
  - The 'footer' can include complex validation or custom types.
- If fileType is 'logic.py':
  - The 'header' should import libraries for business logic (e.g., pandas, joblib).
  - The 'middle' should implement core business logic functions.
  - The 'footer' can contain utility/helper functions.

Shared Context from other files and user:
{{{context}}}

Existing Code in '{{{fileType}}}':

# Header
{{{header}}}

# Middle
{{{middle}}}

# Footer
{{{footer}}}

Based on all the information above, generate the python code for the '{{{sectionToGenerate}}}' section ONLY. Do not generate the other sections.`,
});

const fillMissingSectionsFlow = ai.defineFlow(
  {
    name: 'fillMissingSectionsFlow',
    inputSchema: FillMissingSectionsInputSchema,
    outputSchema: FillMissingSectionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      header: output!.header,
      middle: output!.middle,
      footer: output!.footer,
    };
  }
);
