/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authSlice from './features/authSlice'
import snackBarSlice from './features/snackBarSlice'

export const store = configureStore({
  reducer: { auth: authSlice, snackbar: snackBarSlice },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
