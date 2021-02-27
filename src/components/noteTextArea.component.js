/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import * as React from 'react'

import debounceFn from 'debounce-fn'
import {useUpdateListItem} from 'utils/item'
import {ErrorMessage, Spinner, Textarea} from './lib'

const Label = styled.label({
  display: 'inline-block',
  marginRight: '10px',
  marginTop: '1rem',
  marginBottom: '0.5rem',
  fontWeight: 'bold',
})

function NotesTextarea({item}) {
  const [mutate, {error, isError, isLoading}] = useUpdateListItem()

  const deboucedMutate = React.useMemo(() => debounceFn(mutate, {wait: 300}), [
    mutate,
  ])

  function handleNotesChange(e) {
    deboucedMutate({id: item._id, notes: e.target.value})
  }

  return (
    <React.Fragment>
      <div>
        <Label htmlFor="notes">Notes</Label>
        {isError ? (
          <ErrorMessage
            variant="inline"
            error={error}
            css={{fontSize: '0.7em'}}
          />
        ) : null}
        {isLoading ? <Spinner /> : null}
      </div>
      <Textarea
        id="notes"
        defaultValue={item.notes}
        onChange={handleNotesChange}
        css={{width: '100%', minHeight: '300px'}}
      />
    </React.Fragment>
  )
}

export {NotesTextarea}
