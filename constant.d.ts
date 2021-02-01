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

type DispatchType = (args: FormAction) => FormAction;