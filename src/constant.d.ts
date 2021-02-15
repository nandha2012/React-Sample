export interface IFormState {
    firstName:string;
    lastName:string;
    mobile:string;
    emailId:string;
    password:string;
    confirmPassword:string;
    
}
export interface IFileState{
    userImage:any;
    userFile:any;
}
export interface IErrorState {
        error_email: boolean;
        error_password: boolean;
        error_Cpassword: boolean;
		error_mobile: boolean;
		error_checked: boolean;
		error_validate: boolean;
}
export interface ITableValue {
    User_ID:number;
    service_Id:string;
    Job_Date:string;
    Name:string;
    Status:string;
    Payment:string;
    Job_type:string;
    Job_Description:string;
}

type FormAction ={
    type: string;
    payload: {
        field:string;
        fieldValue:string;
    }
};
type FileAction ={
    type: string;
    payload: {
        field:string;
        fieldValue:any;
    }
};
type ErrorAction = {
    type:string;
    payload:{
        field:string;
        fieldValue:string;
    }
}
type UpdateTableAction = {
    type:string;
    payload:any;
}
type filterTable = {
    type:string;
    FilterKeys:any;
}


type DispatchType = (args: FormAction) => FormAction;