import axios from 'axios';

export const chartData = async ()=>{
    try{
        const response = await axios.get("http://localhost/api-sakai/chartData");
        return response.data
    }
    catch(error){
        console.error(error);
        throw error;
    }
};