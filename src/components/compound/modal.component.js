/**@jsx jsx */
import {jsx} from '@emotion/react'
import * as React from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import { Tooltip } from "@reach/tooltip";
import {CircleButton} from '../lib'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

const ModalContext = React.createContext()

function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false)
  let value = [isOpen, setIsOpen]
  return <ModalContext.Provider value={value} {...props} />
}

function ModalDismissButton({children: child}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

function ModalOpenButton({children: child, isTooltip, label}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  if (isTooltip) {
    return(
      <Tooltip label={label}>
        {
          React.cloneElement(child, {
            onClick: callAll(() => setIsOpen(true), child.props.onClick),
          })
        }
      </Tooltip>
    )
  }
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  })
}

function ModalContentBase({children: child}) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    isOpen: isOpen, onDismiss: () => setIsOpen(false) 
  })
}

function ModalContents({title, children, ...props}) {
  return (
    <ModalContentBase {...props}>
      <div
        css={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <ModalDismissButton>
          <CircleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </CircleButton>
        </ModalDismissButton>
      </div>
      <h3 css={{textAlign: 'center', fontsize: '2em'}}>{title}</h3>
      {children}
    </ModalContentBase>
  )
}

export {Modal, ModalDismissButton, ModalOpenButton, ModalContents, ModalContext, ModalContentBase}
