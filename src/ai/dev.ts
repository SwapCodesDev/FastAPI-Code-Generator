import { config } from 'dotenv';
config();

import '@/ai/flows/fix-code.ts';
import '@/ai/flows/generate-file-from-prompt.ts';
import '@/ai/flows/fill-missing-sections.ts';
import '@/ai/flows/generate-all-files.ts';
