/**@jsx jsx */
import {jsx} from '@emotion/react'
import {ListboxInput as ReachListBox} from '@reach/listbox'
import VisuallyHidden from '@reach/visually-hidden'
import {ListboxButton, ListboxList, ListboxPopover, ListboxOption} from './lib'

function Listbox({items, variant, listValue, handleValueChange}) {
  return (
    <ReachListBox
      id="list"
      defaultValue={`list`}
      onChange={value => handleValueChange(value)}
    >
      <VisuallyHidden>Select a list</VisuallyHidden>
      <ListboxButton variant={variant} arrow>
        {listValue}
      </ListboxButton>
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

export {Listbox}
