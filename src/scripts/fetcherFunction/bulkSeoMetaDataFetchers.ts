import axios from 'axios';
import { apiBaseUrl } from '../../constants';

export const bulkGenerateSeoMetaData = async (
  productIds: string[],
  dataLocale: any
) => {
  const accessToken = localStorage.getItem('token');
  const batchSize = 20;
  const totalBatches = Math.ceil(productIds.length / batchSize);
  let metaDataResponses: any[] = [];

  for (let i = 0; i < totalBatches; i++) {
    const start = i * batchSize;
    const end = Math.min((i + 1) * batchSize, productIds.length);
    const batchIds = productIds.slice(start, end);

    const body = {
      ids: batchIds,
      token: accessToken,
      locale: dataLocale,
    };

    try {
      const response = await axios.post(
        `${apiBaseUrl}/products/bulk-generate-meta-data`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      metaDataResponses = [...metaDataResponses, ...response.data];
    } catch (error) {
      console.error('Error generating SEO metadata in batch:', error);
    }
  }

  return metaDataResponses;
};
