/** @jsx jsx */
import {jsx} from '@emotion/react'
import Logo from 'assets/logo.svg'
import * as React from 'react'
import {useState} from 'react'
import {
  CircleButton,
  ProfileMenuButton,
  ProfileMenuList,
  Input,
  Spinner,
  ErrorMessage,
} from 'components/lib'
import {Menu, MenuItem} from '@reach/menu-button'
import {Routes, Route, Link as RouterLink, useMatch} from 'react-router-dom'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'
import {NotFoundScreen} from 'screens/not-found'
import {ListScreen} from 'screens/list'
import {useAuth0} from '@auth0/auth0-react'
import {FaPlus} from 'react-icons/fa'

import {useLists, useCreateList} from 'utils/list'
import {useAsync} from 'utils/hooks'

function AuthenticatedApp() {
  const {user, logout} = useAuth0()
  return (
    <div
    //   css={{
    //     display: 'flex',
    //     alignItems: 'center',
    //     position: 'absolute',
    //     top: '10px',
    //     right: '10px',
    //   }}
    >
      <div
        css={{
          position: 'fix',
          top: '0',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '3rem',
          padding: '3px 3px',
          backgroundColor: '#d2eaf5',
        }}
      >
        <img
          src={Logo}
          alt="jobtrack logo"
          css={{
            width: 'auto',
            height: '90%',
            padding: '4px',
          }}
        />
        <div
          css={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {user.name}
          <Menu>
            <ProfileMenuButton
              css={{
                marginLeft: '10px',
              }}
              background={user.picture}
            />
            <ProfileMenuList>
              <MenuItem onSelect={() => {}}>Profile</MenuItem>
              <MenuItem onSelect={logout}>Sign Out</MenuItem>
            </ProfileMenuList>
          </Menu>
        </div>
      </div>
      <div
        css={{
          margin: '0 auto',
          padding: '4em 1em',
          width: '100%',
          display: 'grid',
          gridGap: '1em',
          gridTemplateColumns: '1fr 3fr',
          [mq.small]: {
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'auto',
            width: '100%',
          },
        }}
      >
        <div css={{position: 'relative'}}>
          <Nav />
        </div>
        <main css={{width: '100%'}}>
          <AppRoutes />
        </main>
      </div>
    </div>
  )
}

function NavLink(props) {
  const match = useMatch(props.to)
  return (
    <RouterLink
      css={[
        {
          display: 'block',
          padding: '8px 15px 8px 10px',
          margin: '5px',
          marginBottom: '8px',
          width: '100%',
          color: colors.text,
          borderRadius: '4px',
          borderLeft: '5px solid transparent',
          boxShadow: '0 0 8px 2px rgba(0,0,0, 0.1)',
          ':hover': {
            borderLeft: `5px solid ${colors.indigo}`,
            color: colors.indigo,
            textDecoration: 'none',
            background: colors.gray10,
          },
        },
        match
          ? {
              borderLeft: `5px solid ${colors.indigo}`,
              background: colors.gray20,
              ':hover': {
                background: colors.gray10,
              },
            }
          : null,
      ]}
      {...props}
    />
  )
}

function AddListForm({onSubmit, setIsActive}) {
  const {isLoading, isError, error, run, reset} = useAsync()
  const inputElement = React.useRef(null)

  function handleSubmit(event) {
    event.preventDefault()
    const {name} = event.target.elements
    if (isError) {
      reset()
    } else {
      run(onSubmit({listName: name.value}))
    }
    setIsActive(false)
  }

  function handleEscape(event) {
    if (event.keyCode === 27) {
      setIsActive(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        onKeyDown={handleEscape}
        autoFocus
        ref={inputElement}
        id="name"
        placeholder="list name"
        onBlur={() => {
          setTimeout(() => {
            setIsActive(false)
          }, 0)
        }}
      />
      {isLoading ? <Spinner /> : null}
      {isError ? <ErrorMessage error={error} /> : null}
    </form>
  )
}

function Nav(params) {
  const lists = useLists()
  const [handleCreateList] = useCreateList({throwOnError: true})
  const [isAdding, setIsAdding] = useState(false)
  return (
    <nav
      css={{
        position: 'sticky',
        top: '4px',
        padding: '1em 1.5em',
        border: `none`,
        borderRadius: '3px',
        [mq.small]: {
          position: 'static',
          top: 'auto',
        },
      }}
    >
      <ul
        css={{
          listStyle: 'none',
          padding: '0',
        }}
      >
        {lists.length
          ? lists.map(({name, _id}) => (
              <li key={_id}>
                <NavLink to={`/${name}`}>{name}</NavLink>
              </li>
            ))
          : null}
      </ul>
      <div>
        {isAdding ? (
          <AddListForm onSubmit={handleCreateList} setIsActive={setIsAdding} />
        ) : (
          <div
            css={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircleButton onClick={() => setIsAdding(true)}>
              <FaPlus />
            </CircleButton>
          </div>
        )}
      </div>
    </nav>
  )
}

function AppRoutes() {
  const lists = useLists()

  console.log(lists)
  return (
    <Routes>
      {lists.length
        ? lists.map(({name, _id}) => (
            <Route
              key={_id}
              path={`/${name}`}
              element={<ListScreen listId={_id} />}
            />
          ))
        : null}
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export default AuthenticatedApp
