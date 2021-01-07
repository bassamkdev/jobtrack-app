/**@jsx jsx */
import {jsx} from '@emotion/react'
import * as React from 'react'
import * as colors from 'styles/colors'
import {
  CircleButton,
  FormGroup,
  Input,
  ErrorMessage,
  Spinner,
  Button,
  Textarea,
} from 'components/lib'
import ScrollableCard from 'components/card'
import {useCreateListItem, useListItems} from 'utils/item'
import {FaPlus} from 'react-icons/fa'
import {Modal, ModalContents, ModalOpenButton} from 'components/modal'
import {Listbox} from 'components/listbox'
import {useAsync} from 'utils/hooks'
import {useLists} from 'utils/list'
import {ModalContext} from 'components/modal'

function AddJobForm({onSubmit, submitButton}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  const mylistboxRef = React.createRef()
  const lists = useLists()
  const {isLoading, isError, isSuccess, error, run, reset} = useAsync()

  function handleSubmit(event) {
    event.preventDefault()
    const selectedListName = mylistboxRef.current.listboxValue
    const selectedList = lists.find(list => list.name === selectedListName)
    console.log(selectedList)
    const {title, company, location, notes} = event.target.elements
    if (isError) {
      reset()
    } else {
      run(
        onSubmit({
          title: title.value,
          company: company.value,
          location: location.value,
          list: selectedList._id,
          lastUpdated: new Date(),
          notes: notes.value,
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
    <form
      onSubmit={handleSubmit}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        '> div': {
          margin: '10px auto',
          width: '100%',
          maxWidth: '300px',
        },
      }}
    >
      <FormGroup>
        <label htmlFor="title">Title</label>
        <Input id="title" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="company">Company</label>
        <Input id="company" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="location">Location</label>
        <Input id="location" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="list">List</label>
        <Listbox ref={mylistboxRef} items={lists} />
      </FormGroup>

      <FormGroup>
        <label htmlFor="notes">Notes</label>
        <Textarea id="notes" />
      </FormGroup>
      <div css={{display: 'flex', justifyContent: 'center'}}>
        {React.cloneElement(
          submitButton,
          {type: 'submit'},
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
  const listItems = useListItems(listId)
  const [handleCreateListItem] = useCreateListItem({throwOnError: true})
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
        <Modal>
          <ModalOpenButton>
            <CircleButton variant="large">
              <FaPlus />
            </CircleButton>
          </ModalOpenButton>
          <ModalContents aria-label="Add job form" title="Add a new job">
            <AddJobForm
              onSubmit={handleCreateListItem}
              submitButton={<Button variant="primary">Submit</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  )
}

export {ListScreen}
