import OpenAI from 'openai';

const apiKey =
  typeof process !== 'undefined' && process.env.OPENAI_API_KEY
    ? process.env.OPENAI_API_KEY
    : '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';
const model =
  typeof process !== 'undefined' && process.env.OPENAI_MODEL
    ? process.env.OPENAI_MODEL
    : 'gpt-3.5-turbo';

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

export const generateSeoMetaData = async (productName:string) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: `Generate seo Title and seo Description for product ${productName}` }],
    model: model,
  });
  return chatCompletion;
};
