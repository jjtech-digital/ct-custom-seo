import axios from 'axios';
import { apiBaseUrl } from '../../constants';

export const generateSeoMetaData = async (productId: string) => {
  const accessToken = localStorage.getItem('token');
  const body = {
    id: productId,
    token: accessToken,
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
  version: number
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
          de: metaTitle,
          en: metaTitle,
        },
        staged: false,
      },
      {
        action: 'setMetaDescription',
        metaDescription: {
          de: metaDescription,
          en: metaDescription,
        },
        staged: false,
      },
    ],
  };
  try {
    const response = await axios.post(apiUrl, data, { headers });
    // version = response.data.version;
    console.log('Product description updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating product description:', error);
    return null;
  }
};
