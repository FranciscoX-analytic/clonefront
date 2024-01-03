import axios from 'axios';

export const rankingAnomaliaPala = async ()=>{
    try{
        const response = await axios.get("http://localhost/api-sakai/rankingAnomaliaPala");
        return response.data
    }
    catch(error){
        console.error(error);
        throw error;
    }
};