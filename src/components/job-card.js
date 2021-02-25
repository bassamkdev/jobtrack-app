/**@jsx jsx */
import {jsx} from '@emotion/react'
import * as colors from 'styles/colors'

function Card({children}) {
  return (
    <div
      css={{
        border: 'none',
        borderRadius: '6px',
        boxShadow: `0 4px 10px 0 rgba(0, 0, 0, 0.04)`,
        backgroundColor: `#fff`,
        maxWidth: '950px',
        width: '100%',
        ':not(:last-child)': {
          borderBottom: 'none',
        },
        ':hover': {
          borderLeft: `1px solid ${colors.skyBlue}`,
        },
      }}
    >
      {children}
    </div>
  )
}

function CardHeader({children, ...props}) {
  return (
    <div
      css={{
        cursor: 'pointer',
        userSelect: 'none',
        textAlign: 'center',
      }}
      {...props}
    >
      {children}
    </div>
  )
}

function CardBody({children, ...props}) {
  return (
    <div
      css={{
        padding: '5px 10px',
        paddingBottom: '30px',
        borderTop: `solid 1px #d3d3d3`,
        fontsize: '12px',
      }}
    >
      {children}
    </div>
  )
}

export {Card, CardHeader, CardBody}
