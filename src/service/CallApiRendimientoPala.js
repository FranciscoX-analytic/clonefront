import axios from 'axios';

export async function getLubricantePrediccion(start, end, equipo) {
  const setUrl = `http://localhost:8080/api-sakai/roadmap/sierraGorda/HPGR/lubricantePrediccion/${start}/${end}/${equipo}`;
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

export async function getListadoEquipos() {
  const setUrl = 'http://localhost:8080/api-sakai/roadmap/sierraGorda/HPGR/listadoEquipos';
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

export async function getListadoEquiposVibraciones() {
  const setUrl = 'http://localhost:8080/api-sakai/roadmap/sierraGorda/HPGR/listadoEquiposVibraciones';
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
