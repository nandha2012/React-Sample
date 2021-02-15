import { filterTable, ITableValue, UpdateTableAction } from '../../constant';
import * as dashBoardAction from '../actionTypes/dashBoardActionTypes'
const initialState = {
    loading: false,
    users: [],
    error: ''
}
const initialFilterState = {
    loading: false,
    filterKeys:{
        fromDate:null,
        endDate:null,
        status: "",
        payment: "",
        searchkey: ""
    },
    error: ''
}
export const dashBoardReducer =
    (state = initialState, action: UpdateTableAction): any => {
        switch (action.type) {
            case dashBoardAction.FETCH_USERS_SUCCESS:
                return {
                    loading: false,
                    users: action.payload,
                    error: ''
                }
            case dashBoardAction.FETCH_USERS_FAILURE:
                return {
                    loading: false,
                    users: [],
                    error: action.payload
                }
            case dashBoardAction.FETCH_USERS_REQUEST:
                return {
                    ...state,
                    loading: true
                }
            default:
                return state;
        }
    }
export const FilterReducer = (state = initialFilterState ,action:filterTable):any => {
    switch (action.type) {
        case dashBoardAction.FETCH_FILTER_VALUES:
            return{
                loading:false,
                filterKeys:action.FilterKeys,
                error:''
            }
        default :
            return state;
    }
}