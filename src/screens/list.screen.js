/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'

import {FaPlus} from 'react-icons/fa'

import {AddJobForm} from 'components/form.component'
import {Button} from 'components/lib'
import {useCreateListItem, useListItems} from 'utils/item'
import {
  Modal,
  ModalContents,
  ModalOpenButton,
} from 'components/compound/modal.component'
import {useList} from 'utils/list'
import {
  AccordionProvider,
  AccordianContent,
  Toggle,
} from 'components/compound/grid-accordion/grid-accordion'
import {
  Card,
  DefaultContent,
  ExpandButton,
  ExpandedContent,
  ShrinkButton,
  TopBar,
} from 'components/compound/grid-accordion/card'
import * as colors from 'styles/colors'

const ListScreenWrapper = styled.div(
  {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  ({list}) => ({
    borderLeft: `4px solid ${list.color}`,
  }),
)

const ListScreenGridWrapper = styled.div({
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
})

const ListScreenTopBar = styled.div({
  background: colors.gray,
  height: '4em',
  width: '100%',
  display: 'inline-flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  borderBottom: `1px solid ${colors.gray20}`,
  color: colors.grayText,
  fontFamily: 'lato, san-serif',
  fontSize: '1.3rem',
  position: 'sticky',
})

const TopBarContentWrapper = styled.div({
  paddingLeft: '1rem',
  fontSize: '1.2rem',
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
})

function ListScreen({listId}) {
  const list = useList(listId)
  const listItems = useListItems(listId)
  const [handleCreateListItem] = useCreateListItem({throwOnError: true})

  return (
    <ListScreenWrapper list={list}>
      <ListScreenTopBar>
        <Modal>
          <ModalOpenButton>
            <TopBarContentWrapper aria-label='create a new job card'>
              Create a new job card
              <FaPlus css={{paddingLeft: '.5rem'}} />
            </TopBarContentWrapper>
          </ModalOpenButton>
          <ModalContents aria-label="Add job form" title="Add a new job">
            <AddJobForm
              onSubmit={handleCreateListItem}
              submitButton={<Button variant="primary">Submit</Button>}
            />
          </ModalContents>
        </Modal>
      </ListScreenTopBar>
      <ListScreenGridWrapper>
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
      </ListScreenGridWrapper>
    </ListScreenWrapper>
  )
}

export {ListScreen}
