import axios from 'axios';
import { apiBaseUrl } from '../../constants';

export const generateSeoMetaData = async (productId: string) => {
  const accessToken = localStorage.getItem('token');
  const body = {
    id: productId,
    token: accessToken
  };
  
  try {
    const response = await axios.post(
      `${apiBaseUrl}/products/generate-meta-data`,
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
