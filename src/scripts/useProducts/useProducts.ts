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

  const getSeoMetaData = async (name: string) => {
    const response = await generateSeoMetaData(name);
    return response;
  };
  return { getAllProductsData, getSeoMetaData };
}
