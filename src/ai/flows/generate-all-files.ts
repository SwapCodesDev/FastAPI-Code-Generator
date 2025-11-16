'use server';

/**
 * @fileOverview A flow to generate an entire set of Python files (api.py, schema.py, logic.py) from a single prompt.
 *
 * - generateAllFiles - A function that handles the multi-file generation process.
 */

import { ai } from '@/ai/genkit';
import { GenerateAllFilesInputSchema, GenerateAllFilesOutputSchema } from '@/lib/schemas';
import type { GenerateAllFilesInput, GenerateAllFilesOutput } from '@/lib/schemas';

export async function generateAllFiles(input: GenerateAllFilesInput): Promise<GenerateAllFilesOutput> {
  return generateAllFilesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAllFilesPrompt',
  input: { schema: GenerateAllFilesInputSchema },
  output: { schema: GenerateAllFilesOutputSchema },
  prompt: `You are an AI expert in generating Python code for FastAPI applications. Based on the provided prompt and context, generate the content for all three required files: 'api.py', 'schema.py', and 'logic.py'.

Ensure the generated code is consistent, follows best practices, and correctly separates concerns across the files.

**User Prompt:**
{{{prompt}}}

**Shared Context (Optional):**
{{{context}}}

**File-specific Instructions:**

- **For 'api.py' (in the 'api' output field):**
  - **Header:** Import FastAPI. Create a FastAPI app instance. Import schemas from 'schema.py' and logic from 'logic.py'.
  - **Middle:** Define API endpoints (e.g., @app.post("/predict")). The endpoint must call functions from 'logic.py' to perform the main operations and use schemas from 'schema.py' for request/response models.
  - **Footer:** Include a 'uvicorn' runner block if applicable (e.g., if __name__ == "__main__":).

- **For 'schema.py' (in the 'schema' output field):**
  - **Header:** Import BaseModel from Pydantic and other typing modules.
  - **Middle:** Define Pydantic models for all request and response data structures used by the API in 'api.py'.
  - **Footer:** Can be empty or include complex validation logic if needed.

- **For 'logic.py' (in the 'logic' output field):**
  - **Header:** Import necessary libraries for business logic (e.g., pandas, joblib, sklearn). Import schemas from 'schema.py' for type hinting if needed.
  - **Middle:** Implement the core business logic functions. These functions will be called by 'api.py'.
  - **Footer:** Can be empty or contain utility/helper functions needed for the core logic.

Generate the complete content for the header, middle, and footer sections for each of the three files.`,
});


const generateAllFilesFlow = ai.defineFlow(
  {
    name: 'generateAllFilesFlow',
    inputSchema: GenerateAllFilesInputSchema,
    outputSchema: GenerateAllFilesOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
