import {useAuth0} from '@auth0/auth0-react'
import {useCallback, useEffect, useState} from 'react'
import {client} from 'utils/api-client'

function useClient() {
  const [token, setToken] = useState()
  const {getAccessTokenSilently} = useAuth0()
  useEffect(() => {
    const getUserMetaData = async () => {
      try {
        const accessToken = await getAccessTokenSilently()
        setToken(accessToken)
      } catch (error) {
        console.log(error.message)
      }
    }
    getUserMetaData()
  }, [getAccessTokenSilently])
  return useCallback(
    (endpoint, config) => {
      return client(endpoint, {...config, token})
    },
    [token],
  )
}

export {useClient}
