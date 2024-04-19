import axios from 'axios';

export const getAllProducts = async (limit:number,offset:number) => {
  try {
    const response = await axios.get(
      `https://ct-custom-seo-be.vercel.app/products?limit=${limit}&offset=${offset}`
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
