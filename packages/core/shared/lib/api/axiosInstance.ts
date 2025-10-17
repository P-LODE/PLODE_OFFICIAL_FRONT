import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  TIMEOUT: 100000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
} as const

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
})

const handleRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  // TODO: Authorization will set later
  return config
}

const handleRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}

const handleResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}

const handleResponseError = async (error: AxiosError): Promise<AxiosError> => {
  if (error.response?.status === 401) {
    // TODO: Session expiry process will set later
  }

  return Promise.reject(error)
}

axiosInstance.interceptors.request.use(handleRequest, handleRequestError)
axiosInstance.interceptors.response.use(handleResponse, handleResponseError)

export const isAxiosError = axios.isAxiosError

export default axiosInstance
