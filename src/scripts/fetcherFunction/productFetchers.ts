import axios from 'axios';
import { apiBaseUrl } from '../../constants';

export const getAllProducts = async (limit:number,offset:number) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/products?limit=${limit}&offset=${offset}`
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
