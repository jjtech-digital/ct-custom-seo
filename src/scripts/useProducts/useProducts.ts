import { getAllProducts } from '../fetcherFunction/productFetchers';
export function useProducts() {
  const getAllProductsData = async () => {
    const response = await getAllProducts();
    return response;
  };
  return{getAllProductsData}
}
