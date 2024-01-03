import axios from 'axios';

export const getProductsData = async () => {
  try {
    const response = await axios.get("http://localhost/api-sakai/productsData");
  
    return response.data;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* export default getProductsData; */