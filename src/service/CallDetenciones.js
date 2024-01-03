import axios from 'axios';

export async function getDetenciones() {
  const setUrl = 'http://localhost:8080/api-sakai/roadmap/sierraGorda/HPGR/detenciones';
  try {
    const response = await axios.get(setUrl, {
      withCredentials: true 

    });
    // console.log("probando response desde api", response)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getDetencionesPorTag(tag, date) {
  const setUrl = `http://localhost:8080/api-sakai/roadmap/sierraGorda/HPGR/detencionesPorTag/${tag}/${date}`;
  // console.log('imprimiendo url',setUrl)
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
export async function getDetencionesFilterDate(start, end) {
  const setUrl = `http://localhost:8080/api-sakai/roadmap/sierraGorda/HPGR/detencionesFilterDate/${start}/${end}`;
  // console.log('imprimiendo url',setUrl)
  try {
    const response = await axios.get(setUrl, {
      withCredentials: true ,
     
    });
    // console.log("probando detencionees por fechas", response)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getListadoEquiposDetenciones() {
  const setUrl = 'http://localhost:8080/api-sakai/roadmap/sierraGorda/HPGR/listadoEquipoDetenciones';
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