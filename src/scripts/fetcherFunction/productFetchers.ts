import axios from 'axios';

export const getAllProducts = async () => {
  try {
    const response = await axios.get(
      'https://ct-custom-seo-be.vercel.app/products'
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
