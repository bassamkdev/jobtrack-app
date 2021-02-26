/** @jsx jsx */
import {jsx} from '@emotion/react'
import * as React from 'react'
import {FaTimesCircle, FaTrash, FaTrashAlt} from 'react-icons/fa'
import {Spinner, Button} from 'components/lib'

import {NavLink} from 'navigation/link.navigation'
import {useLists, useRemoveList} from 'utils/list'
import {Modal, ModalContents, ModalOpenButton} from 'components/modal'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'

function Lists(params) {
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

export {Lists}
