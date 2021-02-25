/**@jsx jsx */
import {jsx} from '@emotion/react'
import * as React from 'react'
import * as colors from 'styles/colors'
import {
  FormGroup,
  Input,
  ErrorMessage,
  Spinner,
  Button,
  Textarea,
} from 'components/lib'
import {useCreateListItem, useListItems} from 'utils/item'
import {FaPlus} from 'react-icons/fa'
import {Modal, ModalContents, ModalOpenButton} from 'components/modal'
import {Listbox} from 'components/listbox'
import {useAsync} from 'utils/hooks'
import {useList, useLists} from 'utils/list'
import {ModalContext} from 'components/modal'
import {AccordionProvider} from 'components/accordion'
import {
  Card,
  DefaultContent,
  ExpandButton,
  ExpandedContent,
  ShrinkButton,
  Toggle,
  TopBar,
  AccordianContent,
} from 'components/card'

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

function ListScreen({listId}) {
  const list = useList(listId)
  const listItems = useListItems(listId)
  const [handleCreateListItem] = useCreateListItem({throwOnError: true})

  return (
    <div
      css={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderLeft: `4px solid ${list.color}`,
      }}
    >
      <div
        css={{
          background: colors.gray,
          height: '4em',
          width: '100%',
          display: 'inline-flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '',
          borderBottom: `1px solid ${colors.gray20}`,
          color: colors.grayText,
          fontFamily: 'lato, san-serif',
          fontSize: '1.3rem',
          position: 'sticky',
        }}
      >
        <Modal>
          <ModalOpenButton>
            <div
              css={{
                paddingLeft: '1rem',
                fontSize: '1.2rem',
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              Create a new job card
              <FaPlus css={{paddingLeft: '.5rem'}} />
            </div>
          </ModalOpenButton>
          <ModalContents aria-label="Add job form" title="Add a new job">
            <AddJobForm
              onSubmit={handleCreateListItem}
              submitButton={<Button variant="primary">Submit</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
      <div
        css={{
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridGap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          transition: '.2s all',
          width: '100%',
          maxHeight: '80%',
          overflow: 'scroll',
        }}
      >
        <AccordionProvider>
          {listItems.length
            ? listItems.map(listItem => (
                <Card
                  gridArea="1/1/3/3"
                  eventKey={listItem._id}
                  key={listItem._id}
                  item={listItem}
                >
                  <Toggle
                    element={TopBar}
                    eventKey={listItem._id}
                    expandButton={<ExpandButton />}
                    shrinkButton={<ShrinkButton />}
                  />
                  <AccordianContent
                    item={listItem}
                    eventKey={listItem._id}
                    defaultContent={<DefaultContent item={listItem} />}
                    expandedContent={<ExpandedContent item={listItem} />}
                  />
                </Card>
              ))
            : null}
        </AccordionProvider>
        <div
          css={{
            width: '250px',
            height: '250px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></div>
      </div>
    </div>
  )
}

export {ListScreen}
