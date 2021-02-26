/** @jsx jsx */
import {jsx} from '@emotion/react'
import * as React from 'react'
import {FaTimes} from 'react-icons/fa'
import {CirclePicker} from 'react-color'

import {useAsync} from 'utils/hooks'
import {Input, Spinner, ErrorMessage, TextButton} from 'components/lib'
import * as colors from '../styles/colors'

function AddListForm({onSubmit, setIsActive}) {
  const {isLoading, isError, error, run, reset} = useAsync()
  const [color, setColor] = React.useState('')
  const [listName, setlistName] = React.useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (isError) {
      reset()
    } else {
      run(onSubmit({listName, color}))
    }
  }

  function handleInputChange(event) {
    setlistName(event.target.value)
  }

  function handleEscape(event) {
    if (event.keyCode === 27) {
      setIsActive(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        css={{
          paddingTop: '1em',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Input
          onKeyDown={handleEscape}
          autoFocus
          id="name"
          placeholder="list name"
          value={listName}
          onChange={handleInputChange}
          css={{
            width: '100%',
            border: `4px solid ${color || colors.grayText}`,
            background: colors.navDark,
            color: color,
          }}
        />

        <CirclePicker
          css={{width: '100%', margin: '2em 0'}}
          color={color}
          onChangeComplete={({hex}) => setColor(hex)}
        />
        {isError ? <ErrorMessage error={error} /> : null}
        <TextButton
          type="submit"
          css={{marginTop: '2em'}}
          variant="small"
          disabled={!color || !listName}
        >
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <FaTimes />
          ) : (
            <div>create &rarr;</div>
          )}
        </TextButton>
      </div>
    </form>
  )
}

export {AddListForm}
