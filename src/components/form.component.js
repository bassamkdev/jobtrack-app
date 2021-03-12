/** @jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import * as React from 'react'
import {CirclePicker} from 'react-color'
import Tooltip from '@reach/tooltip'
import {FaSearch, FaTimes} from 'react-icons/fa'

import {useLists} from 'utils/list'
import {useAsync} from 'utils/hooks'
import {Listbox} from 'components/listbox.component'
import {ModalContext} from 'components/compound/modal.component'
import {
  Input,
  Spinner,
  ErrorMessage,
  TextButton,
  FormGroup,
  Textarea,
} from 'components/lib'
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
          type='text'
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
              data-testid='hello'

          css={{width: '100%', margin: '2em 0'}}
          color={color}
          onChange={({hex}) => setColor(hex)}
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

function AddJobForm({onSubmit, submitButton}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  const [listValue, setListValue] = React.useState('Select a List')
  const [state, dispatch] = React.useReducer((s, a) => ({...s, ...a}), {
    title: '',
    companyName: '',
    location: '',
    list: '',
    companyType: '',
    employmentType: '',
    url: '',
  })

  const [isEmptyField, setIsEmptyField] = React.useState(true)
  const {isLoading, isError, isSuccess, error, run, reset} = useAsync()

  const lists = useLists()

  React.useEffect(() => {
    const {title, companyName, location, list, employmentType} = state
    // console.log({title, companyName, location, list, employmentType})
    if (title && companyName && location && list && employmentType) {
      setIsEmptyField(false)
    } else {
      setIsEmptyField(true)
    }
  }, [state])

  function handleChange(e) {
    const {value, id} = e.target
    dispatch({[id]: value})
  }

  function handleSubmit(event) {
    event.preventDefault()
    const selectedList = lists.find(list => list.name === listValue)
    const {
      title,
      companyName,
      location,
      companyType,
      url,
      employmentType,
    } = state

    if (isError) {
      reset()
    } else {
      run(
        onSubmit({
          title,
          companyName,
          location,
          list: selectedList._id,
          notes: event.target.elements.notes.value,
          companyType,
          employmentType,
          url,
        }),
      )
    }
  }

  React.useEffect(() => {
    if (isSuccess) {
      setIsOpen(false)
    }
  }, [isSuccess, setIsOpen])

  return (
    <form onSubmit={handleSubmit}>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr 1fr 1fr',
          gap: '0px 30px',
          gridTemplateAreas: `    
      ". ."
      ". ."
      ". ."
      "notes notes"`,
        }}
      >
        <FormGroup>
          <label htmlFor="title">Title</label>
          <Input id="title" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="companyName">Company</label>
          <Input id="companyName" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="companyType">Company type</label>
          <Input id="companyType" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="url">Job url</label>
          <Input id="url" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="location">Location</label>
          <Input id="location" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="employmentType">Employment type</label>
          <Input id="employmentType" onChange={handleChange} />
        </FormGroup>

        <FormGroup css={{gridArea: 'notes'}}>
          <label htmlFor="notes">Notes</label>
          <Textarea id="notes" css={{height: '6rem'}} />
        </FormGroup>
      </div>
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '3rem',
        }}
      >
        <FormGroup>
          <Listbox
            items={lists}
            listValue={listValue}
            handleValueChange={value => {
              setListValue(value)
              dispatch({list: value})
            }}
          />
        </FormGroup>
        {React.cloneElement(
          submitButton,
          {type: 'submit', disabled: isEmptyField},
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isLoading ? <Spinner css={{marginLeft: 5}} /> : null,
        )}
      </div>
      {isError ? <ErrorMessage error={error} /> : null}
    </form>
  )
}

const SearchFormWrapper = styled.form({
  width: '100%',
  background: colors.gray,
  borderBottom: `1px solid ${colors.gray20}`,
  padding: '2em 3em',
  position: 'sticky',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
})

const SearchInput = styled(Input)({
  width: '45%',
  background: colors.gray20,
  borderRadius: '34px',
})

const SearchButton = styled.button({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '0',
  borderRadius: '50%',
  background: colors.gray20,
  height: '2.5rem',
  width: '2.5rem',
  ':hover': {
    background: `${colors.skyBlue}50`,
  },
})

function SearchForm({onSubmit, isError, isLoading}) {
  return (
    <SearchFormWrapper onSubmit={onSubmit}>
      <SearchInput placeholder="Job title..." id="description" type="search" />
      <SearchInput placeholder="Location..." id="location" type="search" />
      <Tooltip label="Search job title">
        <SearchButton type="submit">
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <FaTimes aria-label="error" css={{color: colors.danger}} />
          ) : (
            <FaSearch aria-label="search" css={{color: colors.grayText}} />
          )}
        </SearchButton>
      </Tooltip>
    </SearchFormWrapper>
  )
}

export {AddListForm, AddJobForm, SearchForm}
