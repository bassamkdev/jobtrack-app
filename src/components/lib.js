/** @jsx jsx */
import {jsx, keyframes} from '@emotion/react'
import styled from '@emotion/styled/macro'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'
import {MenuList, MenuButton, MenuItem} from '@reach/menu-button'
import {Tooltip} from '@reach/tooltip'
import {Link as RouterLink} from 'react-router-dom'
import {FaSpinner} from 'react-icons/fa'
import {Dialog as ReachDialog} from '@reach/dialog'
import {
  ListboxButton as ReachListboxButton,
  ListboxList as ReachListboxList,
  ListboxOption as ReachListboxOption,
  ListboxPopover as ReachListboxPopover,
} from '@reach/listbox'

const buttonBase = {
  padding: '10px 15px',
  border: '0',
  lineHeight: '1',
  borderRadius: '3px',
}

const Dialog = styled(ReachDialog)({
  maxWidth: '950px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  [mq.small]: {
    width: '100%',
    margin: '10vh auto',
  },
})

const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

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
  },
  ({variant = 'small'}) => circleButtonVariants[variant],
)

const buttonVariants = {
  primary: {
    background: colors.indigo,
    color: colors.base,
    ':hover': {
      background: colors.indigoDarken10,
    },
  },
  secondary: {
    background: colors.gray,
    color: colors.text,
    ':hover': {
      background: colors.gray10,
    },
  },
}

const Button = styled.button(
  buttonBase,
  {
    transition: '.1s all',
    boxShadow: '5px 4px 7px 1px rgba(0,0,0,.2)',
    ':active': {
      boxShadow: 'none',
    },
    ':disabled': {
      backgroundColor: colors.gray20,
      color: colors.gray80,
      boxShadow: 'none',
      ':hover': {
        backgroundColor: colors.gray20,
      },
    },
  },
  ({variant = 'primary'}) => buttonVariants[variant],
)

const textButtonBase = {
  display: 'inline-block',
  border: 'none',
  minWidth: '150px',
  background: 'none',
  textTransform: 'uppercase',
  color: colors.grayText,
  transition: 'all .2s',
  ':hover': {
    background: colors.navDark,
  },
  ':disabled': {
    cursor: 'not-allowed',
  },
}

const textButtonVariants = {
  large: {
    fontSize: '20px',
    fontWeight: 'bold',
    borderBottom: `2px solid ${colors.grayText}`,
  },
  small: {
    fontSize: '1rem',
    fontWeight: 'light',
    borderBottom: `1px solid ${colors.grayText}`,
  },
}

const TextButton = styled.button(
  textButtonBase,
  ({variant = 'large'}) => textButtonVariants[variant],
)

const ListboxButton = styled(ReachListboxButton)(
  textButtonBase,
  textButtonVariants['small'],
  {
    width: '100%',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
  },
)

const ListboxList = styled(ReachListboxList)({
  width: '100%',
})

const ListboxPopover = styled(ReachListboxPopover)({
  borderRadius: '3px',
  ':focus-within': {
    outline: 'none !important',
  },
})

const ListboxOption = styled(ReachListboxOption)({
  ':hover,:active': {
    backgroundColor: colors.gray,
  },
})

const ProfileMenuButton = styled(MenuButton)(
  {
    position: 'relative',
    border: '2px solid transparent',
    borderRadius: '50%',
    width: '2.5rem',
    height: '2.5rem',
    outline: 'none',
    backgroundSize: 'cover',
    transition: 'all .2s',
    ':hover': {
      border: '2px solid gray',
    },
    ':focus': {
      outline: 'none',
      border: `2px solid ${colors.indigo}`,
    },
  },
  ({background}) => ({
    backgroundImage: background
      ? `url(${background})`
      : `url('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')`,
  }),
)

const moveInLeft = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateX(30%)',
  },
  '80%': {
    transform: 'translateX(10%)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateX(0)',
  },
})

const ProfileMenuList = styled(MenuList)({
  position: 'absolute',
  top: '-38px',
  right: '2px',
  zIndex: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '200px',
  height: '40px',
  border: 'none',
  borderRadius: '40px',
  backgroundColor: '#2c3e4e',
  color: 'white',
  transition: 'all .2s',
  animation: `${moveInLeft} ease-in 0.1s`,
})

const ProfileMenuItem = styled(MenuItem)({
  transition: 'all .2s',
  borderRadius: '30px',
  ':hover': {
    background: colors.gray80,
  },
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
const Textarea = styled.textarea(inputStyles)

const JobListUl = styled.ul({
  listStyle: 'none',
  padding: '0',
  display: 'grid',
  gridTemplateRows: 'repeat(auto-fill, minmax(100px, 1fr))',
  gridGap: '1em',
})

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

function TextToggleSwitch({icon, label, text}) {
  return (
    <Tooltip label="label">
      <div
        css={{
          color: colors.grayText,
          backgroundColor: 'none',
          cursor: 'pointer',
        }}
        aria-label="label"
      >
        <div css={{display: 'inline-flex', alignItems: 'center'}}>
          {icon}
          <span css={{paddingLeft: '1rem', fontSize: '1.3rem'}}>{text}</span>
        </div>
      </div>
    </Tooltip>
  )
}

export {
  Button,
  CircleButton,
  ProfileMenuButton,
  ProfileMenuList,
  ProfileMenuItem,
  Link,
  FullPageErrorFallback,
  FullPageSpinner,
  Input,
  Spinner,
  ErrorMessage,
  Dialog,
  FormGroup,
  ListboxButton,
  ListboxList,
  ListboxPopover,
  ListboxOption,
  Textarea,
  JobListUl,
  TextButton,
  TextToggleSwitch,
}
