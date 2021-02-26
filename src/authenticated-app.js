/** @jsx jsx */
import {jsx} from '@emotion/react'
import * as React from 'react'
import {useState} from 'react'
import {
  ProfileMenuButton,
  ProfileMenuList,
  ProfileMenuItem,
  Input,
  Spinner,
  ErrorMessage,
  Button,
  TextButton,
  TextToggleSwitch,
} from 'components/lib'
import {Menu} from '@reach/menu-button'
import {
  Route,
  Link as RouterLink,
  useRouteMatch as useMatch,
  useLocation,
} from 'react-router-dom'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'
import {NotFoundScreen} from 'screens/not-found'
import {ListScreen} from 'screens/list'
import {useAuth0} from '@auth0/auth0-react'
import {
  FaPlus,
  FaTimes,
  FaTimesCircle,
  FaTrash,
  FaTrashAlt,
} from 'react-icons/fa'
import {useLists, useCreateList, useRemoveList} from 'utils/list'
import {useAsync} from 'utils/hooks'
import {DiscoverJobsScreen} from 'screens/discover'
import {Modal, ModalContents, ModalOpenButton} from 'components/modal'
import {CirclePicker} from 'react-color'
import {Toggle, ToggleButton, ToggleOn} from 'components/Toggle-component'

function AuthenticatedApp() {
  return (
    <div
      css={{
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        [mq.small]: {
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'auto',
          width: '100%',
        },
      }}
    >
      <SideBar />
      <main
        css={{
          width: '100%',
          height: '100vh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TopBar />
        <div
          css={{
            height: '100%',
            maxHeight: '100%',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <AppRoutes />
        </div>
      </main>
    </div>
  )
}

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

function SideBar() {
  const [handleCreateList] = useCreateList({throwOnError: true})
  const [isAdding, setIsAdding] = useState(false)
  return (
    <aside
      css={{
        position: 'relative',
        height: '100vh',
        overflow: 'scroll',
        background: '#2c3e4e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <div
        css={{
          borderBottom: `1px solid #3f4e5c`,
          width: '100%',
          padding: `1em 0 1em 1em `,
        }}
      >
        <img
          src="logo.png"
          alt="jobtrack logo"
          css={{height: '4em', width: 'auto'}}
        />
      </div>
      <Toggle on={isAdding} setOn={setIsAdding}>
        <div
          css={{
            width: '100%',
            padding: '16px 24px',
            borderBottom: `1px solid #3f4e5c`,
            background: `#415464`,
          }}
        >
          <ToggleButton>
            {isAdding ? (
              <TextToggleSwitch
                label="close form"
                icon={<FaTimes />}
                text="Close"
              />
            ) : (
              <TextToggleSwitch
                label="create a new list"
                icon={<FaPlus />}
                text="Create a new list"
              />
            )}
          </ToggleButton>
          <ToggleOn>
            <AddListForm
              onSubmit={handleCreateList}
              setIsActive={setIsAdding}
            />
          </ToggleOn>
        </div>
      </Toggle>
      <Nav />
    </aside>
  )
}

function NavLink(props) {
  const match = useMatch(props.to)
  return (
    <RouterLink
      css={[
        {
          display: 'block',
          background: 'none',
          padding: '14px 15px 14px 10px',
          margin: '8px 0',
          width: '100%',
          color: colors.grayText,
          borderRadius: '34px 0 0 34px',
          borderLeft: '5px solid transparent',
          ':hover': {
            textDecoration: 'none',
            color: colors.gray20,
          },
        },
        match
          ? {
              background: props.list?.color || colors.skyBlue,
              color: colors.gray20,
            }
          : null,
      ]}
      {...props}
    />
  )
}

function AddListForm({onSubmit, setIsActive}) {
  const {isLoading, isError, error, run, reset} = useAsync()
  const [color, setColor] = useState('')
  const [listName, setlistName] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (isError) {
      reset()
    } else {
      run(onSubmit({listName, color}))
    }
  }

  function handleInputChange(event) {
    setlistName(event.target.value)
  }

  function handleEscape(event) {
    if (event.keyCode === 27) {
      setIsActive(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        css={{
          paddingTop: '1em',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Input
          onKeyDown={handleEscape}
          autoFocus
          id="name"
          placeholder="list name"
          value={listName}
          onChange={handleInputChange}
          css={{
            width: '100%',
            border: `4px solid ${color || colors.grayText}`,
            background: colors.navDark,
            color: color,
          }}
        />

        <CirclePicker
          css={{width: '100%', margin: '2em 0'}}
          color={color}
          onChangeComplete={({hex}) => setColor(hex)}
        />
        {isError ? <ErrorMessage error={error} /> : null}
        <TextButton
          type="submit"
          css={{marginTop: '2em'}}
          variant="small"
          disabled={!color || !listName}
        >
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <FaTimes />
          ) : (
            <div>create &rarr;</div>
          )}
        </TextButton>
      </div>
    </form>
  )
}

function Nav(params) {
  const lists = useLists()

  const [remove, {isSuccess, isError, isLoading, reset}] = useRemoveList()
  function handleRemoveList(listId) {
    console.log(listId)
    if (isError) {
      reset()
    } else {
      remove({listId})
    }
  }

  React.useEffect(() => {
    if (isSuccess) {
      const match = lists.find(
        list => list.name === window.location.pathname.slice(1),
      )
      if (!match && window.location.pathname !== '/discover') {
        window.location.href = 'discover'
      }
    }
  }, [isSuccess, lists])

  return (
    <nav
      css={{
        position: 'sticky',
        top: '4px',
        padding: '1em 0 1.5em 1.5em',
        border: `none`,
        width: '100%',
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
        <li>
          <NavLink to={`/discover`}>Discover</NavLink>
        </li>
        {lists.length
          ? lists.map(list => {
              return (
                <li
                  key={list._id}
                  css={{
                    position: 'relative',
                    ':hover>:last-child': {
                      display: 'block',
                      color: colors.grayText,
                      cursor: 'pointer',
                      ':hover': {
                        color: 'crimson',
                      },
                    },
                  }}
                >
                  <NavLink
                    list={list}
                    to={`/${list.name.replace(/\s/g, '&-&')}`}
                  >
                    {list.name}
                  </NavLink>
                  <Modal>
                    <ModalOpenButton>
                      <button
                        css={{
                          position: 'absolute',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          right: '8px',
                          display: 'none',
                          border: 'none',
                          background: 'none',
                        }}
                      >
                        <FaTrashAlt />
                      </button>
                    </ModalOpenButton>
                    <ModalContents aria-label="Delete confirmation alert">
                      <div
                        css={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <h3>
                          Deleting a list will delete all the job cards inside
                          that list, Are you sure you want to Delete the
                          <strong
                            css={{color: colors.danger}}
                          >{` ${list.name}`}</strong>{' '}
                          list?
                        </h3>
                        <Button
                          css={{
                            width: '100px',
                            marginTop: '10px',
                            background: 'none',
                            color: colors.danger,
                            border: `1px solid ${colors.danger}`,
                            boxShadow: 'none',
                            ':hover': {
                              background: 'pink',
                            },
                          }}
                          onClick={() => handleRemoveList(list._id)}
                        >
                          {isLoading ? (
                            <Spinner />
                          ) : isError ? (
                            <FaTimesCircle />
                          ) : (
                            <FaTrash />
                          )}
                        </Button>
                      </div>
                    </ModalContents>
                  </Modal>
                </li>
              )
            })
          : null}
      </ul>
    </nav>
  )
}

function AppRoutes() {
  const lists = useLists()
  return (
    <>
      <Route path="/discover">
        <DiscoverJobsScreen />
      </Route>
      {lists.length
        ? lists.map(({name, _id}) => (
            <Route key={_id} path={`/${name.replace(/\s/g, '&-&')}`}>
              <ListScreen listId={_id} />
            </Route>
          ))
        : null}
      <Route path="*">
        <NotFoundScreen />
      </Route>
    </>
  )
}

export default AuthenticatedApp
