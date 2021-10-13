/** @jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import {SideBar} from 'layout/sidebar.layout'
import {TopBar} from './layout/topbar.layout'
import {AppRoutes} from './navigation/routes.navigaton'
import { QUERIES } from 'styles/constants'

const AuthenticatedAppWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'flex-start',
  height: '100%'
})

const LeftColumn = styled.div`
  flex-Basis: 320px;
  height: 100%;
  @media ${QUERIES.phoneAndSmaller}{
    display: none;
  }
`

const Main = styled.main({
  flex: '1',
  height: '100%',
  overflow: 'hidden',
  paddingBottom: '32px'
})


function AuthenticatedApp() {
  return (
    <AuthenticatedAppWrapper>
      <Main>
        {/* <Spacer axis={'vertical'} size={24}/> */}
        <TopBar />
        {/* <Spacer axis='vertical' size={24}/> */}
        <AppRoutes />
      </Main>
      <LeftColumn>
        <SideBar />
      </LeftColumn>
    </AuthenticatedAppWrapper>
  )
}

export default AuthenticatedApp
