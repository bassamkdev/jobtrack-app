/** @jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import * as React from 'react'
import {CirclePicker} from 'react-color'
import Tooltip from '@reach/tooltip'
import {FaSearch, FaTimes} from 'react-icons/fa'
import { VisuallyHidden } from "@reach/visually-hidden";

import {useLists} from 'utils/list'
import {useAsync} from 'utils/hooks'
import {Listbox} from 'components/listbox.component'
import {ModalContext} from 'components/compound/modal.component'
import {
  Input,
  Spinner,
  ErrorMessage,
  Textarea,
} from 'components/lib'
import { Icon } from "components/icon";
import * as colors from '../styles/colors'
import { useUpdateListItem } from 'utils/item'
import { WEIGHTS } from 'styles/constants'

function AddListForm({onSubmit, setIsActive, label}) {
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
    <CreateListFormWrapper aria-label={label} onSubmit={handleSubmit}>
      <TextInput
        onKeyDown={handleEscape}
        autoFocus
        id="name"
        type='text'
        placeholder="list name"
        value={listName}
        onChange={handleInputChange}
      />
      <ColorPickerWrapper>
        <CirclePicker
          data-testid='hello'
          color={color}
          onChange={({hex}) => setColor(hex)}
        />
        {isError ? <ErrorMessage error={error} /> : null}
      </ColorPickerWrapper>
      <ButtonWrapper>
        <SaveButton
          type="submit"
          variant="small"
          disabled={!color || !listName}
        >
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <FaTimes />
          ) : (
            'Create'
          )}
        </SaveButton>
      </ButtonWrapper>

    </CreateListFormWrapper>
  )
}

const CreateListFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 24px;
`
const ButtonWrapper = styled.div`
  margin: 0 auto;
`
const ColorPickerWrapper = styled.div`
  margin: 0 auto;
`


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
  const {isLoading, isError, isSuccess, run, reset, status} = useAsync()

  const lists = useLists()

  React.useEffect(() => {
    const {title, companyName, location, list, employmentType} = state
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
    <FormWrapper onSubmit={handleSubmit}>
        <FieldGroup>
          <Label htmlFor="title">Title</Label>
          <TextInput id="title" onChange={handleChange} />
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="companyName">Company</Label>
          <TextInput id="companyName" onChange={handleChange} />
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="companyType">Company type</Label>
          <TextInput id="companyType" onChange={handleChange} />
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="url">Job url</Label>
          <TextInput id="url" onChange={handleChange} />
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="location">Location</Label>
          <TextInput id="location" onChange={handleChange} />
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="employmentType">Employment type</Label>
          <TextInput id="employmentType" onChange={handleChange} />
        </FieldGroup>

        <FieldGroup css={{gridArea: 'notes'}}>
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" css={{height: '6rem'}} />
        </FieldGroup>
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '3rem',
        }}
      >
        <FieldGroup>
          <Listbox
            items={lists}
            listValue={listValue}
            handleValueChange={value => {
              setListValue(value)
              dispatch({list: value})
            }}
          />
        </FieldGroup>
        {React.cloneElement(
          submitButton,
          {type: 'submit', disabled: isEmptyField, status: status },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
            isLoading ? <Spinner/> : isError ? <Icon id='refresh'/> : isSuccess ? <Icon id='success'/> : 'Submit'
        )}
      </div>
    </FormWrapper>
  )
}

const SearchFormWrapper = styled.form({
  width: '100%',
  background: colors.gray,
  borderBottom: `1px solid ${colors.gray20}`,
  padding: '2em 3em',
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

  function handleSubmit(e) {
    e.preventDefault()
    const title = e.target.elements.title.value
    const location = e.target.elements.location.value
    onSubmit(title,location)
  }
  return (
    <SearchFormWrapper onSubmit={handleSubmit}>
      <SearchInput placeholder="Job title..." id="title" type="search" aria-label='job title search input' />
      <SearchInput placeholder="Location..." id="location" type="search" aria-label='job location search input' />
      <Tooltip label="Search job">
        <SearchButton type="submit" aria-label='search button' >
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


function UpdateItemForm({item}) {
  const [update, {isLoading, isError, isSuccess, reset, status, error}] = useUpdateListItem()
  const [state, dispatch] = React.useReducer((s, a) => ({...s,...a}), {
    title: item.title || '',
    company: item.companyName || '',
    location: item.location || '',
    jobType: item.employmentType || '',
    url: item.url || ''
  })
  function handleSubmit(event) {
    event.preventDefault()
    if (isError) {
      reset()
    }
    update({
      id: item._id,
      title: state.title, 
      companyName: state.company,
      location: state.location,
      employmentType: state.jobType,
      url: state.url
    })
  }

  function handleChange(e) {
    if(isSuccess){
      reset()
    }
    const {name, value} = e.target
    dispatch({[name]: value})
  }

  return(
    <FormWrapper onSubmit={handleSubmit}>
      <FieldGroup>
        <Label htmlFor='title'>title</Label>
        <TextInput name="title" placeholder='software engineer, react developer, . . .' value={state.title} onChange={handleChange}/>
      </FieldGroup>
      <FieldGroup>
        <Label htmlFor='company'>company</Label>
        <TextInput name="company" placeholder='google, microsoft, . . .' value={state.company} onChange={handleChange}/>
      </FieldGroup>
      <FieldGroup>
        <Label htmlFor='url'>URL</Label>
        <TextInput name="url" placeholder='https://www.company.com' value={state.url} onChange={handleChange}/>
      </FieldGroup>
      <FieldGroup>
        <Label htmlFor='location'>
            <VisuallyHidden>location</VisuallyHidden>
            <Icon id='location' color={'hsl(340deg 95% 65%)'}/> 
        </Label>
        <TextInput name='location' placeholder='Location' value={state.location} onChange={handleChange}/>
      </FieldGroup>
      <FieldGroup>
        <Label htmlFor='jobType'>
            <VisuallyHidden>location</VisuallyHidden>
            <Icon id='jobType' color={'hsl(150deg 100% 40%)'}/> 
        </Label>
        <TextInput name='jobType' placeholder='Job Type' value={state.jobType} onChange={handleChange}/>
      </FieldGroup>
      <SaveButton type='submit' disabled={isLoading} status={status}>
        {
          isLoading ? <Spinner/> : isError ? <Icon id='refresh'/> : isSuccess ? <Icon id='success'/> : 'Save'
        }
      </SaveButton>
      {
        isError ? <ErrorMessage error={error}/> : null
      }
    </FormWrapper>
  )
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 4px;
  max-width: 700px;
`
const Label = styled.label`
  text-transform: capitalize;
  color: hsl(240deg 0% 40%);
  font-style: italic;
  font-size: ${12/16}rem;
`

const TextInput = styled.input`
  border: 1px solid hsl(240deg 0% 70%);
  border-radius: 4px;
  height: 36px;
  padding: 8px 16px;
  flex: 1;
  &:hover {
    border-width: 2px;
    border-color: hsl(240deg 0% 50%) ;
    padding: 7px 15px;
  }
  &::placeholder{
    font-weight: ${WEIGHTS.light};
    color: hsl(240deg 0% 70%)
  }
`
const SaveButton = styled.button`
  width: 100px;
  cursor: pointer;
  height: 36px;
  border: none;
  border-radius: 4px;
  background-color: ${({status}) => status === 'success' ? 'hsl(150deg 100% 40%)' : status === 'loading' ? 'hsl(240deg 0% 50%)' : 'hsl(244 100% 77%)' };
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{
    background-color: ${({status}) => status === 'success' ? 'hsl(150deg 90% 40%)' : status === 'loading' ? 'hsl(240deg 0% 60%)' : 'hsl(244 90% 77%)' };
    
  }
`

export {AddListForm, AddJobForm, SearchForm, UpdateItemForm}
