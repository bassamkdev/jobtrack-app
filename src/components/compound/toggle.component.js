/**@jsx jsx */
import {jsx} from '@emotion/react'
import * as React from 'react'

const ToggleContext = React.createContext()
function Toggle({children, on, setOn}) {
  const toggle = () => setOn(!on)
  return (
    <ToggleContext.Provider value={{on, toggle}}>
      {children}
    </ToggleContext.Provider>
  )
}

function useToggle() {
  const context = React.useContext(ToggleContext)
  if (!context) {
    throw new Error('useToggle must be used whithin <Toggle/> provider')
  }
  return context
}

const ToggleOn = ({children}) => {
  const {on} = useToggle()
  return on ? children : null
}

const ToggleOff = ({children}) => {
  const {on} = useToggle()
  return on ? null : children
}

const ToggleButton = ({children}) => {
  const {toggle} = React.useContext(ToggleContext)
  return <div onClick={() => toggle()}>{children}</div>
}

export {Toggle, ToggleOn, ToggleOff, ToggleButton}
