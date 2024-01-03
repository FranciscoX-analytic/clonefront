import axios from 'axios';

export const incidenciaFalla = async ()=>{
    try{
        const response = await axios.get("http://localhost/api-sakai/incidenciaFalla");
        return response.data
    }
    catch(error){
        console.error(error);
        throw error;
    }
};