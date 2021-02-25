/**@jsx jsx */
import {jsx} from '@emotion/react'
import {FaTrash, FaTimesCircle} from 'react-icons/fa'

import Tooltip from '@reach/tooltip'
import {useItems, useRemoveListItem, useCreateListItem} from 'utils/item'
import * as colors from 'styles/colors'
import {useAsync} from 'utils/hooks'
import {CircleButton, Spinner} from 'components/lib'
import {useLists} from 'utils/list'
import {Listbox} from 'components/listbox'

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

function ActionButtons({item, options}) {
  const [handleRemoveClick] = useRemoveListItem({throwOnError: true})
  return (
    <TooltipButton
      label="Remove from list"
      highlight={colors.indigo}
      onClick={() => handleRemoveClick({itemId: item._id})}
      icon={<FaTrash />}
    />
  )
}

function JobActionButton({job}) {
  const items = useItems()
  const lists = useLists()
  const listedJob = items.find(item => item.jobId === job.id)
  const [mutate, {isError, isLoading, reset}] = useCreateListItem()

  function handleChange(value) {
    if (isError) {
      reset()
    } else {
      const {_id: listId} = lists.find(list => list.name === value)
      mutate({
        list: listId,
        title: job.title,
        jobId: job.id,
        companyName: job.company,
        url: job.company_url || job.url,
        location: job.location,
        notes: job.how_to_apply,
      })
    }
  }
  if (listedJob) {
    const list = lists.find(list => list._id === listedJob.list)
    return (
      <div
        css={{
          minWidth: 100,
          borderRadius: '3px',
          background: list.color,
          textAlign: 'center',
          padding: `3px 5px`,
          color: 'whitesmoke',
        }}
      >
        {list.name}
      </div>
    )
  }
  return (
    <Listbox
      items={lists}
      variant="transparent"
      listValue={
        isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : 'Add to list'
      }
      handleValueChange={handleChange}
    />
  )
}

export {ActionButtons, TooltipButton, JobActionButton}
