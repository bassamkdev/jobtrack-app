import * as React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import axios from 'axios'

const FetchContext = React.createContext()

function FetchProvider({children}) {
  const [accessToken, setAccessToken] = React.useState()
  const {getAccessTokenSilently} = useAuth0()

  const getAccessToken = React.useCallback(async () => {
    try {
      const token = await getAccessTokenSilently()
      setAccessToken(token)
    } catch (err) {
      console.log(err)
    }
  }, [getAccessTokenSilently])

  React.useEffect(() => {
    getAccessToken()
  }, [getAccessToken])

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  authAxios.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${accessToken}`
      return config
    },
    error => {
      return Promise.reject(error)
    },
  )

  authAxios.interceptors.response.use(
    response => {
      return response.data
    },
    error => {
      const code = error && error.response ? error.response.status : 0
      if (code === 401) {
        getAccessToken()
      }
      return Promise.reject(error)
    },
  )

  return (
    <FetchContext.Provider value={{authAxios}}>
      {children}
    </FetchContext.Provider>
  )
}

function useFetchContext() {
  const context = React.useContext(FetchContext)
  if (!context) {
    throw new Error('useFetchContext must be wrapped inside FetchProvider')
  }
  return context
}

export {useFetchContext, FetchProvider}
