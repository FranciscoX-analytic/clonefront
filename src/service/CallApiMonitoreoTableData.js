import axios from 'axios'

export const monitoreoTableData = async ()=>{
    try{
        const response = await axios.get("http://localhost/api-sakai/monitoreoTableData");
        return response.data
    }
    catch(error){
        console.error(error);
        throw error;
    }
};