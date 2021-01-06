import * as React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {Auth0Provider} from '@auth0/auth0-react'
import {ReactQueryConfigProvider} from 'react-query'
import {FetchProvider} from 'context/fetch-context'

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === 404) return false
      // else if (failureCount < 2) return true
      else return false
    },
  },
}

function AppProvider({children}) {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
          redirectUri={`${window.location.origin}/liked`}
          audience={process.env.REACT_APP_AUTH0_AUDIENCE}
        >
          <FetchProvider>{children}</FetchProvider>
        </Auth0Provider>
      </Router>
    </ReactQueryConfigProvider>
  )
}

export {AppProvider}
