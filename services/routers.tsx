import axios from 'axios';
import { UPDATE_STATUS } from '../utils/const';
export const postForm = async (data:FormData) =>{
   try{
       console.log(data);
       const resp = await axios.post('http://localhost:5000/add', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        })
        console.log(resp.status);
        if(resp.status === 200){
            UPDATE_STATUS(true)
        }
    }catch(err){
        UPDATE_STATUS(false)
    }
}
export const postJob = async (data: any) =>{
   try{
        const resp = await axios.post('http://localhost:5000/assignJob',data)
        if(resp.status === 200){
            UPDATE_STATUS(true)
        }

   }catch(err){
        console.log(err);
        UPDATE_STATUS(false)
   }
}
export const getJobList = async() =>{
    try{
        const resp = await axios.post('http://localhost:5000/getJobList');
        if(resp.status === 200){
            //console.log(resp.data.data[0])
            resp.data.data.map((value: any) =>{console.log(value.job_type)})
            return resp.data;
        }
    }catch(err){
        console.error(err);
    } 
}