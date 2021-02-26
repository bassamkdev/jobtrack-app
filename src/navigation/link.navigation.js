/** @jsx jsx */
import {jsx} from '@emotion/react'
import {Link as RouterLink, useRouteMatch as useMatch} from 'react-router-dom'

import * as colors from 'styles/colors'

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

export {NavLink}
