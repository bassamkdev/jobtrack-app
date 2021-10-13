/** @jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import * as React from 'react'
import { useHistory } from "react-router-dom";

import {NavLink} from 'navigation/link.navigation'
import {useLists, useRemoveList} from 'utils/list'

import { DeleteAction } from 'components/deleteAction.js'


function Lists() {
  const lists = useLists()
  const [remove, {isSuccess}] = useRemoveList()
  const history = useHistory()

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
                  {
                    window.location.pathname.slice(1) === list.name
                    ? (
                        <ButtonWrapper>
                          <DeleteAction onDelete={remove} id={list._id} type='list'/>
                        </ButtonWrapper>
                      )
                    : null
                  }
                </ListItem>
              )
            })
          : null}
      </ul>
    </ListsWrapper>
  )
}

const ListsWrapper = styled.nav`
  width: 100%;
`


const ListItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
`

const ButtonWrapper = styled.div`
  position: absolute;
  right: 10px;
`



export {Lists}
