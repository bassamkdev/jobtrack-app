/** @jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import {useLocation} from 'react-router-dom'
import {Menu} from '@reach/menu-button'

import {useAuth0} from '@auth0/auth0-react'
import {
  ProfileMenuButton,
  ProfileMenuList,
  ProfileMenuItem,
} from 'components/lib'
import * as colors from 'styles/colors'

const TopBarWrapper = styled.header({
  width: '100%',
  height: '4em',
  borderBottom: `1px solid ${colors.grayText}`,
  borderLeft: `4px solid ${colors.grayText}`,
  background: 'white',
  position: 'sticky',
  display: 'inline-flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 .5rem 0 2rem',
  top: 0,
  zIndex: 2,
})

const TopBarTitle = styled.h2({
  margin: 0,
  fontFamily: 'lato, san-serif',
  textTransform: 'capitalize',
  color: colors.grayText,
})

function TopBar() {
  const {pathname} = useLocation()
  const {user, logout} = useAuth0()
  return (
    <TopBarWrapper aria-label='top bar'>
      <TopBarTitle aria-label='page title'>{pathname.slice(1).replace(/&-&/g, ' ')}</TopBarTitle>
      <Menu>
        <ProfileMenuButton background={user.picture} aria-label='profile menu button' />
        <ProfileMenuList>
          <ProfileMenuItem aria-label='profile info' onSelect={() => {}}>Profile</ProfileMenuItem>
          <ProfileMenuItem aria-label='sign out' onSelect={logout}>Sign Out</ProfileMenuItem>
        </ProfileMenuList>
      </Menu>
    </TopBarWrapper>
  )
}

export {TopBar}
