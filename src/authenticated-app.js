/** @jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import * as mq from 'styles/media-queries'
import {SideBar} from 'layout/sidebar.layout'
import {TopBar} from './layout/topbar.layout'
import {AppRoutes} from './navigation/routes.navigaton'

const AuthenticatedAppWrapper = styled.div({
  margin: '0 auto',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 3fr',
  [mq.small]: {
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto',
    width: '100%',
  },
})

const AppMainSection = styled.main({
  width: '100%',
  height: '100vh',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
})

const ScreensWrapper = styled.div({
  height: '100%',
  maxHeight: '100%',
  width: '100%',
  overflow: 'hidden',
})

function AuthenticatedApp() {
  return (
    <AuthenticatedAppWrapper>
      <SideBar />
      <AppMainSection>
        <TopBar />
        <ScreensWrapper>
          <AppRoutes />
        </ScreensWrapper>
      </AppMainSection>
    </AuthenticatedAppWrapper>
  )
}

export default AuthenticatedApp
