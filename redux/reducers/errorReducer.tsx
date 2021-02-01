import { IErrorState, ErrorAction } from "../../constant";
import * as errorActionTypes from '../actionTypes/formErrorTypes';


export const initialErrorState: IErrorState = {
    error_email: false,
    error_password: false,
    error_Cpassword: false,
    error_mobile: false,
    error_checked: false,
    error_validate: false
}

export const errorReducer = (
    state: IErrorState = initialErrorState,
    action: ErrorAction
    ): IErrorState | any => {
    switch (action.type) {
        case errorActionTypes.ADD_ERROR:
            return {
                ...state,
                
                [action.payload.field]: true
            }
        case errorActionTypes.REMOVE_ERROR:
            return {
                ...state,
                [action.payload.field]: false
            }
        default:
            return state;
    }
}



