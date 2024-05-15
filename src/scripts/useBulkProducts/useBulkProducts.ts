import { bulkGenerateSeoMetaData } from '../fetcherFunction/bulkSeoMetaDataFetchers';

export function useBulkProducts() {
  const getBulkSeoMetaData = async (productIds: string[],dataLocale: string| null) => {
    const response = await bulkGenerateSeoMetaData(productIds,dataLocale);
    return response;
  };

  return {
    getBulkSeoMetaData,
  };
}
