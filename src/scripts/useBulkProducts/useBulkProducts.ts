import { bulkGenerateSeoMetaData } from '../fetcherFunction/bulkSeoMetaDataFetchers';

export function useBulkProducts() {
  const getBulkSeoMetaData = async (productIds: string[]) => {
    const response = await bulkGenerateSeoMetaData(productIds);
    return response;
  };

  return {
    getBulkSeoMetaData,
  };
}
