import { FormAction, IFormState, IFileState, FileAction } from '../../constant'
import * as actionTypes from '../actionTypes/formActiontypes'
import * as actionFile from '../actionTypes/fileActionTypes';

export const initialState: IFormState = {
    firstName: "",
    lastName: "",
    mobile: "",
    emailId: "",
    password: "",
    confirmPassword: "",
}
export const formReducer = (
    state: IFormState = initialState,
    action: FormAction
): IFormState | any => {
    switch (action.type) {
        case actionTypes.ADD_CHANGE:
            return {
                ...state,
                [action.payload.field]: action.payload.fieldValue
            }
        case actionTypes.ADD_USER:
            return state;

        default:
            return state;
    }
}
export const fileState: IFileState = {
    userImage:"",
    userFile:""
}
export const fileReducer = (
    state: IFileState = fileState,
    action: FileAction
): IFileState | any => {
    switch (action.type) {
        case actionFile.ADD_IMAGE:
            return {
                ...state,
                userImage: action.payload.fieldValue
            }
        case actionFile.ADD_FILE:
            return{
                ...state,
                userFile: action.payload.fieldValue
            }
        default:
            return state
    }
}
