import axios from 'axios';

export async function getSensores() {
  const setUrl = 'http://localhost:8080/api-sakai/roadmap/sierraGorda/HPGR/sensores/';
  try {
    const response = await axios.get(setUrl, {
      withCredentials: true 

    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSensoresFilters(columns, start, end) {
  const setUrl = `http://localhost:8080/api-sakai/roadmap/sierraGorda/HPGR/sensoresFilters/${columns}/${start}/${end}`;
  try {
    const response = await axios.get(setUrl, {
      withCredentials: true 

    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}