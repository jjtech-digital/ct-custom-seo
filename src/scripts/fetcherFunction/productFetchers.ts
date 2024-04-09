import axios from 'axios';

export const getAllProducts = async () => {
  try {
    const response = await axios.get('http://localhost:4000/products');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
