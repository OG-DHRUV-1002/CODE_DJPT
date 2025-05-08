// 'use server';

/**
 * @fileOverview Converts code from one language to another.
 *
 * - convertCode - A function that handles the code conversion process.
 * - ConvertCodeInput - The input type for the convertCode function.
 * - ConvertCodeOutput - The return type for the convertCode function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConvertCodeInputSchema = z.object({
  sourceCode: z.string().describe('The source code to be converted.'),
  sourceLanguage: z.string().describe('The programming language of the source code.'),
  targetLanguage: z.string().describe('The programming language to convert the code to.'),
});
export type ConvertCodeInput = z.infer<typeof ConvertCodeInputSchema>;

const ConvertCodeOutputSchema = z.object({
  convertedCode: z.string().describe('The converted code in the target language.'),
});
export type ConvertCodeOutput = z.infer<typeof ConvertCodeOutputSchema>;

export async function convertCode(input: ConvertCodeInput): Promise<ConvertCodeOutput> {
  return convertCodeFlow(input);
}

// Define the code block template separately to avoid parsing issues with nested backticks and handlebars.
const codeBlockTemplate = `\`\`\`{{sourceLanguage}}\n{{{sourceCode}}}\n\`\`\``;

const convertCodePrompt = ai.definePrompt({
  name: 'convertCodePrompt',
  input: {schema: ConvertCodeInputSchema},
  output: {schema: ConvertCodeOutputSchema},
  prompt: `You are a code conversion expert. Convert the following code from {{sourceLanguage}} to {{targetLanguage}}.\n\n${codeBlockTemplate}\n\nProvide the converted code in the target language. Enclose the code in markdown code blocks, and do not include any other explanation or context.`,
});

const convertCodeFlow = ai.defineFlow(
  {
    name: 'convertCodeFlow',
    inputSchema: ConvertCodeInputSchema,
    outputSchema: ConvertCodeOutputSchema,
  },
  async input => {
    const {output} = await convertCodePrompt(input);
    return output!;
  }
);
