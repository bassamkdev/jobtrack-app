/**@jsx jsx */
import {jsx} from '@emotion/react'
import * as React from 'react'

const AccordionContext = React.createContext()

function AccordionProvider(props) {
  const [activeEventKey, setActiveEventKey] = React.useState(null)
  const onToggle = React.useCallback(
    eventKey => {
      setActiveEventKey(eventKey)
    },
    [setActiveEventKey],
  )
  const context = {activeEventKey, onToggle}

  return <AccordionContext.Provider value={context} {...props} />
}

function useAccordionContext() {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error(
      'Accordian Components must be wrapped inside AccordionProvider',
    )
  }
  return context
}

function Toggle({eventKey, children}) {
  const {activeEventKey, onToggle} = useAccordionContext()
  function handleToggleClick() {
    onToggle(eventKey === activeEventKey ? null : eventKey)
  }
  return (
    <div css={{cursor: 'pointer'}} onClick={handleToggleClick}>
      {children}
    </div>
  )
}

export {AccordionProvider, useAccordionContext, Toggle}
