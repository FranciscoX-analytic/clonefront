import axios from 'axios';

export async function getResumenKpi(subsistema) {
    const setUrl = `http://localhost:8080/api-sakai/roadmap/sierraGorda/HPGR/resumen-kpi/${subsistema}`;
    console.log(setUrl)
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

  export async function getResumenLine() {
    const setUrl = 'http://localhost:8080/api-sakai/roadmap/sierraGorda/HPGR/resumen-line';
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