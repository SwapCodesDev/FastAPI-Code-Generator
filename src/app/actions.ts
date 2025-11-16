'use server';

import { z } from 'zod';
import { fillMissingSections } from '@/ai/flows/fill-missing-sections';
import { fixCode } from '@/ai/flows/fix-code';
import { generateSectionSchema, generateAllSchema, fixCodeSchema, type FillMissingSectionsInput } from '@/lib/schemas';
import { generateAllFiles } from '@/ai/flows/generate-all-files';

export async function generateSectionAction(input: z.infer<typeof generateSectionSchema>) {
  try {
    const aiInput: FillMissingSectionsInput = {
      fileType: input.fileType,
      context: input.context,
      header: input.header,
      middle: input.middle,
      footer: input.footer,
      sectionToGenerate: input.sectionToGenerate,
    };
    const result = await fillMissingSections(aiInput);
    
    // Ensure all parts are returned, even if they were part of the input
    // The AI only fills one part, so we merge it with the existing parts.
    const fullResult = {
      header: input.sectionToGenerate === 'header' && result.header ? result.header : input.header,
      middle: input.sectionToGenerate === 'middle' && result.middle ? result.middle : input.middle,
      footer: input.sectionToGenerate === 'footer' && result.footer ? result.footer : input.footer,
    };

    return { success: true, data: fullResult };
  } catch (error) {
    console.error("Error in generateSectionAction:", error);
    return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred.' };
  }
}

export async function generateAllAction(input: z.infer<typeof generateAllSchema>) {
  try {
    const result = await generateAllFiles({
      prompt: input.prompt,
      context: input.context,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in generateAllAction:", error);
    return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred.' };
  }
}

export async function fixCodeAction(input: z.infer<typeof fixCodeSchema>) {
  try {
    const result = await fixCode(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in fixCodeAction:", error);
    return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred.' };
  }
}
