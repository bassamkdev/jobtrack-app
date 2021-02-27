import React from 'react'
import UnauthenticatedApp from 'unauthenticated-app'
import {useAuth0} from '@auth0/auth0-react'
import {FullPageErrorFallback, FullPageSpinner} from 'components/lib'
import {BrowserRouter as Router} from 'react-router-dom'
import {UnderSizeScreen} from 'screens/undersize.screen'

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))

function App() {
  const {isAuthenticated, isLoading, error} = useAuth0()

  if (isLoading) {
    return <FullPageSpinner />
  }
  if (error) {
    return <FullPageErrorFallback error={error} />
  }

  return (
    <div>
      <UnderSizeScreen />
      <React.Suspense fallback={<FullPageSpinner />}>
        {isAuthenticated ? (
          <Router>
            <AuthenticatedApp />
          </Router>
        ) : (
          <UnauthenticatedApp />
        )}
      </React.Suspense>
    </div>
  )
}

export default App
