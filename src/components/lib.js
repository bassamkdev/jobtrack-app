/** @jsx jsx */
import {jsx, keyframes} from '@emotion/react'
import styled from '@emotion/styled/macro'
import * as colors from 'styles/colors'
import {MenuList, MenuButton} from '@reach/menu-button'
import {Link as RouterLink} from 'react-router-dom'
import {FaSpinner} from 'react-icons/fa'

const circleButtonVariants = {
  small: {
    width: '40px',
    height: '40px',
  },
  large: {
    width: '100px',
    height: '100px',
  },
}

const CircleButton = styled.button(
  {
    borderRadius: '50%',
    padding: '0',
    lineHeight: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.base,
    color: colors.text,
    border: `1px solid ${colors.gray10}`,
    cursor: 'pointer',
    transition: `0.2s all`,
    ':hover': {
      borderColor: colors.indigo,
      color: colors.indigo,
      boxShadow: '0 4px 8px, rgba(0,0,0, 0.05)',
    },
  },
  ({variant = 'small'}) => circleButtonVariants[variant],
)

const buttonVariants = {
  primary: {
    background: colors.indigo,
    color: colors.base,
  },
  secondary: {
    background: colors.gray,
    color: colors.text,
  },
}

const Button = styled.button(
  {
    padding: '10px 15px',
    border: '0',
    lineHeight: '1',
    borderRadius: '3px',
  },
  ({variant = 'primary'}) => buttonVariants[variant],
)

const ProfileMenuButton = styled(MenuButton)(
  {
    border: '2px solid white',
    borderRadius: '50%',
    overflow: 'hidden',
    width: '2.5rem',
    height: '2.5rem',
    outline: 'none',
    ':focus': {
      outline: 'none',
      border: `2px solid ${colors.indigo}`,
    },
    backgroundSize: 'contain',
  },
  ({background}) => ({
    backgroundImage: background
      ? `url(${background})`
      : `url('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')`,
  }),
)

const ProfileMenuList = styled(MenuList)({
  borderRadius: '3px',
})

const Link = styled(RouterLink)({
  color: colors.indigo,
  ':hover': {
    color: colors.indigoDarken10,
    textDecoration: 'underline',
  },
})

const inputStyles = {
  border: '1px solid #f1f1f4',
  background: '#f1f2f7',
  padding: '8px 12px',
}
const Input = styled.input({borderRadius: '3px'}, inputStyles)

const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
})

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
})

Spinner.defaultProps = {
  'aria-label': 'loading',
}

function FullPageSpinner() {
  return (
    <div
      css={{
        fontSize: '4em',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
    </div>
  )
}

const errorMessageVariants = {
  stacked: {display: 'block'},
  inline: {display: 'inline-block'},
}

function ErrorMessage({error, variant = 'stacked', ...props}) {
  return (
    <div
      role="alert"
      css={[{color: colors.danger}, errorMessageVariants[variant]]}
      {...props}
    >
      <span>There was an error: </span>
      <pre
        css={[
          {whiteSpace: 'break-spaces', margin: '0', marginBottom: '-5'},
          errorMessageVariants[variant],
        ]}
      >
        {error.message}
      </pre>
    </div>
  )
}

function FullPageErrorFallback({error}) {
  return (
    <div
      role="alert"
      css={{
        color: colors.danger,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export {
  Button,
  CircleButton,
  ProfileMenuButton,
  ProfileMenuList,
  Link,
  FullPageErrorFallback,
  FullPageSpinner,
  Input,
  Spinner,
  ErrorMessage,
}
