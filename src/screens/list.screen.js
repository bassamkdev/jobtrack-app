/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import {useListItems} from 'utils/item'
import {useList} from 'utils/list'
import { ListedJobCard } from 'components/listedJobCard'
import { CreateJobCard } from 'components/createJobCard'
import { QUERIES } from "styles/constants";
import { Icon } from "components/icon";
import UnstyledButton from 'components/unstyledButton'

const ListScreenWrapper = styled.div(
  {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  ({list}) => ({
    backgroundColor: `${list.color}10`,
  }),
)

const FloatedButton = styled(UnstyledButton)`
    padding: 16px;
    background: linear-gradient(266deg, rgba(82,190,162,1) 0%, rgba(135,255,183,1) 100%);
    box-shadow: -2px 4px 10px 0px hsl(0deg 0% 0% / 20%);
    border-radius: 50%;
    color: white;
    transition: all 1s;
    z-index: 2;
    &:hover {
        background: linear-gradient(90deg, rgba(82,190,162,1) 0%, rgba(135,255,183,1) 100%);

    }
    /* @media ${QUERIES.phoneAndSmaller}{
        bottom: 24px;
        right: 24px;
    } */

`

const FloatButton = <FloatedButton><Icon id='add' size={32}/></FloatedButton>

function ListScreen({listId}) {
  const list = useList(listId)
  const listItems = useListItems(listId)

  return (
    <ListScreenWrapper list={list}>
    <CreateJobCardWrapper>
      <CreateJobCard OpenButton={FloatButton}/>
    </CreateJobCardWrapper>
      <MainWrapper>
        <CardsGrid>
            {
              listItems.map((item) => (
                <CardWrapper key={item._id}>
                  <ListedJobCard item={item}/>
                </CardWrapper>
              ))
            }
        </CardsGrid>
      </MainWrapper>
    </ListScreenWrapper>
  )
}

const MainWrapper = styled.div`
  height: 85%;
  width: 100%;
  max-width: 1000px;
  overflow: auto;
  margin: 0 auto;
  padding: 32px 16px;
  overflow: auto;
  @media ${QUERIES.phoneAndSmaller}{
      height: 100%;
      padding-top: 16px;
    }
`
const CreateJobCardWrapper = styled.div`
    position: fixed;
    bottom: 48px;
    right: 32px;
    @media ${QUERIES.phoneAndSmaller}{
      display: none;
    }
`

const CardsGrid = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  width: 100%;
`


const CardWrapper = styled.div`
  min-width: 275px;
  flex: 1
`

export {ListScreen}
