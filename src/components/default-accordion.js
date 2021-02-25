/**@jsx jsx */
import {jsx} from '@emotion/react'
import * as React from 'react'

const AccordionContext = React.createContext()

function Accordion({activeEventKey, setActiveEventKey, ...props}) {
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
      'useAccrodionContext hook must be used inside an Accordion wrapper',
    )
  }
  return context
}

const useAccordionClick = (eventKey, onClick) => {
  const {onToggle, activeEventKey} = useAccordionContext()
  return event => {
    onToggle(eventKey === activeEventKey ? null : eventKey)

    if (onClick) {
      onClick(event)
    }
  }
}

function Toggle({element: Component, eventKey, onClick, children, ...props}) {
  const accordionClick = useAccordionClick(eventKey, onClick)
  return (
    <Component onClick={accordionClick} {...props}>
      {children}
    </Component>
  )
}

function Collapse({element: Component, eventKey, ...props}) {
  const {activeEventKey} = useAccordionContext()
  return activeEventKey === eventKey ? <Component {...props} /> : null
}

export {Accordion, Toggle, Collapse}
