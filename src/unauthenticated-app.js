/** @jsx jsx */
import {jsx} from '@emotion/react'
import {useAuth0} from '@auth0/auth0-react'

function UnauthenticatedApp() {
  const {loginWithRedirect} = useAuth0()
  return (
    <div
      css={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirecton: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d2eaf5',
      }}
    >
      <div
        css={{
          height: '100%',
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRight: '2px solid black',
        }}
      >
        <div
          css={{
            width: '50%',
          }}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          nemo vel cupiditate atque in suscipit animi aliquam optio cumque quis
          perspiciatis molestiae
        </div>
      </div>
      <div
        css={{
          width: '50%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src="cover.png" alt="jobtrack log" height="300px" />
        <button onClick={loginWithRedirect}>Login</button>
      </div>
    </div>
  )
}

export default UnauthenticatedApp
