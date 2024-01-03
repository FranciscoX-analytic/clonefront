import axios from 'axios';

export async function getLubricantes() {
  const setUrl = 'http://localhost:8080/api-sakai/roadmap/sierraGorda/HPGR/lubricantes/';
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
export async function getLubricantesFilters(equipo, start) {
  const setUrl = `http://localhost:8080/api-sakai/roadmap/sierraGorda/HPGR/lubricantesFilters/${equipo}/${start}`;
 
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
export async function getListadoEquiposAceites() {
  const setUrl = 'http://localhost:8080/api-sakai/roadmap/sierraGorda/HPGR/listadoEquipoAceites/';
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