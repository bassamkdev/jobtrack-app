/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import * as React from 'react'
// import PerfectScrollbar from 'react-perfect-scrollbar'
import * as colors from 'styles/colors'
import {ActionButtons} from 'components/action-buttons'
import {ImLocation} from 'react-icons/im'
import {FaBuilding, FaCompressAlt, FaExpandAlt, FaTimes} from 'react-icons/fa'
import {formatDate} from 'utils/misc'
import {CircleButton, ErrorMessage, Spinner, Textarea} from './lib'
import {useUpdateListItem} from 'utils/item'
import debounceFn from 'debounce-fn'
import {useAccordionContext} from './accordion'
import {Listbox} from './listbox'
import {useList, useLists} from 'utils/list'

const BasicCard = styled.div(
  {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '4px',
    background: 'white',
    paddingTop: '3rem',
    boxShadow: '0 0 5px 6px rgba(0,0,0, 0.05)',
    width: '100%',
    height: '100%',
  },
  ({color}) => ({borderTop: `5px solid ${color}`}),
)

const TopBar = styled.div({
  position: 'absolute',
  top: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingRight: '10px',
  width: '100%',
  height: '50px',
  borderRadius: '0',
  background: 'rgba(0,0,0, 0)',
  transition: '.3s all',
})

const Footer = styled.div({
  textAlign: 'center',
  fontStyle: 'italic',
  marginBottom: '0',
  position: 'absolute',
  paddingBottom: '4px',
  bottom: '0',
  color: colors.gray80,
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '.8rem',
  width: '100%',
  background: colors.gray20,
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
})

const CardContent = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '0 30px 20px 30px',

  marginBottom: '5rem',
})

const Title = styled.a({
  fontsize: '1.17em',
  fontWeight: 'bold',
  textDecoration: 'none',
  color: colors.text,
  ':hover,:active': {
    color: colors.text,
    textDecoration: 'none',
  },
})

const IconsBlock = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  borderRight: `1px solid ${colors.gray80}`,
  paddingRight: '1rem',
  color: colors.gray80,
})

const IconsTextBlock = styled.div({
  paddingLeft: '10px',
  fontFamily: 'lato, sans-serif',
  color: colors.text,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
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
        <label
          htmlFor="notes"
          css={{
            display: 'inline-block',
            marginRight: '10px',
            marginTop: '1rem',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          Notes
        </label>
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

function Card({children, gridArea = 1 / 1 / 3 / 3, eventKey, item}) {
  const {activeEventKey} = useAccordionContext()
  const lists = useLists()
  const list = useList(item.list)
  console.log(list.color)
  const [listValue, setListValue] = React.useState(list.name)
  const [mutate, {isError, isLoading}] = useUpdateListItem()

  function handleChange(value) {
    const {_id: newListId} = lists.find(list => list.name === value)
    setListValue(value)
    mutate({id: item._id, list: newListId})
  }

  return (
    <BasicCard
      color={list.color}
      css={{gridArea: activeEventKey === eventKey ? gridArea : 'auto'}}
    >
      {children}
      <div
        css={{
          position: 'absolute',
          right: '0',
          bottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: '1rem',
          width: '100%',
        }}
      >
        <Listbox
          defaultValue={list.name}
          items={lists}
          variant="transparent"
          listValue={
            isLoading ? <Spinner /> : isError ? <FaTimes /> : listValue
          }
          handleValueChange={handleChange}
        />
        <ActionButtons item={item} />
      </div>
      <Footer> Last updated {formatDate(new Date(item.updatedAt))}</Footer>
    </BasicCard>
  )
}

function Toggle({
  element: Component,
  eventKey,
  expandButton,
  shrinkButton,
  children,
}) {
  const {activeEventKey, onToggle} = useAccordionContext()
  function handleToggle() {
    onToggle(eventKey === activeEventKey ? null : eventKey)
  }
  return (
    <Component>
      {activeEventKey !== eventKey
        ? React.cloneElement(expandButton, {onClick: handleToggle})
        : React.cloneElement(shrinkButton, {onClick: handleToggle})}
      {children}
    </Component>
  )
}

const ExpandButton = ({onClick}) => (
  <CircleButton onClick={onClick} css={{':hover': {transform: 'scale(1.02)'}}}>
    <FaExpandAlt
      css={{
        color: colors.gray80,
        ':hover': {
          color: colors.indigo,
        },
      }}
    />
  </CircleButton>
)

const ShrinkButton = ({onClick}) => (
  <CircleButton onClick={onClick} css={{':hover': {transform: 'scale(1.02)'}}}>
    <FaCompressAlt
      css={{
        color: colors.gray80,
        ':hover': {
          color: colors.indigo,
        },
      }}
    />
  </CircleButton>
)

const DefaultContent = ({item}) => (
  <React.Fragment>
    <Title href={item.url} rel="noreferrer" target="_blank">
      {item.title}
    </Title>
    <div
      css={{
        display: 'flex',
        flexDirection: 'row',
        paddingTop: '10px',
        paddingBottom: '10px',
      }}
    >
      <IconsBlock>
        <FaBuilding />
        <ImLocation />
      </IconsBlock>
      <IconsTextBlock>
        <div>{item.companyName}</div>
        <div>{item.location}</div>
      </IconsTextBlock>
    </div>
    <IconsTextBlock>
      <div css={{color: colors.gray80, fontStyle: 'italic', fontSize: '14px'}}>
        Company Type: {item.companyType}
      </div>
      <div css={{color: colors.gray80, fontStyle: 'italic', fontSize: '14px'}}>
        Employment Type: {item.employmentType}
      </div>
    </IconsTextBlock>
  </React.Fragment>
)

const ExpandedContent = ({item}) => <NotesTextarea item={item} />

function AccordianContent({item, eventKey, defaultContent, expandedContent}) {
  const {activeEventKey} = useAccordionContext()
  return (
    <CardContent>
      {defaultContent}
      {activeEventKey === eventKey ? expandedContent : null}
    </CardContent>
  )
}

export {
  Card,
  Toggle,
  AccordianContent,
  TopBar,
  ShrinkButton,
  ExpandButton,
  DefaultContent,
  ExpandedContent,
}
