import { Box, CssBaseline } from '@mui/material'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { closeSnackbar } from '../../redux/features/snackBarSlice'
import CustomizedSnackbars from '../AdvanceSnackbar'
import CustomDrawer, { DrawerHeader } from '../CustomDrawer'
import NavBar from '../NavBar'

export default function Layout({ children }: any) {
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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar handledrawerOpen={handledrawerOpen} drawerState={drawerState} />
      <CustomDrawer
        options={[]}
        toggleDrawer={toggleDrawer}
        open={drawerState}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
      <CustomizedSnackbars
        messageString={snackbar.messege}
        severity={snackbar.severity}
        handleClose={() => {
          dispatch(closeSnackbar())
        }}
        open={snackbar.open}
      />
    </Box>
  )
}
