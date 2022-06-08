/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-empty-function */
import { AlertColor } from '@mui/material/Alert'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as _ from 'lodash'

export interface ISnackBarProps {
  open?: boolean
  messege: string
  severity: AlertColor
  autHideDuriation?: number
}

const initialState: ISnackBarProps = {
  open: false,
  messege: '',
  severity: 'info',
  autHideDuriation: 6000,
}

export const snackBarSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<ISnackBarProps>) => {
      state.open = true
      state.messege = action.payload.messege
      state.severity = action.payload.severity
      state.autHideDuriation = _.get(action, 'payload.autHideDuriation', 6000)
    },
    closeSnackbar: (state) => {
      state.open = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { openSnackbar, closeSnackbar } = snackBarSlice.actions

export default snackBarSlice.reducer
