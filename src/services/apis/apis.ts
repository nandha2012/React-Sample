/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import axios, { AxiosRequestConfig } from 'axios'
import { REACT_APP_API_URL } from '../../config/index'

const API_URL = REACT_APP_API_URL
export function getStoreData(id: any) {
  const GET_USERS = `${API_URL}/store/${id}`
  return axios.get(GET_USERS)
}

export function updateStoreData(_id: any, _data: any) {
  const data = _data
  const STORE_UPDATE = `${API_URL}/store/${_id}`
  const config: AxiosRequestConfig = {
    method: 'patch',
    url: STORE_UPDATE,
    data,
  }
  return axios(config)
}
