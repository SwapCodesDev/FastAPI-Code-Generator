import { z } from 'zod';

export type FileType = 'api.py' | 'schema.py' | 'logic.py';

// Schemas for server actions
export const generateSectionSchema = z.object({
  sectionToGenerate: z.enum(['header', 'middle', 'footer']),
  header: z.string(),
  middle: z.string(),
  footer: z.string(),
  fileType: z.enum(['api.py', 'schema.py', 'logic.py']),
  context: z.string(),
});

export const generateAllSchema = z.object({
  prompt: z.string(),
  context: z.string(),
});

export const fixCodeSchema = z.object({
  code: z.string(),
  context: z.string(),
  fileType: z.enum(['api.py', 'schema.py', 'logic.py']),
  section: z.enum(['header', 'middle', 'footer']),
});


// Schemas for AI Flows

// From fill-missing-sections.ts
export const FillMissingSectionsInputSchema = z.object({
  header: z.string().optional().describe('The header section of the python file.'),
  middle: z.string().optional().describe('The middle section of the python file.'),
  footer: z.string().optional().describe('The footer section of the python file.'),
  fileType: z
    .enum(['api.py', 'schema.py', 'logic.py'])
    .describe('The type of python file to generate.'),
  context: z.string().optional().describe('Additional context to guide the AI generation.'),
  sectionToGenerate: z.enum(['header', 'middle', 'footer']).describe('The specific section to generate content for.'),
});
export type FillMissingSectionsInput = z.infer<typeof FillMissingSectionsInputSchema>;

export const FillMissingSectionsOutputSchema = z.object({
  header: z.string().describe('The generated header section of the python file.'),
  middle: z.string().describe('The generated middle section of the python file.'),
  footer: z.string().describe('The generated footer section of the python file.'),
});
export type FillMissingSectionsOutput = z.infer<typeof FillMissingSectionsOutputSchema>;

// From fix-code.ts
export const FixCodeInputSchema = z.object({
  code: z.string().describe('The code to be fixed or improved.'),
  context: z.string().optional().describe('Optional context for personalized fixing.'),
  fileType: z.enum(['api.py', 'schema.py', 'logic.py']).describe('The type of file the code belongs to.'),
  section: z.enum(['header', 'middle', 'footer']).describe('The section of the file the code belongs to.'),
});
export type FixCodeInput = z.infer<typeof FixCodeInputSchema>;

export const FixCodeOutputSchema = z.object({
  fixedCode: z.string().describe('The fixed or improved code.'),
  explanation: z
    .string()
    .optional()
    .describe('An explanation of the changes made, if any.'),
});
export type FixCodeOutput = z.infer<typeof FixCodeOutputSchema>;


// From generate-file-from-prompt.ts (deprecated, use generate-all-files)
export const GenerateFileFromPromptInputSchema = z.object({
  prompt: z.string().describe('A detailed prompt for generating the entire Python file, including header, middle, and footer sections.'),
  fileType: z
    .enum(['api.py', 'schema.py', 'logic.py'])
    .describe('The type of python file to generate.'),
  context: z.string().optional().describe('Additional context from other files to guide the AI generation.'),
});
export type GenerateFileFromPromptInput = z.infer<typeof GenerateFileFromPromptInputSchema>;
export type GenerateFileFromPromptOutput = FillMissingSectionsOutput;


// From generate-all-files.ts
const FileContentSchema = z.object({
    header: z.string().describe('The header section of the file.'),
    middle: z.string().describe('The middle section of the file.'),
    footer: z.string().describe('The footer section of the file.'),
});

export const GenerateAllFilesInputSchema = z.object({
  prompt: z.string().describe('A detailed prompt for generating the entire set of Python files.'),
  context: z.string().optional().describe('Additional context to guide the AI generation.'),
});
export type GenerateAllFilesInput = z.infer<typeof GenerateAllFilesInputSchema>;

export const GenerateAllFilesOutputSchema = z.object({
  api: FileContentSchema.describe('Content for api.py'),
  schema: FileContentSchema.describe('Content for schema.py'),
  logic: FileContentSchema.describe('Content for logic.py'),
});
export type GenerateAllFilesOutput = z.infer<typeof GenerateAllFilesOutputSchema>;
