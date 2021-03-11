/** @jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import * as React from 'react'
import {FaTimesCircle, FaTrash, FaTrashAlt} from 'react-icons/fa'
import {Spinner, Button} from 'components/lib'
import { useHistory } from "react-router-dom";

import {NavLink} from 'navigation/link.navigation'
import {useLists, useRemoveList} from 'utils/list'
import {
  Modal,
  ModalContents,
  ModalOpenButton,
} from 'components/compound/modal.component'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'

const ListsWrapper = styled.nav({
  position: 'sticky',
  top: '4px',
  padding: '1em 0 1.5em 1.5em',
  border: `none`,
  width: '100%',
  [mq.small]: {
    position: 'static',
    top: 'auto',
  },
})

const ListItem = styled.li({
  position: 'relative',
  ':hover>:last-child': {
    display: 'block',
    color: colors.grayText,
    cursor: 'pointer',
    ':hover': {
      color: 'crimson',
    },
  },
})

const OpenButton = styled.button({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  right: '8px',
  display: 'none',
  border: 'none',
  background: 'none',
})

const DeleteButton = styled(Button)({
  width: '100px',
  marginTop: '10px',
  background: 'none',
  color: colors.danger,
  border: `1px solid ${colors.danger}`,
  boxShadow: 'none',
  ':hover': {
    background: 'pink',
  },
})

const ContentWrapper = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

function Lists() {
  const lists = useLists()
  const [remove, {isSuccess, isError, isLoading, reset}] = useRemoveList()
  const history = useHistory()
  function handleRemoveList(listId) {
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
        history.push('/discover')
      }
    }
  }, [history, isSuccess, lists])

  return (
    <ListsWrapper>
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
                <ListItem key={list._id}>
                  <NavLink
                    list={list}
                    to={`/${list.name.replace(/\s/g, '&-&')}`}
                  >
                    {list.name}
                  </NavLink>
                  <Modal>
                    <ModalOpenButton>
                      <OpenButton>
                        <FaTrashAlt />
                      </OpenButton>
                    </ModalOpenButton>
                    <ModalContents aria-label="Delete confirmation alert">
                      <ContentWrapper>
                        <h3>
                          Deleting a list will delete all the job cards inside
                          that list, Are you sure you want to Delete the
                          <strong
                            css={{color: colors.danger}}
                          >{` ${list.name}`}</strong>{' '}
                          list?
                        </h3>
                        <DeleteButton
                          role='delete-list'
                          onClick={() => handleRemoveList(list._id)}
                        >
                          {isLoading ? (
                            <Spinner/>
                          ) : isError ? (
                            <FaTimesCircle />
                          ) : (
                            <FaTrash />
                          )}
                        </DeleteButton>
                      </ContentWrapper>
                    </ModalContents>
                  </Modal>
                </ListItem>
              )
            })
          : null}
      </ul>
    </ListsWrapper>
  )
}

export {Lists}
