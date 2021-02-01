import * as actionTypes from '../actionTypes/formActiontypes';
import * as actionFile from '../actionTypes/fileActionTypes';
import * as errorTypes from '../actionTypes/formErrorTypes';
export const addUser = () =>({
    type :actionTypes.ADD_USER,
});

export const addChange = (field:any,fieldValue:any) =>({
    type: actionTypes.ADD_CHANGE,
    payload:{
        field,
        fieldValue
    }
})
export const addError = (field:any) =>({
    type: errorTypes.ADD_ERROR,
    payload:{
        field
    }
})

export const removeError = (field:any) =>({
    type: errorTypes.REMOVE_ERROR,
    payload:{
        field
    }
})
export const addImage = (fieldValue:any) =>({
    type:actionFile.ADD_IMAGE,
    payload:{
        fieldValue    
    }
})
export const addFile = (fieldValue:any) =>({
    type:actionFile.ADD_FILE,
    payload:{
        fieldValue    
    }
})