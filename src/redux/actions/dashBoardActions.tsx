import * as dashBoardAction from '../actionTypes/dashBoardActionTypes';
import { getJobDetails } from '../../services/routers';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
export const fetchTableValues = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => (
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const jobDetails = getJobDetails()
    jobDetails.then((result): void => {
      dispatch(updateTableValues(result.data))
    })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchUsersFailure(error.message))
      })
  })

export const fetchFilteredVales = (filterKeys: any) => {
  return {
    type: dashBoardAction.FETCH_FILTER_VALUES,
    FilterKeys: filterKeys,
  }
}

export const fetchUsersRequest = () => {
  return {
    type: dashBoardAction.FETCH_USERS_REQUEST
  }
}

export const updateTableValues = (list: any) => {
  return {
    type: dashBoardAction.FETCH_USERS_SUCCESS,
    payload: list,
  }
}
export const fetchUsersFailure = (error: any) => {
  return {
    type: dashBoardAction.FETCH_USERS_FAILURE,
    payload: error
  }
}
