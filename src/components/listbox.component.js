/**@jsx jsx */
import {jsx} from '@emotion/react'
import {ListboxInput as ReachListBox} from '@reach/listbox'
import VisuallyHidden from '@reach/visually-hidden'
import {ListboxButton, ListboxList, ListboxPopover, ListboxOption} from './lib'

function Listbox({items, variant, listValue, handleValueChange}) {
  return (
    <ReachListBox
      role='listbox'
      id="list"
      defaultValue={`list`}
      onChange={value => handleValueChange(value)}
    >
      <VisuallyHidden>Select a list</VisuallyHidden>
      <ListboxButton variant={variant} arrow>
        {listValue}
      </ListboxButton>
      <ListboxPopover data-testid='popover'>
        <ListboxList data-testid='listbox-lists'>
          {items.map(({name, _id}) => {
            return (
              <ListboxOption aria-selected={false} key={_id} value={name} data-testid='listbox-option'>
                {name}
              </ListboxOption>
            )
          })}
        </ListboxList>
      </ListboxPopover>
    </ReachListBox>
  )
}

export {Listbox}
