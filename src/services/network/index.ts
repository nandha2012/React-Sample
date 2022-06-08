/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig } from 'axios'
import _ from 'lodash'

// PATH VARIABLE REPLACER
function bindPath(url: string, pathVal: any) {
  let newUrl = url
  const pathExpression = /:[a-z0-9]+/gi
  const pathVar = pathExpression.exec(url)
  while (pathVar != null) {
    const pathVarName = pathVar[0]
    newUrl = newUrl.replace(
      pathVarName,
      pathVal[pathVarName.substring(1, pathVarName.length)]
    )
  }
  return newUrl
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  setupInterceptors: (store: any) => {
    axios.interceptors.request.use(
      (config: any) => {
        // CHECK REQUEST NEED TO ADD AUTH TOKEN IN THE HEADER
        if (config.headers.isAuthRequired) {
          const token =
            store.getState().session.authToken || config.headers.authKey // GET TOKEN FROM REDUX STATE
          if (token) config.headers.Authorization = `Bearer ${token}` // ADD AUTHORIZATION HEADER
        }
        // DELETE CUSTOM PROPERTY IN THE REQUEST HEADERS
        delete config.headers.isAuthRequired
        delete config.headers.authKey

        // PATH VARIABLES IS AVAILABLE
        if (config.headers.path) {
          try {
            config.url = bindPath(config.url, config.headers.path)
          } catch (e) {
            console.log('ERROR OCCURED WHEN REPLACING PATH VARIABLES', e)
          }
        }

        return config
      },
      (error) => Promise.reject(error)
    )

    // Add a response interceptor
    axios.interceptors.response.use(
      (response: any) => response,
      (error) => {
        // catches if the session ended!
        if (
          !axios.isCancel(error) &&
          (_.get(error, 'response.status', '') === 401 ||
            _.get(error, 'response.status', '') === 403)
        ) {
          if (_.get(error, 'response.data.more_info.is_access_denied')) {
            // access denied error
            window.location = <any>'/403'
          } else {
            // session timeout error
            localStorage.clear()
            // store.dispatch(unauthError())
          }
        }
        return Promise.reject(error)
      }
    )
  },
}
