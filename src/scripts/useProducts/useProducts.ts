import { getAllProducts } from '../fetcherFunction/productFetchers';
import { generateSeoMetaData } from '../fetcherFunction/seoMetaDataFetchers';

export function useProducts() {
  const getAllProductsData = async (
    limit: number,
    offset: number,
    setState: Function
  ) => {
    const response = await getAllProducts(limit, offset, setState);
    return response;
  };

  const getSeoMetaData = async (productId: string) => {
    const response = await generateSeoMetaData(productId);
    return response;
  };
  return { getAllProductsData, getSeoMetaData };
}
