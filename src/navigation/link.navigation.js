/** @jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import {Link, useRouteMatch as useMatch} from 'react-router-dom'
import { WEIGHTS } from 'styles/constants'

function NavLink({list, ...props}) {
  const match = useMatch(props.to)
  return (
    <Wrapper match={match} color={list?.color || null}>
      <RouterLink list={list} {...props}/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  border-right: ${(props) => props.match ? `4px solid ${props.color || 'skyblue'}` : null};
  color: ${({match}) => match ? 'hsl(220deg 5% 20%)' : 'hsl(220deg 5% 70%)'}
`

const RouterLink = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  font-weight: ${WEIGHTS.light};
  text-transform: capitalize;
  color: inherit;
  line-height: 3;
  &:hover{
    color: hsl(220deg 5% 50%);
  }
`

export {NavLink}
