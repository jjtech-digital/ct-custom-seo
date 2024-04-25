import axios from 'axios';

export const generateSeoMetaData = async (productName: any) => {
  const body = {
    query: productName
  };
  try {
    const response = await axios.post(
      `https://ct-custom-seo-be.vercel.app/products/generate-meta-data`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response?.data?.data;
  } catch (error) {
    console.error('Error generating SEO metadata:', error);
    return null; 
  }
};
