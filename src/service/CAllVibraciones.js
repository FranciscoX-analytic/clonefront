import axios from 'axios';

export async function getVibraciones() {
  const setUrl = 'http://localhost:8080/api-sakai/roadmap/sierraGorda/HPGR/vibraciones/';
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

export async function getVibracionesParams(equipo,component, start, end ) {
  const setUrl = `http://localhost:8080/api-sakai/roadmap/sierraGorda/HPGR/vibracionesParams/${equipo}/${component}/${start}/${end}`;
  console.log(setUrl)
  try {
    const response = await axios.get(setUrl, {
      withCredentials: true ,
      

    });
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getComponentesByTag(equipo ) {
  const setUrl = `http://localhost:8080/api-sakai/roadmap/sierraGorda/HPGR/componentesByTag/${equipo}`;
  console.log("probando componentes por equipo",setUrl)
  try {
    const response = await axios.get(setUrl, {
      withCredentials: true ,
      

    });
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}