/** @jsx jsx */
import {jsx} from '@emotion/react'
import {useAuth0} from '@auth0/auth0-react'
import {TextButton} from 'components/lib'

function UnauthenticatedApp() {
  const {loginWithRedirect} = useAuth0()
  return (
    <div
      css={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        backgroundImage:
          'linear-gradient(90deg, rgba(0,0,0,.95) 0%, rgba(0,0,0, .1) 100%, transparent 85%), url(https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1504&q=80)',
        backgroundSize: 'cover',
      }}
    >
      <div
        css={{
          height: '20%',
          width: '100%',
          position: 'absolute',
          top: 0,
          padding: '20px',
          paddingRight: 40,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <TextButton onClick={loginWithRedirect}>Login &rarr;</TextButton>
      </div>
      <div
        css={{
          width: '50%',
          height: '80%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: `4rem`,
        }}
      >
        <img
          src="text-logo.png"
          alt="jobtrack log"
          height="100px"
          css={{marginBottom: '4rem'}}
        />
        <h1 css={{color: 'whitesmoke', textTransform: 'capitalize'}}>
          makes your job applications tracking process like never before
        </h1>
      </div>
    </div>
  )
}

export default UnauthenticatedApp
