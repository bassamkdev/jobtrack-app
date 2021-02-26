/** @jsx jsx */
import {jsx} from '@emotion/react'
import * as React from 'react'
import {FaPlus, FaTimes} from 'react-icons/fa'

import {useCreateList} from 'utils/list'
import {Toggle, ToggleButton, ToggleOn} from 'components/Toggle-component'
import {AddListForm} from '../components/form.component'
import {TextToggleSwitch} from 'components/lib'
import {Lists} from 'components/lists.component'

function SideBar() {
  const [handleCreateList] = useCreateList({throwOnError: true})
  const [isAdding, setIsAdding] = React.useState(false)
  return (
    <aside
      css={{
        position: 'relative',
        height: '100vh',
        overflow: 'scroll',
        background: '#2c3e4e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <div
        css={{
          borderBottom: `1px solid #3f4e5c`,
          width: '100%',
          padding: `1em 0 1em 1em `,
        }}
      >
        <img
          src="logo.png"
          alt="jobtrack logo"
          css={{height: '4em', width: 'auto'}}
        />
      </div>
      <Toggle on={isAdding} setOn={setIsAdding}>
        <div
          css={{
            width: '100%',
            padding: '16px 24px',
            borderBottom: `1px solid #3f4e5c`,
            background: `#415464`,
          }}
        >
          <ToggleButton>
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
        </div>
      </Toggle>
      <Lists />
    </aside>
  )
}

export {SideBar}
