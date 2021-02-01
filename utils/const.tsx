export var POST_STATUS = true;
export const UPDATE_STATUS= (status:boolean) =>{
    if(status){
        POST_STATUS = status;
    }
    else {
        POST_STATUS = status;
    }
}
export interface JobDetails{
    name:string,
    jobType: string
}