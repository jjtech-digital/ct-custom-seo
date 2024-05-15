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
  const apiUrl = `https://api.australia-southeast1.gcp.commercetools.com/jj-seo-app/products/${productId}`;
  const accessToken = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  // let version = 1;
  const data = {
    version: version,
    actions: [
      {
        action: 'setMetaTitle',
        metaTitle: {
          [dataLocale]: metaTitle,
        },
        staged: false,
      },
      {
        action: 'setMetaDescription',
        metaDescription: {
          [dataLocale]: metaDescription,
        },
        staged: false,
      },
    ],
  };
  try {
    const response = await axios.post(apiUrl, data, { headers });
    // version = response.data.version;
    setState((prev: any) => ({
      ...prev,
      notificationMessage: 'SEO title and description updated successfully.',
      notificationMessageType: 'success',
    }));
    console.log('Product description updated successfully:', response.data);
  } catch (error) {
    setState((prev: any) => ({
      ...prev,
      notificationMessage: 'Error updating SEO title and description.',
      notificationMessageType: 'error',
    }));
    console.error('Error updating product description:', error);
  }
};
