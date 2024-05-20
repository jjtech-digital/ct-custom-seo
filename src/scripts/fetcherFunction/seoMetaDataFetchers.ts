import axios from 'axios';
import { apiBaseUrl } from '../../constants';

export const generateSeoMetaData = async (
  productId: string,
  dataLocale: any
) => {
  const accessToken = localStorage.getItem('token');
  const body = {
    id: productId,
    token: accessToken,
    locale: dataLocale,
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

export const updateProductSeoMeta = async (
  productId: string,
  metaTitle: string,
  metaDescription: string,
  version: number,
  dataLocale: any,
  setState: Function
) => {
  const accessToken = localStorage.getItem('token');
  const body = {
    metaTitle,
    metaDescription,
    version,
    dataLocale,
  };

  try {
    const response = await axios.post(
      `${apiBaseUrl}/products/update-seo-meta/${productId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    setState((prev: any) => ({
      ...prev,
      notificationMessage: 'SEO title and description updated successfully.',
      notificationMessageType: 'success',
    }));
    return response.data;
  } catch (error) {
    setState((prev: any) => ({
      ...prev,
      notificationMessage: 'Error updating SEO title and description.',
      notificationMessageType: 'error',
    }));
    console.error('Error updating product SEO meta:', error);
  }
};
