import { getAllProducts } from '../fetcherFunction/productFetchers';
import { generateSeoMetaData } from '../fetcherFunction/seoMetaDataFetchers';

export function useProducts() {
  const getAllProductsData = async (limit: number, offset: number) => {
    const response = await getAllProducts(limit, offset);
    return response;
  };

  const getSeoMetaData = async (name:string) => {
    const response = await generateSeoMetaData(name);
    return response;
  };
  return { getAllProductsData, getSeoMetaData };
}
