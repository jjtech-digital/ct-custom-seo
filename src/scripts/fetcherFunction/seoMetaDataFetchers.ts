import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

export const generateSeoMetaData = async (productName:string) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: `Generate seo Title and seo Description for product ${productName}` }],
    model: "gpt-3.5-turbo",
  });
  return chatCompletion;
};
