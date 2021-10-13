/** @jsx jsx */
import {jsx} from '@emotion/react'
import {Menu} from '@reach/menu-button'
import {
    ProfileMenuButton,
    ProfileMenuList,
    ProfileMenuItem,
  } from 'components/lib'
  import {useAuth0} from '@auth0/auth0-react'
  
  function ProfileButton() {
    const {user, logout} = useAuth0()
    return(
        <Menu>
        <ProfileMenuButton background={user.picture} aria-label='profile menu button' />
        <ProfileMenuList>
          <ProfileMenuItem aria-label='profile info' onSelect={() => {}}>Profile</ProfileMenuItem>
          <ProfileMenuItem aria-label='sign out' onSelect={logout}>Sign Out</ProfileMenuItem>
        </ProfileMenuList>
      </Menu>
    )
}

export {ProfileButton}