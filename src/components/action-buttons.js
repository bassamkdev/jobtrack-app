/**@jsx jsx */
import {jsx} from '@emotion/react'
import * as React from 'react'
import {FaTrash, FaEdit, FaTimesCircle, FaList} from 'react-icons/fa'

import Tooltip from '@reach/tooltip'
import {useRemoveListItem} from 'utils/item'
import * as colors from 'styles/colors'
import {useAsync} from 'utils/hooks'
import {CircleButton, Spinner} from 'components/lib'

function TooltipButton({label, highlight, onClick, icon, ...rest}) {
  const {isLoading, isError, error, run, reset} = useAsync()

  function handleClick() {
    if (isError) {
      reset()
    } else {
      run(onClick())
    }
  }

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          margin: '0 10px',
          backgroundColor: 'white',
          ':hover,:focus': {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  )
}

function ActionButtons({item}) {
  const [handleRemoveClick] = useRemoveListItem({throwOnError: true})

  return (
    <React.Fragment>
      <TooltipButton
        label="Change list"
        highlight={colors.indigo}
        onClick={() => {}}
        icon={<FaList />}
      />
      <TooltipButton
        label="Edit"
        highlight={colors.indigo}
        onClick={() => {}}
        icon={<FaEdit />}
      />
      <TooltipButton
        label="Remove from list"
        highlight={colors.indigo}
        onClick={() => handleRemoveClick({itemId: item._id})}
        icon={<FaTrash />}
      />
    </React.Fragment>
  )
}

export {ActionButtons}
