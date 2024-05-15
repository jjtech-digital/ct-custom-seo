import { getAllProducts } from '../fetcherFunction/productFetchers';
import {
  generateSeoMetaData,
  updateProductSeoMeta,
} from '../fetcherFunction/seoMetaDataFetchers';

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
  const updateProductSeoMetaData = async (
    productId: string,
    metaTitle: string,
    metaDescription: string,
    version: number,
    dataLocale: string| null,
    setState: Function
  ) => {
    const response = await updateProductSeoMeta(
      productId,
      metaTitle,
      metaDescription,
      version,
      dataLocale,
      setState
    );
    return response;
  };
  return { getAllProductsData, getSeoMetaData, updateProductSeoMetaData };
}
