import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  token: string
  id: string
  role: string
}

const initialState: AuthState = {
  token: '',
  id: '',
  role: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, payload: PayloadAction<AuthState>) => {
      console.log('login')
    },
    getCurrentUser: (state, payload: PayloadAction<AuthState>) => {
      console.log('get user')
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, getCurrentUser } = authSlice.actions

export default authSlice.reducer
