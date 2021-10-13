/**@jsx jsx */
import {jsx} from '@emotion/react'
import * as React from 'react'
import {FaTrash, FaTimesCircle} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
import {useRemoveListItem, useCreateListItem, useUpdateListItem} from 'utils/item'
import * as colors from 'styles/colors'
import {useAsync} from 'utils/hooks'
import {CircleButton, Spinner} from 'components/lib'
import {useLists} from 'utils/list'
import {Listbox} from 'components/listbox.component'
import { Icon } from "components/icon";

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

function CreateJobCardButton({job, list}) {
  const lists = useLists()
  const [listValue, setListValue] = React.useState(list?.name || 'Add to list')
  const [mutate, {isError, isLoading, reset}] = useCreateListItem()
  function handleChange(value) {
    if (isError) {
      reset()
    } 
      setListValue(value)
      const {_id: listId} = lists.find(list => list.name === value)
      mutate({
        list: listId,
        title: job.title,
        jobId: job.id,
        companyName: job.company,
        url: job.company_url || job.url,
        location: job.location,
        notes: job.how_to_apply,
        employmentType: job.type 
      })
  }
  return (
    <Listbox
      items={lists}
      variant="transparent"
      listValue={listValue}
      handleValueChange={handleChange}
      isLoading={isLoading}
      isError={isError}
    />
  )
}

function UpdateJobCardButton({item, list}) {
  const lists = useLists()
  const [listValue, setListValue] = React.useState(list.name)
  const [update, {isError, isLoading, reset}] = useUpdateListItem()

  function handleChange(value) {
    if (isError) {
      reset()
    }
    const {_id: newListId} = lists.find(list => list.name === value)
    setListValue(value)
    update({id: item._id, list: newListId})
  }

  return (
    <Listbox
    items={lists}
    visualContent={<Icon id='list' size='24'/>}
    handleValueChange={handleChange}
    isLoading={isLoading}
    isError={isError}
  />
  )
}


export {ActionButtons, TooltipButton, CreateJobCardButton, UpdateJobCardButton}
