/* eslint-disable no-console */
import React from 'react'
// import PropTypes from 'prop-types'
import { ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import NetworkService from './services/network'
import { Theme } from './theme/index'
import { store } from './redux/store'

NetworkService.setupInterceptors(store)
function AppWrapper({ children }: any) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default AppWrapper
