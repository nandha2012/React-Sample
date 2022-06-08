import { Box, CssBaseline } from '@mui/material'
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import CustomizedSnackbars from './components/AdvanceSnackbar'
import CustomDrawer, { DrawerHeader } from './components/CustomDrawer'
import NavBar from './components/NavBar'
import { useAppDispatch, useAppSelector } from './hooks'
import { openSnackbar, closeSnackbar } from './redux/features/snackBarSlice'
import Home from './pages/home'
import SignIn from './pages/login'
import PrivateRoute from './components/AuthRoute'

function App() {
  const [drawerState, setDrawerState] = useState(false)
  const snackbar = useAppSelector((state) => state.snackbar)
  const dispatch = useAppDispatch()
  const handledrawerOpen = () => {
    setDrawerState(true)
  }
  const toggleDrawer = () => {
    setDrawerState(!drawerState)
  }
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default App
