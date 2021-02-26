/** @jsx jsx */
import {jsx} from '@emotion/react'
import {useLocation} from 'react-router-dom'
import {Menu} from '@reach/menu-button'

import {useAuth0} from '@auth0/auth0-react'
import {
  ProfileMenuButton,
  ProfileMenuList,
  ProfileMenuItem,
} from 'components/lib'
import * as colors from 'styles/colors'

function TopBar() {
  const {pathname} = useLocation()
  const {user, logout} = useAuth0()
  return (
    <header
      css={{
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
      }}
    >
      <h2
        css={{
          margin: 0,
          fontFamily: 'lato, san-serif',
          textTransform: 'capitalize',
          color: colors.grayText,
        }}
      >
        {pathname.slice(1).replace(/&-&/g, ' ')}
      </h2>

      <Menu>
        <ProfileMenuButton css={{}} background={user.picture} />
        <ProfileMenuList>
          <ProfileMenuItem onSelect={() => {}}>Profile</ProfileMenuItem>
          <ProfileMenuItem onSelect={logout}>Sign Out</ProfileMenuItem>
        </ProfileMenuList>
      </Menu>
    </header>
  )
}

export {TopBar}
