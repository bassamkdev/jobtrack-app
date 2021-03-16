/** @jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import * as React from 'react'
import {FaPlus, FaTimes} from 'react-icons/fa'

import {useCreateList} from 'utils/list'
import {
  Toggle,
  ToggleButton,
  ToggleOn,
} from 'components/compound/toggle.component'
import {AddListForm} from '../components/form.component'
import {TextToggleSwitch} from 'components/lib'
import {Lists} from 'components/lists.component'
import * as colors from 'styles/colors'

const SideBarWrapper = styled.aside({
  position: 'relative',
  height: '100vh',
  overflow: 'scroll',
  background: colors.garyBlue,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
})

const LogoWrapper = styled.div({
  borderBottom: `1px solid #3f4e5c`,
  width: '100%',
  padding: `1em 0 1em 1em `,
})

const CreateListFormWrapper = styled.div({
  width: '100%',
  padding: '16px 24px',
  borderBottom: `1px solid #3f4e5c`,
  background: `#415464`,
})

function SideBar() {
  const [handleCreateList] = useCreateList({throwOnError: true})
  const [isAdding, setIsAdding] = React.useState(false)
  return (
    <SideBarWrapper>
      <LogoWrapper>
        <img
          src="logo.png"
          alt="jobtrack logo"
          css={{height: '4em', width: 'auto'}}
        />
      </LogoWrapper>
      <Toggle on={isAdding} setOn={setIsAdding}>
        <CreateListFormWrapper>
          <ToggleButton label='toggle create list form'>
            {isAdding ? (
              <TextToggleSwitch
                label="close form"
                icon={<FaTimes />}
                text="Close"
              />
            ) : (
              <TextToggleSwitch
                label="create a new list"
                icon={<FaPlus />}
                text="Create a new list"
              />
            )}
          </ToggleButton>
          <ToggleOn>
            <AddListForm
              onSubmit={handleCreateList}
              setIsActive={setIsAdding}
            />
          </ToggleOn>
        </CreateListFormWrapper>
      </Toggle>
      <Lists />
    </SideBarWrapper>
  )
}

export {SideBar}
