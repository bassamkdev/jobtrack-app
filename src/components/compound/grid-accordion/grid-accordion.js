/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import * as React from 'react'

const CardContent = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '0 30px 20px 30px',

  marginBottom: '5rem',
})

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

function Toggle({
  element: Component,
  eventKey,
  expandButton,
  shrinkButton,
  children,
}) {
  const {activeEventKey, onToggle} = useAccordionContext()
  function handleToggle() {
    onToggle(eventKey === activeEventKey ? null : eventKey)
  }
  return (
    <Component>
      {activeEventKey !== eventKey
        ? React.cloneElement(expandButton, {onClick: handleToggle})
        : React.cloneElement(shrinkButton, {onClick: handleToggle})}
      {children}
    </Component>
  )
}

function AccordianContent({item, eventKey, defaultContent, expandedContent}) {
  const {activeEventKey} = useAccordionContext()
  return (
    <CardContent>
      {defaultContent}
      {activeEventKey === eventKey ? expandedContent : null}
    </CardContent>
  )
}

export {AccordionProvider, useAccordionContext, Toggle, AccordianContent}
