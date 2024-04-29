import axios from 'axios';
import { apiBaseUrl } from '../../constants';

export const getAllProducts = async (
  limit: number,
  offset: number,
  setState: Function
) => {
  try {
    setState((prev: any) => ({ ...prev, pageLoading: true }));
    const response = await axios.get(
      `${apiBaseUrl}/products?limit=${limit}&offset=${offset}`
    );
    setState((prev: any) => ({ ...prev, pageLoading: false }));
    return response?.data;
  } catch (error) {
    setState((state: any) => ({ ...state, pageLoading: false }));
    console.log(error);
  }
};
