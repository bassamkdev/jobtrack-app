/**@jsx jsx */
import {jsx} from '@emotion/react'
import * as colors from 'styles/colors'
import {CircleButton} from 'components/lib'
import ScrollableCard from 'components/card'
import {useListItems} from 'utils/item'
import {FaPlus} from 'react-icons/fa'

function ListScreen({listId}) {
  const listItems = useListItems(listId)
  console.log(listItems)
  return (
    <div
      css={{
        border: `1px solid ${colors.gray10}`,
        borderRadius: '3px',
        padding: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {listItems.length
        ? listItems.map(listItem => (
            <div
              key={listItem._id}
              css={{marginRight: '1rem', marginBottom: '1rem'}}
            >
              <ScrollableCard item={listItem} />
            </div>
          ))
        : null}
      <div
        css={{
          width: '300px',
          height: '440px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircleButton variant="large">
          <FaPlus />
        </CircleButton>
      </div>
    </div>
  )
}

export {ListScreen}
