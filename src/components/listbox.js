/**@jsx jsx */
import {jsx} from '@emotion/react'
import * as React from 'react'
import {ListboxInput as ReachListBox} from '@reach/listbox'
import VisuallyHidden from '@reach/visually-hidden'
import {ListboxButton, ListboxList, ListboxPopover, ListboxOption} from './lib'

function ListBox({items}, ref) {
  const [value, setValue] = React.useState('Select a list')

  React.useImperativeHandle(ref, () => {
    return {
      listboxValue: value,
    }
  })

  return (
    <ReachListBox
      id="list"
      defaultValue={`list`}
      onChange={value => setValue(value)}
    >
      <VisuallyHidden>Select a list</VisuallyHidden>
      <ListboxButton arrow>{value || 'List'}</ListboxButton>
      <ListboxPopover>
        <ListboxList>
          {items.map(({name, _id}) => {
            return (
              <ListboxOption aria-selected={false} key={_id} value={name}>
                {name}
              </ListboxOption>
            )
          })}
        </ListboxList>
      </ListboxPopover>
    </ReachListBox>
  )
}

const Listbox = React.forwardRef(ListBox)

export {Listbox}
