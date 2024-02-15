// api.js
import axios from 'axios'; // Import Axios

const BASE_URL = "https://dummyjson.com/products";

export const fetchProducts = async () => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
