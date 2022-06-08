/* eslint-disable react/jsx-no-useless-fragment */
import React, { useMemo } from 'react'
import { Route, Navigate, RouteProps, useLocation } from 'react-router-dom'
import _ from 'lodash'
import Layout from '../Layout'
// import { isLogin } from '../../utils'
export const isLogin = () => {
  if (localStorage.getItem('authToken')) {
    return true
  }
  return false
}

function PrivateRoute({ children }: { children: JSX.Element }) {
  let auth = isLogin()
  let location = useLocation()
  console.log('login', auth)
  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Layout> children</Layout>
}
export default PrivateRoute
