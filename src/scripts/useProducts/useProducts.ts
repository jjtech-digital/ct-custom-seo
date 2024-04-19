import { getAllProducts } from '../fetcherFunction/productFetchers';
export function useProducts() {
  const getAllProductsData = async (limit:number,offset:number) => {
    const response = await getAllProducts(limit,offset);
    return response;
  };
  return{getAllProductsData}
}
